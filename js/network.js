/* ==========================================================================
   Weakest Link (PL) — network.js
   Thin wrapper around PeerJS giving us a star-topology "host is the server"
   network with zero backend — works from a plain GitHub Pages static site.
   PeerJS uses its free public cloud broker only to help two browsers find
   each other (signaling); the actual game data flows peer-to-peer.
   ========================================================================== */

(function (global) {
  'use strict';

  function peerIdForRoom(code) { return WL.ROOM_PREFIX + code.toUpperCase(); }

  // STUN alone only gets two browsers talking directly when their NATs are
  // "easy" (most home routers). It regularly fails once host and player are
  // on different networks — different WiFi, mobile data, a hotel/campus
  // network, a stricter (symmetric) NAT — which is exactly the "limit czasu"
  // timeout players hit even with a correct room code. A TURN server relays
  // the traffic instead of trying a direct P2P link, as a fallback when
  // direct connection fails. These are the Open Relay Project's public
  // free-tier TURN credentials (openrelay.metered.ca) — safe to ship
  // client-side, meant for exactly this kind of small/hobby use.
  var ICE_SERVERS = [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:global.stun.twilio.com:3478' },
    { urls: 'stun:openrelay.metered.ca:80' },
    { urls: 'turn:openrelay.metered.ca:80', username: 'openrelayproject', credential: 'openrelayproject' },
    { urls: 'turn:openrelay.metered.ca:443', username: 'openrelayproject', credential: 'openrelayproject' },
    { urls: 'turn:openrelay.metered.ca:443?transport=tcp', username: 'openrelayproject', credential: 'openrelayproject' }
  ];

  // ------------------------------------------------------------------
  // HostNetwork — runs on the host device. Owns the PeerJS "server" peer
  // and a connection per player.
  // ------------------------------------------------------------------
  function HostNetwork() {
    this.peer = null;
    this.roomCode = null;
    this.conns = {}; // playerId -> DataConnection
    this.handlers = {}; // event -> [fn]
  }

  HostNetwork.prototype.on = function (event, fn) {
    (this.handlers[event] = this.handlers[event] || []).push(fn);
    return this;
  };
  HostNetwork.prototype._emit = function (event, payload) {
    (this.handlers[event] || []).forEach(function (fn) { fn(payload); });
  };

  HostNetwork.prototype.open = function (preferredCode) {
    var self = this;
    return new Promise(function (resolve, reject) {
      function tryCreate(code, attemptsLeft) {
        var peer = new Peer(peerIdForRoom(code), {
          debug: 1,
          config: { iceServers: ICE_SERVERS }
        });
        var settled = false;
        peer.on('open', function () {
          settled = true;
          self.peer = peer;
          self.roomCode = code;
          self._wireIncoming();
          resolve(code);
        });
        peer.on('error', function (err) {
          if (settled) { self._emit('error', err); return; }
          if (err && err.type === 'unavailable-id' && attemptsLeft > 0) {
            peer.destroy();
            tryCreate(WL.randomRoomCode(), attemptsLeft - 1);
          } else {
            reject(err);
          }
        });
      }
      tryCreate(preferredCode || WL.randomRoomCode(), 6);
    });
  };

  HostNetwork.prototype._wireIncoming = function () {
    var self = this;
    this.peer.on('connection', function (conn) {
      conn.on('open', function () {
        self._emit('connOpen', conn);
      });
      conn.on('data', function (msg) {
        self._emit('data', { conn: conn, msg: msg });
      });
      conn.on('close', function () {
        self._emit('connClose', conn);
      });
      conn.on('error', function (err) {
        self._emit('connError', { conn: conn, err: err });
      });
    });
    this.peer.on('disconnected', function () { self._emit('hostDisconnected'); });
  };

  HostNetwork.prototype.registerConn = function (playerId, conn) {
    this.conns[playerId] = conn;
  };
  HostNetwork.prototype.removeConn = function (playerId) {
    delete this.conns[playerId];
  };

  HostNetwork.prototype.sendTo = function (playerId, msg) {
    var c = this.conns[playerId];
    if (c && c.open) { try { c.send(msg); } catch (e) {} }
  };

  HostNetwork.prototype.broadcast = function (msg) {
    var self = this;
    Object.keys(this.conns).forEach(function (pid) { self.sendTo(pid, msg); });
  };

  HostNetwork.prototype.close = function () {
    try { Object.values(this.conns).forEach(function (c) { c.close(); }); } catch (e) {}
    if (this.peer) { try { this.peer.destroy(); } catch (e) {} }
  };

  // ------------------------------------------------------------------
  // ClientNetwork — runs on a player device. Connects to the host peer.
  // ------------------------------------------------------------------
  function ClientNetwork() {
    this.peer = null;
    this.conn = null;
    this.handlers = {};
    this.roomCode = null;
  }

  ClientNetwork.prototype.on = function (event, fn) {
    (this.handlers[event] = this.handlers[event] || []).push(fn);
    return this;
  };
  ClientNetwork.prototype._emit = function (event, payload) {
    (this.handlers[event] || []).forEach(function (fn) { fn(payload); });
  };

  ClientNetwork.prototype.connect = function (roomCode) {
    var self = this;
    this.roomCode = roomCode;
    return new Promise(function (resolve, reject) {
      var peer = new Peer(undefined, {
        debug: 1,
        config: { iceServers: ICE_SERVERS }
      });
      var settled = false;
      var timeout = setTimeout(function () {
        if (!settled) { settled = true; reject(new Error('Nie udało się połączyć z pokojem (limit czasu). Sprawdź kod pokoju, a jeśli jest poprawny — spróbuj innej sieci (np. przełącz się z WiFi na dane mobilne albo odwrotnie), bo część sieci blokuje bezpośrednie połączenia P2P.')); }
      }, 20000);

      peer.on('open', function () {
        var conn = peer.connect(peerIdForRoom(roomCode), { reliable: true });
        self.peer = peer;
        self.conn = conn;

        conn.on('open', function () {
          if (settled) return;
          settled = true;
          clearTimeout(timeout);
          self._wire();
          resolve();
        });
        conn.on('error', function (err) {
          if (!settled) { settled = true; clearTimeout(timeout); reject(err); }
          else self._emit('error', err);
        });
      });
      peer.on('error', function (err) {
        if (!settled) { settled = true; clearTimeout(timeout); reject(err); }
        else self._emit('error', err);
      });
    });
  };

  ClientNetwork.prototype._wire = function () {
    var self = this;
    this.conn.on('data', function (msg) { self._emit('data', msg); });
    this.conn.on('close', function () { self._emit('close'); });
    this.conn.on('error', function (err) { self._emit('error', err); });
  };

  ClientNetwork.prototype.send = function (msg) {
    if (this.conn && this.conn.open) { try { this.conn.send(msg); } catch (e) {} }
  };

  ClientNetwork.prototype.close = function () {
    try { if (this.conn) this.conn.close(); } catch (e) {}
    try { if (this.peer) this.peer.destroy(); } catch (e) {}
  };

  global.WLNet = {
    HostNetwork: HostNetwork,
    ClientNetwork: ClientNetwork,
    peerIdForRoom: peerIdForRoom
  };

}(window));
