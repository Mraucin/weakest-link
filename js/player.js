/* ==========================================================================
   Weakest Link (PL) — player.js
   Runs on each player's own device/browser. Connects to the host peer,
   renders the public game state, and lets the player press BANK or draw
   on their little whiteboard during voting / tiebreak rounds.
   ========================================================================== */

(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var IDENTITY_KEY = 'wl_player_identity_v1';
  var net = new WLNet.ClientNetwork();

  var myPlayerId = null;
  var myRoomCode = null;
  var myNickname = null;
  var avatarSeed = null;
  var latestState = null;
  var canvas = null, ctx = null, drawing = false, lastPt = null, currentColor = '#1b1b1b';
  var snapshotTimer = null;
  var lastPhaseSeen = null;

  function loadIdentity() {
    try { return JSON.parse(localStorage.getItem(IDENTITY_KEY) || 'null'); } catch (e) { return null; }
  }
  function saveIdentity(obj) {
    try { localStorage.setItem(IDENTITY_KEY, JSON.stringify(obj)); } catch (e) {}
  }

  function randomAvatarSeed(base) { return (base || 'gracz') + '-' + Math.random().toString(36).slice(2, 8); }

  // ---------------------------------------------------------------------
  // Join screen
  // ---------------------------------------------------------------------
  function initJoinScreen() {
    var params = new URLSearchParams(location.search);
    var roomInput = $('#roomCodeInput');
    var nickInput = $('#nicknameInput');
    var avatarPreview = $('#avatarPreview');
    var identity = loadIdentity();

    if (params.get('room')) roomInput.value = params.get('room').toUpperCase();
    else if (identity && identity.roomCode) roomInput.value = identity.roomCode;

    nickInput.value = (identity && identity.nickname) || '';
    avatarSeed = (identity && identity.avatarSeed) || randomAvatarSeed(nickInput.value || 'gracz');
    renderAvatarPreview();

    nickInput.addEventListener('input', function () {
      if (!identity || nickInput.value !== identity.nickname) { /* keep seed unless user wants reroll */ }
    });

    $('#rerollAvatarBtn').addEventListener('click', function () {
      avatarSeed = randomAvatarSeed(nickInput.value || 'gracz');
      renderAvatarPreview();
    });

    $('#joinForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var room = roomInput.value.trim().toUpperCase();
      var nick = nickInput.value.trim().slice(0, 18);
      if (!room) { showJoinError('Podaj kod pokoju.'); return; }
      if (!nick) { showJoinError('Podaj swój pseudonim.'); return; }
      doJoin(room, nick);
    });

    function renderAvatarPreview() { avatarPreview.innerHTML = WL.avatarSvg(avatarSeed); }
  }

  function showJoinError(msg) {
    var el = $('#joinError');
    el.textContent = msg;
    el.style.display = msg ? '' : 'none';
  }

  function setJoinBusy(busy, label) {
    var btn = $('#joinBtn');
    btn.disabled = busy;
    btn.textContent = label || (busy ? 'Łączenie...' : 'Dołącz do gry');
  }

  function doJoin(roomCode, nickname) {
    setJoinBusy(true);
    showJoinError('');
    myRoomCode = roomCode;
    myNickname = nickname;

    var identity = loadIdentity();
    var rejoinId = (identity && identity.roomCode === roomCode && identity.nickname === nickname) ? identity.playerId : null;

    net.on('data', onNetData);
    net.on('close', onNetClose);
    net.on('error', function (err) { console.warn('Network error', err); });

    net.connect(roomCode).then(function () {
      net.send({ t: 'hello', nickname: nickname, avatarSeed: avatarSeed, rejoinId: rejoinId });
    }).catch(function (err) {
      setJoinBusy(false);
      showJoinError('Nie udało się połączyć: ' + (err && err.message ? err.message : 'sprawdź kod pokoju i połączenie internetowe.'));
    });
  }

  function onNetClose() {
    if (myPlayerId) {
      showGameError('Utracono połączenie z hostem. Spróbuj dołączyć ponownie.');
    }
  }

  function onNetData(msg) {
    if (!msg || !msg.t) return;
    if (msg.t === 'welcome') {
      myPlayerId = msg.playerId;
      saveIdentity({ playerId: myPlayerId, roomCode: myRoomCode, nickname: myNickname, avatarSeed: avatarSeed });
      setJoinBusy(false, 'Dołącz do gry');
      showScreen('game');
      initGameScreen();
    } else if (msg.t === 'kicked') {
      setJoinBusy(false);
      showJoinError(msg.reason || 'Zostałeś odłączony.');
      net.close();
      myPlayerId = null;
      showScreen('join');
    } else if (msg.t === 'state') {
      latestState = msg.state;
      render();
    }
  }

  function showScreen(name) {
    $$('.screen').forEach(function (s) { s.classList.toggle('active', s.id === 'screen-' + name); });
  }

  function showGameError(msg) {
    var el = $('#gameError');
    if (!el) return;
    el.textContent = msg;
    el.style.display = msg ? '' : 'none';
  }

  // ---------------------------------------------------------------------
  // Game screen
  // ---------------------------------------------------------------------
  // Fixed, intrinsic canvas resolution — chosen once and never changed by
  // window/container resizing. CSS may scale the box down (keeping this
  // exact aspect ratio) on very narrow screens, but never stretches it, and
  // ptFromEvent() below always maps pointer coordinates through the actual
  // displayed-vs-internal ratio, so the drawn line lands exactly under the
  // cursor/finger no matter what size the box ends up being shown at.
  var CANVAS_W = 480;
  var CANVAS_H = 320;

  function initGameScreen() {
    canvas = $('#drawCanvas');
    ctx = canvas.getContext('2d');
    canvas.width = CANVAS_W;
    canvas.height = CANVAS_H;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    setupCanvasEvents();
    $('#bankBtn').addEventListener('click', function () {
      net.send({ t: 'bank' });
      $('#bankBtn').classList.add('pressed');
    });
    $('#clearCanvasBtn').addEventListener('click', clearCanvas);
    $$('.pen-color').forEach(function (b) {
      b.addEventListener('click', function () {
        currentColor = b.getAttribute('data-color');
        $$('.pen-color').forEach(function (x) { x.classList.remove('active'); });
        b.classList.add('active');
      });
    });
  }

  function clearCanvas() {
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    sendSnapshotSoon();
  }

  function ptFromEvent(e) {
    var rect = canvas.getBoundingClientRect();
    // rect.width/height is the CSS-displayed size, which can be smaller than
    // the fixed CANVAS_W/CANVAS_H on narrow screens (scaled down, same
    // aspect ratio) — this ratio maps the pointer back onto the true
    // internal pixel grid so drawing always lands exactly under the cursor.
    var scaleX = canvas.width / rect.width;
    var scaleY = canvas.height / rect.height;
    var clientX, clientY;
    if (e.touches && e.touches[0]) { clientX = e.touches[0].clientX; clientY = e.touches[0].clientY; }
    else { clientX = e.clientX; clientY = e.clientY; }
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
  }

  function setupCanvasEvents() {
    function down(e) { drawing = true; lastPt = ptFromEvent(e); e.preventDefault(); }
    function move(e) {
      if (!drawing) return;
      var p = ptFromEvent(e);
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = currentColor === '#ffffff' ? 18 : 4;
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.beginPath(); ctx.moveTo(lastPt.x, lastPt.y); ctx.lineTo(p.x, p.y); ctx.stroke();
      lastPt = p;
      e.preventDefault();
    }
    function up() { if (drawing) { drawing = false; sendSnapshotSoon(); } }

    canvas.addEventListener('mousedown', down);
    canvas.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    canvas.addEventListener('touchstart', down, { passive: false });
    canvas.addEventListener('touchmove', move, { passive: false });
    canvas.addEventListener('touchend', up);
  }

  var snapshotDebounce = null;
  function sendSnapshotSoon() {
    clearTimeout(snapshotDebounce);
    snapshotDebounce = setTimeout(function () {
      if (!canvas) return;
      net.send({ t: 'boardSnapshot', dataUrl: WL.canvasToCompactDataUrl(canvas, 320) });
    }, 150);
  }

  function ensureSnapshotHeartbeat(active) {
    clearInterval(snapshotTimer);
    if (active) snapshotTimer = setInterval(sendSnapshotSoon, 2500);
  }

  // ---------------------------------------------------------------------
  // Rendering
  // ---------------------------------------------------------------------
  function me() { return latestState && latestState.players.find(function (p) { return p.id === myPlayerId; }); }

  // Track previous values so we can trigger a "level up" flash + know whether
  // to speed up the thermometer pulse — the higher the stake, the more
  // dramatic the ladder should feel.
  var prevLadderValue = { round: 0, total: 0 };

  // The track is drawn as N equal-height rows (one per ladder rung), but the
  // rungs themselves are NOT evenly spaced in value (e.g. 100 → 300 → 700 →
  // ... → 5000). A naive currentValue/max fill therefore lands in the wrong
  // place — it doesn't line up with the row the player actually just
  // reached. Instead we fill row-by-row: every rung already reached is 100%
  // filled, and — only relevant for the continuously-changing total-game
  // bar — the row currently being climbed fills proportionally to how far
  // between its lower and upper rung the value sits. For the round ladder
  // currentValue is always exactly one of the rung values (or 0), so this
  // always lands as a clean, fully-filled row with no partial sliver.
  function computeSegmentFill(values, currentValue) {
    var n = values.length;
    var fullCount = 0;
    for (var i = 0; i < n; i++) {
      if (currentValue >= values[i]) fullCount = i + 1; else break;
    }
    var fraction = 0;
    if (fullCount < n) {
      var lower = fullCount === 0 ? 0 : values[fullCount - 1];
      var upper = values[fullCount];
      fraction = upper > lower ? WL.clamp((currentValue - lower) / (upper - lower), 0, 1) : 0;
    }
    return WL.clamp(((fullCount + fraction) / n) * 100, 0, 100);
  }

  // Ladder DOM is built ONCE per (container, rung set) and then only has its
  // fill height / labels updated in place on every subsequent render. If we
  // rebuilt the whole ladder from an HTML string every broadcast (roughly
  // once a second), the CSS pulse animation on .ladder-fill would restart
  // from frame zero every single time — which is exactly what "flickering"
  // looks like instead of a smooth continuous breathing glow.
  var ladderSig = { round: null, total: null };

  function buildLadderDom(containerEl, values, label) {
    var segs = values.slice().reverse().map(function (v) {
      return '<div class="ladder-seg" data-v="' + v + '">' + WL.formatMoney(v).replace(' zł', '') + '</div>';
    }).join('');
    containerEl.innerHTML =
      '<div class="ladder">' +
        '<div class="ladder-track"><div class="ladder-fill"></div>' + segs + '</div>' +
        '<div class="ladder-value"></div>' +
        '<div class="ladder-label">' + label + '</div>' +
      '</div>';
  }

  function updateLadder(containerId, values, currentValue, label, key) {
    var containerEl = $(containerId);
    var sig = values.join(',');
    if (ladderSig[key] !== sig) {
      buildLadderDom(containerEl, values, label);
      ladderSig[key] = sig;
    }
    var pct = computeSegmentFill(values, currentValue);
    var fill = containerEl.querySelector('.ladder-fill');
    var grew = currentValue > (prevLadderValue[key] || 0);
    prevLadderValue[key] = currentValue;

    fill.style.height = pct + '%';
    fill.style.setProperty('--pct', pct);
    // Pulse gets a little faster the higher the stake climbs, but stays a
    // smooth "breathing" motion — narrow duration range, gentle easing.
    fill.style.animationDuration = (3.4 - (pct / 100) * 1.4).toFixed(2) + 's';
    if (grew) {
      fill.classList.add('flash');
      clearTimeout(fill._flashTimer);
      fill._flashTimer = setTimeout(function () { fill.classList.remove('flash'); }, 720);
    }
    containerEl.querySelectorAll('.ladder-seg').forEach(function (seg) {
      seg.classList.toggle('reached', currentValue >= parseFloat(seg.getAttribute('data-v')));
    });
    containerEl.querySelector('.ladder-value').textContent = WL.formatMoney(currentValue);
  }

  // Avatar DOM elements are created ONCE per player and then only have their
  // content/classes/position updated in place. This is essential for the
  // "avatars glide smoothly to the top row" requirement: a CSS transition on
  // left/top only animates when an EXISTING element's style changes — if we
  // rebuilt the avatar <div>s from scratch on every state update (which
  // happens roughly once per second), the browser would have nothing to
  // transition from and everything would just snap into place.
  var avatarEls = {}; // playerId -> element

  function ensureAvatarEls(players) {
    var arena = $('#arena');
    var seen = {};
    players.forEach(function (p) {
      seen[p.id] = true;
      var el = avatarEls[p.id];
      if (!el) {
        el = document.createElement('div');
        el.className = 'player-avatar-wrap';
        el.setAttribute('data-pid', p.id);
        el.innerHTML =
          '<div class="stat stat-correct"></div>' +
          '<div class="avatar-circle">' + WL.avatarSvg(p.avatarSeed) + '</div>' +
          '<div class="stat stat-wrong"></div>' +
          '<div class="player-name"></div>';
        arena.appendChild(el);
        avatarEls[p.id] = el;
      }
      el.querySelector('.stat-correct').textContent = p.correct;
      el.querySelector('.stat-wrong').textContent = p.wrong;
      el.querySelector('.player-name').textContent = p.nickname;
    });
    Object.keys(avatarEls).forEach(function (id) {
      if (!seen[id]) { avatarEls[id].remove(); delete avatarEls[id]; }
    });
  }

  function updateAvatarClasses(players, st) {
    players.forEach(function (p) {
      var el = avatarEls[p.id];
      if (!el) return;
      var cls = 'player-avatar-wrap';
      if (p.id === st.currentPlayerId && st.phase === 'question') cls += ' current';
      if (!p.alive) cls += ' eliminated';
      if (p.id === myPlayerId) cls += ' me';
      if (!p.connected) cls += ' offline';
      el.className = cls;
    });
  }

  // Rotate the seating order so that "me" always lands in the same anchor
  // spot (top of the circle / first in the voting row) — every player sees
  // themselves in the same place, with everyone else arranged around them
  // in their normal relative order.
  function rotateForMe(players) {
    if (!myPlayerId) return players;
    var idx = players.findIndex(function (p) { return p.id === myPlayerId; });
    if (idx <= 0) return players;
    return players.slice(idx).concat(players.slice(0, idx));
  }

  function layoutArena(votingMode, playersIn) {
    var arena = $('#arena');
    arena.classList.toggle('voting-mode', !!votingMode);
    var players = rotateForMe(playersIn);
    var n = players.length;
    players.forEach(function (p, i) {
      var el = avatarEls[p.id];
      if (!el) return;
      var xPct, yPct;
      if (votingMode) {
        var cols = Math.min(n, 6);
        var row = Math.floor(i / cols), col = i % cols;
        var rowCount = Math.ceil(n / cols);
        xPct = ((col + 0.5) / cols) * 100;
        yPct = 12 + row * (60 / Math.max(1, rowCount));
      } else {
        var angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        xPct = 50 + 40 * Math.cos(angle);
        yPct = 50 + 40 * Math.sin(angle);
      }
      el.style.left = xPct + '%';
      el.style.top = yPct + '%';
    });
  }

  function render() {
    if (!latestState) return;
    var st = latestState;
    showGameError('');

    $('#roomCodeBadge').textContent = st.roomCode || '';
    $('#phaseBadge').textContent = phaseLabel(st.phase);

    var players = st.players.slice();
    ensureAvatarEls(players);
    updateAvatarClasses(players, st);

    var votingLike = (st.phase === 'voting' || st.phase === 'reveal' || st.phase === 'tieVote');
    layoutArena(votingLike, players);

    // Ladders
    var roundLadder = WL.roundLadderForRound(st.round || 1);
    updateLadder('#ladderRound', roundLadder, st.chainValue || 0, 'RUNDA', 'round');
    updateLadder('#ladderTotal', WL.TOTAL_LADDER, st.totalMoney || 0, 'CAŁA GRA', 'total');

    // Timer / category
    var timerEl = $('#timerDisplay');
    var catEl = $('#categoryDisplay');
    var centerPanel = $('#centerPanel');

    var showCanvas = (st.phase === 'voting' || st.phase === 'tiebreakDraw');
    $('#canvasWrap').style.display = showCanvas ? '' : 'none';
    ensureSnapshotHeartbeat(showCanvas);
    if (showCanvas && lastPhaseSeen !== st.phase) clearCanvas();

    var bankBtn = $('#bankBtn');
    bankBtn.classList.remove('pressed');

    switch (st.phase) {
      case 'lobby':
        timerEl.textContent = '';
        catEl.textContent = 'Poczekaj na rozpoczęcie gry przez prowadzącego...';
        centerPanel.className = 'center-panel';
        setBankVisible(false);
        break;

      case 'question':
        timerEl.textContent = '⏱ ' + WL.formatClock(st.roundTimeLeft);
        catEl.textContent = st.category ? ('Kategoria: ' + st.category) : 'Runda ' + st.round;
        var iAmAnswering = st.currentPlayerId === myPlayerId;
        var bankActive = st.bankWindow && st.bankWindow.active && st.bankWindow.playerId === myPlayerId && st.chainValue > 0;
        setBankVisible(true, bankActive, iAmAnswering);
        break;

      case 'testRoundEnd':
        timerEl.textContent = '';
        catEl.textContent = '🧪 Runda testowa zakończona — nikt nie odpada!';
        setBankVisible(false);
        break;

      case 'voting':
        timerEl.textContent = '⏱ ' + WL.formatClock(st.voting.timeLeft);
        catEl.textContent = '✍️ Narysuj lub napisz, kogo eliminujesz!';
        setBankVisible(false);
        break;

      case 'reveal':
        timerEl.textContent = '';
        catEl.textContent = '👁 Odsłanianie tabliczek...';
        setBankVisible(false);
        renderRevealGallery(st);
        break;

      case 'tieVote':
        timerEl.textContent = '';
        catEl.textContent = '⚖ Remis głosów — host prosi o decyzję...';
        setBankVisible(false);
        break;

      case 'eliminationAnnounce':
        timerEl.textContent = '';
        var ep = players.find(function (p) { return p.id === st.eliminationAnnounce.playerId; });
        catEl.textContent = ep ? (ep.nickname + ' odpada z gry!') : '';
        setBankVisible(false);
        break;

      case 'penaltyIntro':
      case 'penalty':
      case 'penaltyResult':
        timerEl.textContent = '';
        catEl.textContent = '🥅 Rzuty karne · 🔥 same trudne pytania';
        setBankVisible(false);
        renderPenaltyOverlay(st);
        break;

      case 'tiebreakDraw':
        timerEl.textContent = '⏱ ' + WL.formatClock(st.tiebreak.timeLeft);
        catEl.textContent = '🎯 Napisz swoje oszacowanie!';
        setBankVisible(false);
        break;

      case 'tiebreakReveal':
        timerEl.textContent = '';
        catEl.textContent = '🎯 Host odczytuje tabliczki...';
        setBankVisible(false);
        break;

      case 'gameover':
        timerEl.textContent = '';
        catEl.textContent = '';
        setBankVisible(false);
        renderGameOverOverlay(st);
        break;

      default:
        timerEl.textContent = ''; catEl.textContent = '';
        setBankVisible(false);
    }

    if (st.phase !== 'reveal') removeOverlayById('revealGallery');
    if (st.phase !== 'penaltyIntro' && st.phase !== 'penalty' && st.phase !== 'penaltyResult') removeOverlayById('penaltyOverlay');
    if (st.phase !== 'gameover') removeOverlayById('gameoverOverlay');
    if (st.phase !== 'eliminationAnnounce') { /* no persistent overlay needed, text is enough */ }

    lastPhaseSeen = st.phase;
  }

  function setBankVisible(show, active, isMe) {
    var wrap = $('#bankBtnWrap');
    wrap.style.display = show ? '' : 'none';
    var btn = $('#bankBtn');
    btn.disabled = !active;
    btn.classList.toggle('active', !!active);
    var hint = $('#bankHint');
    if (!show) { hint.textContent = ''; return; }
    if (active) hint.textContent = 'Masz 2.5s — kliknij BANK, aby zabezpieczyć pieniądze!';
    else if (isMe) hint.textContent = 'To Twoja kolej — odpowiadaj!';
    else hint.textContent = '';
  }

  function removeOverlayById(id) { var el = document.getElementById(id); if (el) el.remove(); }

  function renderRevealGallery(st) {
    removeOverlayById('revealGallery');
    var v = st.voting;
    if (!v || v.revealedBoards.length === 0) return;
    var div = document.createElement('div');
    div.id = 'revealGallery';
    div.className = 'reveal-gallery';
    div.innerHTML = v.revealedBoards.map(function (b) {
      var p = st.players.find(function (x) { return x.id === b.playerId; });
      return '<div class="rg-item"><div class="rg-name">' + WL.escapeHtml(p ? p.nickname : '?') + '</div>' +
        (b.dataUrl ? '<img src="' + b.dataUrl + '"/>' : '<div class="rg-empty">Brak rysunku</div>') + '</div>';
    }).join('');
    $('#centerPanel').appendChild(div);
  }

  function renderPenaltyOverlay(st) {
    removeOverlayById('penaltyOverlay');
    var div = document.createElement('div');
    div.id = 'penaltyOverlay';
    div.className = 'penalty-overlay';
    if (st.phase === 'penaltyIntro') {
      div.innerHTML = '<h2>Finał!</h2><p>' + st.finalists.map(function (id) { return WL.escapeHtml((st.players.find(function (p) { return p.id === id; }) || {}).nickname); }).join(' vs ') + '</p>';
    } else if (st.phase === 'penalty' && st.penalty) {
      var ids = st.finalists;
      div.innerHTML = '<div class="po-score">' + ids.map(function (id) {
        var p = st.players.find(function (x) { return x.id === id; });
        var shooting = st.penalty.currentShooterId === id;
        return '<div class="po-team' + (shooting ? ' shooting' : '') + '">' + WL.escapeHtml(p.nickname) + ': <b>' + st.penalty.goals[id] + '</b></div>';
      }).join('<div class="po-vs">:</div>') + '</div>';
    } else if (st.phase === 'penaltyResult' && st.penalty) {
      var w = st.players.find(function (p) { return p.id === st.penalty.winnerId; });
      div.innerHTML = '<h2>🏆 ' + WL.escapeHtml(w ? w.nickname : '') + ' wygrywa rzuty karne!</h2>';
    }
    $('#centerPanel').appendChild(div);
  }

  function renderGameOverOverlay(st) {
    removeOverlayById('gameoverOverlay');
    var w = st.players.find(function (p) { return p.id === st.winnerId; });
    var div = document.createElement('div');
    div.id = 'gameoverOverlay';
    div.className = 'gameover-overlay';
    div.innerHTML = '<div class="confetti-emoji">🎉🏆🎉</div>' + (w ? ('<div class="go-avatar">' + WL.avatarSvg(w.avatarSeed) + '</div><h1>' + WL.escapeHtml(w.nickname) + '</h1><p>Zwycięzca gry! ' + WL.formatMoney(st.totalMoney) + '</p>') : '<h1>Koniec gry</h1>');
    $('#centerPanel').appendChild(div);
  }

  function phaseLabel(phase) {
    var map = {
      lobby: 'Lobby', question: 'Pytania', testRoundEnd: 'Koniec rundy testowej', voting: 'Głosowanie', reveal: 'Odsłanianie',
      tieVote: 'Remis', eliminationAnnounce: 'Eliminacja', penaltyIntro: 'Finał',
      penalty: 'Rzuty karne', penaltyResult: 'Wynik karnych', tiebreakDraw: 'Dogrywka',
      tiebreakReveal: 'Dogrywka — odczyt', gameover: 'Koniec gry'
    };
    return map[phase] || phase;
  }

  // ---------------------------------------------------------------------
  // Boot
  // ---------------------------------------------------------------------
  function boot() { initJoinScreen(); showScreen('join'); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

}());
