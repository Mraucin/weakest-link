/* ==========================================================================
   Weakest Link (PL) — common.js
   Shared constants and helper functions used by host.js and player.js.
   No build step, no dependencies — plain ES2017, works straight from
   GitHub Pages (or any static file host, or even file://).
   ========================================================================== */

(function (global) {
  'use strict';

  // ---- Game constants ------------------------------------------------

  // Left ladder — money for the CURRENT chain within a round. Resets to 0
  // on a wrong answer or when the current answerer banks it. These are BASE
  // values for round 1 — every following round multiplies each rung by the
  // round number (round 3 → 3x, round 4 → 4x, ...), so later rounds are
  // worth progressively more.
  var ROUND_LADDER_BASE = [10, 25, 50, 85, 135, 200, 300, 420];

  function roundLadderForRound(round) {
    var mult = Math.max(1, round || 1);
    return ROUND_LADDER_BASE.map(function (v) { return v * mult; });
  }

  // Right ladder — total money banked across the whole game (all rounds).
  // This bar fills PROPORTIONALLY to totalMoney / top value.
  var TOTAL_LADDER = [1000, 2500, 5000, 10000, 25000, 50000, 100000];

  var ROUND_BASE_TIME = 150; // 2:30 for round 1
  var ROUND_TIME_STEP = 10;  // each following round is 10s shorter
  var ROUND_TIME_FLOOR = 40; // never shorter than this

  var BANK_WINDOW_MS = 2500; // 2.5s window to press BANK
  var VOTE_DRAW_SECONDS = 30; // time to draw the vote
  var TIEBREAK_DRAW_SECONDS = 25;

  var MAX_PLAYERS = 10;
  var MIN_PLAYERS_TO_START = 2;
  var PENALTY_QUESTIONS_PER_PLAYER = 5;

  var ROOM_CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I
  var ROOM_PREFIX = 'wlink-';

  // ---- Small utilities -------------------------------------------------

  function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }

  function uid(prefix) {
    return (prefix || 'id') + '_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
  }

  function randomRoomCode(len) {
    len = len || 5;
    var out = '';
    for (var i = 0; i < len; i++) {
      out += ROOM_CODE_ALPHABET[Math.floor(Math.random() * ROOM_CODE_ALPHABET.length)];
    }
    return out;
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function formatMoney(n) {
    n = Math.round(n || 0);
    var s = n.toString();
    var out = '';
    var c = 0;
    for (var i = s.length - 1; i >= 0; i--) {
      out = s[i] + out;
      c++;
      if (c % 3 === 0 && i !== 0) out = ' ' + out;
    }
    return out + ' zł';
  }

  function formatClock(seconds) {
    seconds = Math.max(0, Math.round(seconds));
    var m = Math.floor(seconds / 60);
    var s = seconds % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function roundTimeForRound(round) {
    var t = ROUND_BASE_TIME - (round - 1) * ROUND_TIME_STEP;
    return Math.max(ROUND_TIME_FLOOR, t);
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ---- Avatar generation -------------------------------------------------
  // Deterministic little SVG "face" from a seed string — no network calls,
  // works fully offline / on GitHub Pages with no external avatar service.

  var AVATAR_PALETTE = [
    '#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#1abc9c',
    '#3498db', '#9b59b6', '#e84393', '#16a085', '#d35400',
    '#27ae60', '#2980b9', '#8e44ad', '#c0392b', '#f39c12'
  ];

  function hashStr(str) {
    str = String(str || '');
    var h = 0;
    for (var i = 0; i < str.length; i++) {
      h = (h << 5) - h + str.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h);
  }

  function avatarColor(seed) {
    var h = hashStr(seed);
    return AVATAR_PALETTE[h % AVATAR_PALETTE.length];
  }

  // Returns an <svg> markup string (viewBox 0 0 100 100) for a friendly face.
  function avatarSvg(seed) {
    var h = hashStr(seed);
    var bg = AVATAR_PALETTE[h % AVATAR_PALETTE.length];
    var bg2 = AVATAR_PALETTE[(h >> 3) % AVATAR_PALETTE.length];
    var eyeType = h % 3;      // 0 dot, 1 round, 2 sleepy
    var mouthType = (h >> 2) % 4; // smile variants
    var hairType = (h >> 4) % 5;
    var skin = ['#ffe0bd', '#f1c27d', '#e0ac69', '#c68642', '#8d5524'][(h >> 5) % 5];

    var eyes = '';
    if (eyeType === 0) {
      eyes = '<circle cx="38" cy="46" r="3.2" fill="#222"/><circle cx="62" cy="46" r="3.2" fill="#222"/>';
    } else if (eyeType === 1) {
      eyes = '<circle cx="38" cy="46" r="5" fill="#fff"/><circle cx="62" cy="46" r="5" fill="#fff"/>' +
             '<circle cx="39" cy="46" r="2.4" fill="#222"/><circle cx="63" cy="46" r="2.4" fill="#222"/>';
    } else {
      eyes = '<rect x="33" y="45" width="10" height="3" rx="1.5" fill="#222"/><rect x="57" y="45" width="10" height="3" rx="1.5" fill="#222"/>';
    }

    var mouth = '';
    if (mouthType === 0) mouth = '<path d="M40 62 Q50 72 60 62" stroke="#222" stroke-width="3" fill="none" stroke-linecap="round"/>';
    else if (mouthType === 1) mouth = '<path d="M38 60 Q50 78 62 60 Q50 68 38 60Z" fill="#a33"/>';
    else if (mouthType === 2) mouth = '<rect x="42" y="63" width="16" height="3.5" rx="1.7" fill="#222"/>';
    else mouth = '<path d="M40 64 Q50 58 60 64" stroke="#222" stroke-width="3" fill="none" stroke-linecap="round"/>';

    var hair = '';
    if (hairType === 0) hair = '<path d="M20 42 Q22 10 50 10 Q78 10 80 42 Q65 28 50 30 Q35 28 20 42Z" fill="#3a2a1a"/>';
    else if (hairType === 1) hair = '<circle cx="50" cy="28" r="26" fill="#222" opacity="0"/><path d="M18 40 Q50 4 82 40 L82 30 Q50 -6 18 30Z" fill="#5b3a29"/>';
    else if (hairType === 2) hair = '<path d="M18 38 Q50 8 82 38 Q78 20 50 18 Q22 20 18 38Z" fill="#d4a017"/>';
    else if (hairType === 3) hair = ''; // bald
    else hair = '<path d="M16 44 Q18 6 50 6 Q82 6 84 44 Q80 22 50 24 Q20 22 16 44Z" fill="#111"/>';

    return (
      '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="avatar">' +
        '<defs><linearGradient id="g' + h + '" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0" stop-color="' + bg + '"/><stop offset="1" stop-color="' + bg2 + '"/>' +
        '</linearGradient></defs>' +
        '<circle cx="50" cy="50" r="50" fill="url(#g' + h + ')"/>' +
        '<circle cx="50" cy="58" r="30" fill="' + skin + '"/>' +
        eyes + mouth + hair +
      '</svg>'
    );
  }

  // ---- Ladder step helpers -------------------------------------------

  function chainValueForStep(step, round) {
    if (step <= 0) return 0;
    var ladder = roundLadderForRound(round);
    return ladder[Math.min(step, ladder.length) - 1];
  }

  // ---- Simple canvas snapshot compression helper ---------------------
  // Used by players to send their board drawing over the data channel.
  function canvasToCompactDataUrl(canvas, maxW) {
    maxW = maxW || 300;
    if (canvas.width <= maxW) return canvas.toDataURL('image/png');
    var scale = maxW / canvas.width;
    var tmp = document.createElement('canvas');
    tmp.width = maxW;
    tmp.height = Math.round(canvas.height * scale);
    var ctx = tmp.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, tmp.width, tmp.height);
    ctx.drawImage(canvas, 0, 0, tmp.width, tmp.height);
    return tmp.toDataURL('image/jpeg', 0.72);
  }

  global.WL = {
    ROUND_LADDER_BASE: ROUND_LADDER_BASE,
    roundLadderForRound: roundLadderForRound,
    TOTAL_LADDER: TOTAL_LADDER,
    ROUND_BASE_TIME: ROUND_BASE_TIME,
    ROUND_TIME_STEP: ROUND_TIME_STEP,
    ROUND_TIME_FLOOR: ROUND_TIME_FLOOR,
    BANK_WINDOW_MS: BANK_WINDOW_MS,
    VOTE_DRAW_SECONDS: VOTE_DRAW_SECONDS,
    TIEBREAK_DRAW_SECONDS: TIEBREAK_DRAW_SECONDS,
    MAX_PLAYERS: MAX_PLAYERS,
    MIN_PLAYERS_TO_START: MIN_PLAYERS_TO_START,
    PENALTY_QUESTIONS_PER_PLAYER: PENALTY_QUESTIONS_PER_PLAYER,
    ROOM_PREFIX: ROOM_PREFIX,
    clamp: clamp,
    uid: uid,
    randomRoomCode: randomRoomCode,
    shuffle: shuffle,
    formatMoney: formatMoney,
    formatClock: formatClock,
    roundTimeForRound: roundTimeForRound,
    escapeHtml: escapeHtml,
    avatarColor: avatarColor,
    avatarSvg: avatarSvg,
    chainValueForStep: chainValueForStep,
    canvasToCompactDataUrl: canvasToCompactDataUrl
  };

}(window));
