/* ==========================================================================
   Weakest Link (PL) — host.js
   Runs the whole game as an authoritative state machine on the host's
   device, and pushes the sanitized public state to every connected player.
   ========================================================================== */

(function () {
  'use strict';

  var bank = new WLQuestions.QuestionBank();
  var net = new WLNet.HostNetwork();

  // Host-only secrets — never broadcast.
  var currentQuestion = null;
  var penaltyQuestion = null;
  var tiebreakQuestion = null;
  var boards = {}; // playerId -> latest dataUrl snapshot from that player
  var bankWindowTimer = null;
  var preferredCategory = ''; // '' = losowa kategoria; applies to every auto-draw

  var state = freshState();

  function freshState() {
    return {
      roomCode: null,
      phase: 'lobby', // lobby | question | testRoundEnd | voting | reveal | tieVote | eliminationAnnounce
                       // | penaltyIntro | penalty | penaltyResult
                       // | tiebreakDraw | tiebreakReveal | gameover
      round: 0,
      roundTimeTotal: 0,
      roundTimeLeft: 0,
      timerPaused: false,
      players: [],
      seatOrder: null,
      order: [],
      currentPlayerId: null,
      chainStep: 0,
      chainValue: 0,
      totalMoney: 0,
      category: null,
      bankWindow: { active: false, playerId: null },
      log: [],
      voting: null,
      tieBreakPending: null,
      eliminationAnnounce: null,
      pendingNext: null,
      finalists: [],
      penalty: null,
      tiebreak: null,
      winnerId: null
    };
  }

  function playerById(id) { return state.players.find(function (p) { return p.id === id; }); }
  function alivePlayers() { return state.players.filter(function (p) { return p.alive; }); }

  function pushLog(msg) {
    state.log.unshift({ t: Date.now(), msg: msg });
    if (state.log.length > 60) state.log.length = 60;
  }

  function broadcastState() {
    net.broadcast({ t: 'state', state: state });
    persist();
    renderAll();
  }

  // ---------------------------------------------------------------------
  // Persistence (best-effort resume if the host tab reloads/crashes)
  // ---------------------------------------------------------------------
  var SESSION_KEY = 'wl_host_session_v1';
  function persist() {
    try { localStorage.setItem(SESSION_KEY, JSON.stringify(state)); } catch (e) {}
  }
  function loadPersisted() {
    try {
      var raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) { return null; }
  }
  function clearPersisted() { try { localStorage.removeItem(SESSION_KEY); } catch (e) {} }

  // ---------------------------------------------------------------------
  // Room lifecycle
  // ---------------------------------------------------------------------
  function createRoom(preferredCode) {
    return net.open(preferredCode).then(function (code) {
      state.roomCode = code;
      pushLog('Pokój ' + code + ' utworzony.');
      broadcastState();
      return code;
    });
  }

  net.on('connOpen', function () { /* wait for hello */ });

  net.on('data', function (evt) {
    var conn = evt.conn, msg = evt.msg;
    if (!msg || !msg.t) return;
    if (msg.t === 'hello') { handleHello(conn, msg); return; }
    var pid = findPlayerIdByConn(conn);
    if (!pid) return;
    var player = playerById(pid);
    if (!player) return;

    if (msg.t === 'bank') {
      tryBank(pid);
    } else if (msg.t === 'boardSnapshot') {
      boards[pid] = msg.dataUrl || null;
    }
  });

  net.on('connClose', function (conn) {
    var pid = findPlayerIdByConn(conn);
    if (pid) {
      net.removeConn(pid);
      var p = playerById(pid);
      if (p) {
        p.connected = false;
        pushLog(p.nickname + ' rozłączył się.');
        broadcastState();
      }
    }
  });

  function findPlayerIdByConn(conn) {
    var keys = Object.keys(net.conns);
    for (var i = 0; i < keys.length; i++) { if (net.conns[keys[i]] === conn) return keys[i]; }
    return null;
  }

  function handleHello(conn, msg) {
    // Rejoin path
    if (msg.rejoinId) {
      var existing = playerById(msg.rejoinId);
      if (existing) {
        net.registerConn(existing.id, conn);
        existing.connected = true;
        conn.send({ t: 'welcome', playerId: existing.id, roomCode: state.roomCode });
        pushLog(existing.nickname + ' dołączył ponownie.');
        broadcastState();
        return;
      }
    }
    if (state.phase !== 'lobby') {
      conn.send({ t: 'kicked', reason: 'Gra już się rozpoczęła. Poczekaj na start kolejnej gry.' });
      return;
    }
    if (state.players.length >= WL.MAX_PLAYERS) {
      conn.send({ t: 'kicked', reason: 'Pokój jest pełny (maksymalnie ' + WL.MAX_PLAYERS + ' graczy).' });
      return;
    }
    var nickname = String(msg.nickname || 'Gracz').slice(0, 18).trim() || 'Gracz';
    var base = nickname, i = 2;
    while (state.players.some(function (p) { return p.nickname.toLowerCase() === nickname.toLowerCase(); })) {
      nickname = base + ' ' + (i++);
    }
    var player = {
      id: WL.uid('p'), nickname: nickname, avatarSeed: msg.avatarSeed || nickname,
      correct: 0, wrong: 0, alive: true, connected: true, eliminatedRound: null
    };
    state.players.push(player);
    net.registerConn(player.id, conn);
    conn.send({ t: 'welcome', playerId: player.id, roomCode: state.roomCode });
    pushLog(nickname + ' dołączył do gry.');
    broadcastState();
  }

  function kickPlayer(id) {
    var p = playerById(id);
    if (!p) return;
    net.sendTo(id, { t: 'kicked', reason: 'Zostałeś usunięty przez hosta.' });
    net.removeConn(id);
    state.players = state.players.filter(function (x) { return x.id !== id; });
    pushLog(p.nickname + ' został usunięty z pokoju.');
    broadcastState();
  }

  // ---------------------------------------------------------------------
  // Round flow
  // ---------------------------------------------------------------------
  function startGame() {
    if (state.players.length < WL.MIN_PLAYERS_TO_START) { alert('Potrzeba co najmniej ' + WL.MIN_PLAYERS_TO_START + ' graczy.'); return; }
    state.seatOrder = WL.shuffle(state.players.map(function (p) { return p.id; }));
    state.round = 0;
    state.totalMoney = 0;
    bank.resetUsed();
    startRound();
    switchTab('game');
  }

  function startRound() {
    state.round++;
    state.roundTimeTotal = WL.roundTimeForRound(state.round);
    state.roundTimeLeft = state.roundTimeTotal;
    state.timerPaused = false;
    state.order = state.seatOrder.filter(function (id) { var p = playerById(id); return p && p.alive; });
    state.currentPlayerId = state.order[0] || null;
    state.chainStep = 0;
    state.chainValue = 0;
    state.category = null;
    state.bankWindow = { active: false, playerId: null };
    state.phase = 'question';
    currentQuestion = null;
    pushLog('▶ Runda ' + state.round + ' rozpoczęta (' + WL.formatClock(state.roundTimeTotal) + ').');
    broadcastState();
    drawQuestion(preferredCategory);
  }

  function nextPlayerAfter(id) {
    var idx = state.order.indexOf(id);
    if (idx === -1) return state.order[0] || null;
    return state.order[(idx + 1) % state.order.length];
  }

  function openBankWindow(playerId) {
    if (!playerId) return;
    state.bankWindow = { active: true, playerId: playerId };
    broadcastState();
    clearTimeout(bankWindowTimer);
    bankWindowTimer = setTimeout(function () {
      if (state.bankWindow.active && state.bankWindow.playerId === playerId) {
        state.bankWindow.active = false;
        broadcastState();
      }
    }, WL.BANK_WINDOW_MS + 150);
  }

  // Pytania pojawiają się automatycznie — bez klikania "Losuj": raz na
  // początku rundy i natychmiast po każdym zatwierdzeniu/odrzuceniu
  // odpowiedzi (patrz gradeAnswer/startRound/beginPenaltyKicks/gradePenalty).
  function drawQuestion(category) {
    if (state.phase !== 'question' || currentQuestion) return;
    var q = bank.draw({ category: category || null });
    if (!q && category) q = bank.draw({ category: null }); // fallback: kategoria wyczerpana → dowolna
    if (!q) { pushLog('⚠️ Brak dostępnych pytań w banku! Dodaj pytania w edytorze.'); broadcastState(); return; }
    currentQuestion = q;
    state.category = q.category;
    openBankWindow(state.currentPlayerId);
  }

  function rerollQuestion() {
    if (state.phase !== 'question') return;
    currentQuestion = null;
    drawQuestion(preferredCategory);
  }

  function useSpecificQuestion(id) {
    if (state.phase !== 'question') return;
    var q = bank.all().find(function (x) { return x.id === id; });
    if (!q) return;
    bank.markUsed(id);
    currentQuestion = q;
    state.category = q.category;
    openBankWindow(state.currentPlayerId);
  }

  function tryBank(playerId) {
    if (state.phase !== 'question') return;
    if (!state.bankWindow.active || state.bankWindow.playerId !== playerId) return;
    if (state.chainValue <= 0) return;
    var p = playerById(playerId);
    state.totalMoney += state.chainValue;
    pushLog('🏦 ' + p.nickname + ' zbankował ' + WL.formatMoney(state.chainValue) + '!');
    state.chainStep = 0;
    state.chainValue = 0;
    state.bankWindow.active = false;
    broadcastState();
  }

  function gradeAnswer(correct) {
    if (state.phase !== 'question' || !currentQuestion) return;
    state.bankWindow.active = false;
    var player = playerById(state.currentPlayerId);
    if (!player) return;
    if (correct) {
      player.correct++;
      state.chainStep = Math.min(state.chainStep + 1, WL.ROUND_LADDER_BASE.length);
      state.chainValue = WL.chainValueForStep(state.chainStep, state.round);
      pushLog('✅ ' + player.nickname + ' — poprawnie! Łańcuch: ' + WL.formatMoney(state.chainValue));
    } else {
      player.wrong++;
      if (state.chainValue > 0) pushLog('❌ ' + player.nickname + ' — źle! Traci ' + WL.formatMoney(state.chainValue) + '.');
      else pushLog('❌ ' + player.nickname + ' — źle.');
      state.chainStep = 0;
      state.chainValue = 0;
    }
    state.currentPlayerId = nextPlayerAfter(state.currentPlayerId);
    currentQuestion = null;
    broadcastState();
    drawQuestion(preferredCategory); // shows the next question automatically
  }

  function forceEndRound() { if (state.phase === 'question') endRound(); }

  function endRound() {
    state.bankWindow.active = false;
    currentQuestion = null;
    boards = {};
    if (state.round === 1) {
      // Runda 1 jest rundą testową — nikt nie odpada, od razu przechodzimy dalej.
      state.phase = 'testRoundEnd';
      pushLog('🧪 Runda testowa (1) zakończona — nikt nie odpada. Startujemy rundę 2!');
      broadcastState();
      return;
    }
    state.phase = 'voting';
    var ids = alivePlayers().map(function (p) { return p.id; });
    state.voting = {
      active: true,
      timeLeft: WL.VOTE_DRAW_SECONDS,
      revealOrder: WL.shuffle(ids),
      revealIndex: -1,
      revealedBoards: []
    };
    pushLog('⏱ Koniec rundy ' + state.round + '! Głosowanie na najsłabsze ogniwo.');
    broadcastState();
  }

  function proceedAfterTestRound() {
    if (state.phase !== 'testRoundEnd') return;
    startRound();
  }

  function revealNextBoard() {
    var v = state.voting;
    if (!v || v.revealIndex + 1 >= v.revealOrder.length) return;
    v.revealIndex++;
    var pid = v.revealOrder[v.revealIndex];
    v.revealedBoards.push({ playerId: pid, dataUrl: boards[pid] || null, votedFor: null });
    broadcastState();
  }

  function setBoardVote(boardIdx, votedForId) {
    var v = state.voting;
    if (!v || !v.revealedBoards[boardIdx]) return;
    v.revealedBoards[boardIdx].votedFor = votedForId || null;
    broadcastState();
  }

  function tallyVotes() {
    var v = state.voting;
    var tally = {};
    v.revealedBoards.forEach(function (b) { if (b.votedFor) tally[b.votedFor] = (tally[b.votedFor] || 0) + 1; });
    return tally;
  }

  function finalizeVoting() {
    var v = state.voting;
    if (!v) return;
    var tally = tallyVotes();
    var ids = alivePlayers().map(function (p) { return p.id; });
    var max = 0;
    ids.forEach(function (id) { if ((tally[id] || 0) > max) max = tally[id] || 0; });
    var top = ids.filter(function (id) { return (tally[id] || 0) === max && max > 0; });
    if (top.length === 0) { alert('Żaden gracz nie ma jeszcze przypisanego głosu — przypisz głosy do odsłoniętych tabliczek.'); return; }
    if (top.length === 1) { confirmElimination(top[0], tally, null); return; }
    var decider = ids.slice().sort(function (a, b) { return playerById(b).correct - playerById(a).correct; })[0];
    state.tieBreakPending = { candidates: top, deciderId: decider, tally: tally };
    state.phase = 'tieVote';
    broadcastState();
  }

  function resolveTie(chosenId) {
    var tp = state.tieBreakPending;
    if (!tp) return;
    confirmElimination(chosenId, tp.tally, tp.deciderId);
  }

  function confirmElimination(id, tally, tieDeciderId) {
    var p = playerById(id);
    if (!p) return;
    p.alive = false;
    p.eliminatedRound = state.round;
    state.eliminationAnnounce = { playerId: id, tally: tally, deciderId: tieDeciderId || null };
    state.tieBreakPending = null;
    var voting = state.voting;
    if (voting) voting.active = false;
    pushLog('🚪 ' + p.nickname + ' odpada z gry!' + (tieDeciderId ? ' (remis rozstrzygnięty przez ' + playerById(tieDeciderId).nickname + ')' : ''));
    var remaining = alivePlayers().length;
    if (remaining === 2) state.pendingNext = 'penalty';
    else if (remaining <= 1) state.pendingNext = 'gameover-solo';
    else state.pendingNext = 'nextRound';
    state.phase = 'eliminationAnnounce';
    broadcastState();
  }

  function proceedAfterAnnounce() {
    var next = state.pendingNext;
    state.eliminationAnnounce = null;
    state.pendingNext = null;
    if (next === 'penalty') startPenaltyIntro();
    else if (next === 'gameover-solo') {
      state.winnerId = alivePlayers()[0] ? alivePlayers()[0].id : null;
      state.phase = 'gameover';
      broadcastState();
    } else {
      startRound();
    }
  }

  // ---------------------------------------------------------------------
  // Penalty shootout
  // ---------------------------------------------------------------------
  function startPenaltyIntro() {
    var finalists = alivePlayers().map(function (p) { return p.id; });
    state.finalists = finalists;
    state.phase = 'penaltyIntro';
    state.penalty = {
      shooterOrder: WL.shuffle(finalists),
      goals: {}, attempts: {},
      currentShooterId: null,
      decided: false, winnerId: null
    };
    finalists.forEach(function (id) { state.penalty.goals[id] = 0; state.penalty.attempts[id] = 0; });
    pushLog('🥅 Finał! Rzuty karne pomiędzy ' + finalists.map(function (id) { return playerById(id).nickname; }).join(' i ') + '.');
    broadcastState();
  }

  function beginPenaltyKicks() {
    state.phase = 'penalty';
    state.penalty.currentShooterId = state.penalty.shooterOrder[0];
    penaltyQuestion = null;
    broadcastState();
    drawPenaltyQuestion(preferredCategory);
  }

  // Finał (rzuty karne, 1v1) losuje wyłącznie trudne pytania — z fallbackiem
  // na łatwiejsze, gdyby bank nie miał już żadnych trudnych do wzięcia.
  function drawPenaltyQuestion(category) {
    if (state.phase !== 'penalty' || penaltyQuestion) return;
    var q = bank.draw({ category: category || null, difficulty: 'h' });
    if (!q && category) q = bank.draw({ category: null, difficulty: 'h' }); // fallback: kategoria wyczerpana → dowolna trudna
    if (!q) q = bank.draw({ category: category || null }); // fallback: brak trudnych → dowolna trudność w tej kategorii
    if (!q) q = bank.draw({ category: null }); // ostateczny fallback: cokolwiek jest w banku
    if (!q) { pushLog('⚠️ Brak dostępnych pytań w banku!'); broadcastState(); return; }
    penaltyQuestion = q;
    renderAll();
  }

  function gradePenalty(correct) {
    if (state.phase !== 'penalty' || !penaltyQuestion) return;
    var p = state.penalty;
    var pid = p.currentShooterId;
    var player = playerById(pid);
    p.attempts[pid]++;
    if (correct) { p.goals[pid]++; player.correct++; pushLog('⚽ GOL! ' + player.nickname + ' (' + p.goals[pid] + ')'); }
    else { player.wrong++; pushLog('🚫 Brak gola — ' + player.nickname); }
    penaltyQuestion = null;

    var ids = state.finalists, a = ids[0], b = ids[1];
    var remA = WL.PENALTY_QUESTIONS_PER_PLAYER - p.attempts[a];
    var remB = WL.PENALTY_QUESTIONS_PER_PLAYER - p.attempts[b];
    var ga = p.goals[a], gb = p.goals[b];

    var continues = false;
    if (ga > gb + remB) { finishPenalty(a); }
    else if (gb > ga + remA) { finishPenalty(b); }
    else if (remA <= 0 && remB <= 0) {
      if (ga !== gb) finishPenalty(ga > gb ? a : b);
      else { broadcastState(); startTiebreak(); return; }
    } else {
      var other = pid === a ? b : a;
      var otherRem = other === a ? remA : remB;
      var prevRem = pid === a ? remA : remB;
      p.currentShooterId = otherRem > 0 ? other : (prevRem > 0 ? pid : other);
      continues = true;
    }
    broadcastState();
    if (continues) drawPenaltyQuestion(preferredCategory);
  }

  function finishPenalty(winnerId) {
    state.penalty.decided = true;
    state.penalty.winnerId = winnerId;
    state.phase = 'penaltyResult';
    pushLog('🏆 ' + playerById(winnerId).nickname + ' wygrywa rzuty karne!');
  }

  function startTiebreak() {
    boards = {};
    tiebreakQuestion = bank.draw({ type: 'estimate' });
    if (!tiebreakQuestion) {
      alert('Brak pytań typu "Szacowanie" w banku pytań! Dodaj je w Edytorze pytań, aby rozstrzygnąć remis.');
      state.phase = 'penaltyIntro';
      broadcastState();
      return;
    }
    state.phase = 'tiebreakDraw';
    state.tiebreak = { active: true, timeLeft: WL.TIEBREAK_DRAW_SECONDS, resolved: false, winnerId: null };
    pushLog('🎯 Remis! Dogrywka — szacowanie wartości.');
    broadcastState();
  }

  function resolveTiebreak(guessesObj) {
    var ids = state.finalists;
    var target = tiebreakQuestion.numericAnswer;
    var diffs = ids.map(function (id) {
      var g = guessesObj[id];
      var diff = (g === null || g === undefined || isNaN(g)) ? Infinity : Math.abs(g - target);
      return { id: id, diff: diff, guess: g };
    });
    diffs.sort(function (x, y) { return x.diff - y.diff; });
    if (diffs[0].diff === Infinity) { alert('Podaj przynajmniej jedną odczytaną wartość.'); return; }
    if (diffs[0].diff === diffs[1].diff) {
      pushLog('🎯 Remis w szacowaniu — kolejne pytanie!');
      startTiebreak();
      return;
    }
    var winnerId = diffs[0].id;
    state.tiebreak.resolved = true;
    state.tiebreak.winnerId = winnerId;
    state.tiebreak.guesses = guessesObj;
    state.tiebreak.correctValue = target;
    state.tiebreak.questionFull = tiebreakQuestion.question + ' — poprawna wartość: ' + tiebreakQuestion.answer;
    state.penalty.winnerId = winnerId;
    state.penalty.decided = true;
    state.phase = 'penaltyResult';
    pushLog('🏆 ' + playerById(winnerId).nickname + ' wygrywa dogrywkę i cały turniej!');
    broadcastState();
  }

  function finishGame() {
    state.winnerId = state.penalty ? state.penalty.winnerId : state.winnerId;
    state.phase = 'gameover';
    pushLog('🏆🏆 ' + (playerById(state.winnerId) ? playerById(state.winnerId).nickname : '???') + ' wygrywa całą grę!');
    broadcastState();
    clearPersisted();
  }

  function newGameSameRoom() {
    state.players.forEach(function (p) { p.correct = 0; p.wrong = 0; p.alive = true; p.eliminatedRound = null; });
    state.round = 0; state.phase = 'lobby'; state.totalMoney = 0; state.chainStep = 0; state.chainValue = 0;
    state.finalists = []; state.winnerId = null; state.penalty = null; state.tiebreak = null; state.voting = null;
    state.log = []; state.seatOrder = null; state.eliminationAnnounce = null; state.pendingNext = null; state.tieBreakPending = null;
    currentQuestion = null; penaltyQuestion = null; tiebreakQuestion = null; boards = {};
    bank.resetUsed();
    pushLog('🔄 Nowa gra w tym samym pokoju.');
    broadcastState();
    switchTab('lobby');
  }

  // ---------------------------------------------------------------------
  // Ticker — drives all countdowns (round timer, vote timer, tiebreak timer)
  // ---------------------------------------------------------------------
  setInterval(function () {
    if (state.phase === 'question' && !state.timerPaused) {
      state.roundTimeLeft = Math.max(0, state.roundTimeLeft - 1);
      if (state.roundTimeLeft <= 0) { endRound(); return; }
      broadcastState();
    } else if (state.phase === 'voting' && state.voting && state.voting.active) {
      state.voting.timeLeft = Math.max(0, state.voting.timeLeft - 1);
      if (state.voting.timeLeft <= 0) {
        state.voting.active = false;
        state.phase = 'reveal';
        pushLog('✍️ Czas na rysowanie minął — czas pokazać tabliczki!');
      }
      broadcastState();
    } else if (state.phase === 'tiebreakDraw' && state.tiebreak && state.tiebreak.active) {
      state.tiebreak.timeLeft = Math.max(0, state.tiebreak.timeLeft - 1);
      if (state.tiebreak.timeLeft <= 0) {
        state.tiebreak.active = false;
        state.phase = 'tiebreakReveal';
        pushLog('✍️ Czas minął — pokażcie tabliczki z szacowaniem.');
      }
      broadcastState();
    }
  }, 1000);

  // =======================================================================
  // RENDERING (host admin UI)
  // =======================================================================
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function switchTab(name) {
    $$('.tab-btn').forEach(function (b) { b.classList.toggle('active', b.dataset.tab === name); });
    $$('.tab-panel').forEach(function (p) { p.classList.toggle('active', p.id === 'tab-' + name); });
  }

  function renderAll() {
    renderRoomPill();
    renderLobby();
    renderGameStage();
  }

  function renderRoomPill() {
    var el = $('#roomPill');
    if (!el) return;
    el.textContent = state.roomCode ? ('Pokój: ' + state.roomCode) : 'Pokój: ----';
    var link = $('#joinLink');
    if (link) {
      if (state.roomCode) {
        var url = location.origin + location.pathname.replace(/host\.html$/, '') + 'player.html?room=' + state.roomCode;
        link.href = url; link.textContent = url; link.style.display = '';
      } else { link.style.display = 'none'; }
    }
  }

  function avatarHtml(seed, size) {
    return '<div class="avatar" style="width:' + (size || 56) + 'px;height:' + (size || 56) + 'px">' + WL.avatarSvg(seed) + '</div>';
  }

  function renderLobby() {
    var list = $('#lobbyPlayerList');
    if (!list) return;
    if (state.players.length === 0) {
      list.innerHTML = '<div class="empty-hint">Nikt jeszcze nie dołączył. Podaj graczom kod pokoju.</div>';
    } else {
      list.innerHTML = state.players.map(function (p) {
        return '<div class="lobby-player ' + (p.connected ? '' : 'disconnected') + '">' +
          avatarHtml(p.avatarSeed, 44) +
          '<span class="lp-name">' + WL.escapeHtml(p.nickname) + (p.connected ? '' : ' <em>(rozłączony)</em>') + '</span>' +
          '<button class="icon-btn" data-kick="' + p.id + '" title="Usuń">✕</button>' +
        '</div>';
      }).join('');
      $$('[data-kick]', list).forEach(function (btn) {
        btn.addEventListener('click', function () { if (confirm('Usunąć gracza z pokoju?')) kickPlayer(btn.getAttribute('data-kick')); });
      });
    }
    var count = $('#lobbyCount'); if (count) count.textContent = state.players.length + ' / ' + WL.MAX_PLAYERS;
    var startBtn = $('#startGameBtn');
    if (startBtn) startBtn.disabled = state.players.length < WL.MIN_PLAYERS_TO_START || !state.roomCode;
  }

  function rosterMini(highlightId) {
    return '<div class="roster-mini">' + state.players.map(function (p) {
      return '<div class="rm-item ' + (p.id === highlightId ? 'current' : '') + ' ' + (p.alive ? '' : 'eliminated') + '">' +
        avatarHtml(p.avatarSeed, 34) +
        '<div class="rm-meta"><span class="rm-name">' + WL.escapeHtml(p.nickname) + '</span>' +
        '<span class="rm-stats"><b class="ok">' + p.correct + '</b> · <b class="bad">' + p.wrong + '</b></span></div>' +
      '</div>';
    }).join('') + '</div>';
  }

  function renderGameStage() {
    var stage = $('#gameStage');
    if (!stage) return;
    var html = '';

    switch (state.phase) {
      case 'lobby':
        html = '<div class="stage-empty">Rozpocznij grę w zakładce <b>Lobby</b>, aby zobaczyć panel prowadzącego.</div>';
        break;

      case 'question':
        html = renderQuestionStage();
        break;

      case 'voting':
        html = renderVotingStage();
        break;

      case 'reveal':
        html = renderRevealStage();
        break;

      case 'tieVote':
        html = renderTieVoteStage();
        break;

      case 'testRoundEnd':
        html = renderTestRoundEndStage();
        break;

      case 'eliminationAnnounce':
        html = renderEliminationStage();
        break;

      case 'penaltyIntro':
        html = renderPenaltyIntroStage();
        break;

      case 'penalty':
        html = renderPenaltyStage();
        break;

      case 'penaltyResult':
        html = renderPenaltyResultStage();
        break;

      case 'tiebreakDraw':
        html = renderTiebreakDrawStage();
        break;

      case 'tiebreakReveal':
        html = renderTiebreakRevealStage();
        break;

      case 'gameover':
        html = renderGameOverStage();
        break;
    }

    stage.innerHTML = html;
    bindStageActions(stage);
  }

  function catOptionsHtml(selected) {
    var cats = bank.categories();
    return '<option value="">Losowa kategoria</option>' + cats.map(function (c) {
      return '<option value="' + WL.escapeHtml(c) + '"' + (c === selected ? ' selected' : '') + '>' + WL.escapeHtml(c) + '</option>';
    }).join('');
  }

  function renderQuestionStage() {
    var player = playerById(state.currentPlayerId);
    var bw = state.bankWindow;
    return (
      '<div class="stage-top">' +
        '<div class="stage-timer">Runda ' + state.round + ' &nbsp;·&nbsp; ⏱ ' + WL.formatClock(state.roundTimeLeft) + ' / ' + WL.formatClock(state.roundTimeTotal) +
          '<button class="btn tiny ghost" data-act="pauseTimer">' + (state.timerPaused ? '▶ Wznów' : '⏸ Pauza') + '</button>' +
          '<button class="btn tiny danger-ghost" data-act="forceEndRound">Zakończ rundę</button>' +
        '</div>' +
        '<div class="stage-money">Łańcuch: <b>' + WL.formatMoney(state.chainValue) + '</b> &nbsp;·&nbsp; Bank gry: <b>' + WL.formatMoney(state.totalMoney) + '</b></div>' +
      '</div>' +
      '<div class="stage-main two-col">' +
        '<div class="qcard">' +
          '<div class="qcard-who">Odpowiada: <b>' + (player ? WL.escapeHtml(player.nickname) : '—') + '</b>' +
            (bw.active && bw.playerId === state.currentPlayerId ? ' <span class="bank-pill">okno BANK aktywne (2.5s)</span>' : '') +
          '</div>' +
          '<div class="qcard-draw">' +
            '<select id="catFilterSelect">' + catOptionsHtml(preferredCategory) + '</select>' +
            '<button class="btn tiny ghost" data-act="rerollQuestion">🔄 Losuj inne pytanie</button>' +
          '</div>' +
          (currentQuestion ? (
            '<div class="qcard-cat">' + WL.escapeHtml(currentQuestion.category) + '</div>' +
            '<div class="qcard-q">' + WL.escapeHtml(currentQuestion.question) + '</div>' +
            '<div class="qcard-a">Odpowiedź: <b>' + WL.escapeHtml(currentQuestion.answer) + '</b></div>' +
            '<div class="qcard-actions">' +
              '<button class="btn big good" data-act="grade" data-val="1">✅ Dobrze (A)</button>' +
              '<button class="btn big ghost" data-act="rerollQuestion">🔄 Nowe pytanie (S)</button>' +
              '<button class="btn big bad" data-act="grade" data-val="0">❌ Źle (D)</button>' +
            '</div>'
          ) : (
            '<div class="stage-empty">Losowanie pytania...</div>'
          )) +
          '<div class="qcard-manual">' +
            '<select id="manualQSelect"><option value="">— wybierz konkretne pytanie ręcznie —</option>' +
              bank.all().filter(function (q) { return q.type !== 'estimate'; }).map(function (q) {
                return '<option value="' + q.id + '">[' + WL.escapeHtml(q.category) + '] ' + WL.escapeHtml(q.question).slice(0, 60) + '</option>';
              }).join('') +
            '</select>' +
            '<button class="btn ghost" data-act="useManualQuestion">Użyj wybranego</button>' +
          '</div>' +
        '</div>' +
        '<div class="side-col">' + rosterMini(state.currentPlayerId) + renderLogFeed() + '</div>' +
      '</div>'
    );
  }

  function renderLogFeed() {
    return '<div class="log-feed">' + state.log.slice(0, 12).map(function (l) {
      return '<div class="log-item">' + WL.escapeHtml(l.msg) + '</div>';
    }).join('') + '</div>';
  }

  function renderVotingStage() {
    var v = state.voting;
    return (
      '<div class="stage-top"><div class="stage-timer">🗳 Głosowanie — rysowanie &nbsp;·&nbsp; ⏱ ' + WL.formatClock(v.timeLeft) + '</div></div>' +
      '<div class="stage-main">' +
        '<p>Gracze rysują teraz na swoich tabliczkach, kogo chcą wyeliminować. Po czasie przejdziesz do odsłaniania tabliczek.</p>' +
        rosterMini(null) +
        '<button class="btn" data-act="skipToReveal">Przejdź do odsłaniania teraz</button>' +
      '</div>'
    );
  }

  function renderRevealStage() {
    var v = state.voting;
    var doneAll = v.revealIndex + 1 >= v.revealOrder.length;
    var tally = tallyVotes();
    return (
      '<div class="stage-top"><div class="stage-timer">🗳 Odsłanianie tabliczek (' + (v.revealIndex + 1) + ' / ' + v.revealOrder.length + ')</div></div>' +
      '<div class="stage-main two-col">' +
        '<div>' +
          (!doneAll ? '<button class="btn big" data-act="revealNext">👁 Pokaż kolejną tabliczkę</button>' :
            '<div class="stage-empty">Wszystkie tabliczki odsłonięte.</div>') +
          '<div class="reveal-list">' +
            v.revealedBoards.map(function (b, idx) {
              var p = playerById(b.playerId);
              return '<div class="reveal-item">' +
                '<div class="reveal-who">' + avatarHtml(p.avatarSeed, 32) + '<b>' + WL.escapeHtml(p.nickname) + '</b></div>' +
                (b.dataUrl ? '<img class="board-img" src="' + b.dataUrl + '"/>' : '<div class="board-img empty">Brak rysunku</div>') +
                '<label>Głos na: <select data-vote-idx="' + idx + '">' +
                  '<option value="">— wybierz —</option>' +
                  alivePlayers().map(function (ap) { return '<option value="' + ap.id + '"' + (b.votedFor === ap.id ? ' selected' : '') + '>' + WL.escapeHtml(ap.nickname) + '</option>'; }).join('') +
                '</select></label>' +
              '</div>';
            }).join('') +
          '</div>' +
        '</div>' +
        '<div class="side-col">' +
          '<h4>Aktualne głosy</h4>' +
          '<div class="tally-list">' + alivePlayers().map(function (p) {
            return '<div class="tally-row"><span>' + WL.escapeHtml(p.nickname) + '</span><b>' + (tally[p.id] || 0) + '</b></div>';
          }).join('') + '</div>' +
          '<button class="btn big danger" data-act="finalizeVoting">Zakończ głosowanie i wyeliminuj</button>' +
        '</div>' +
      '</div>'
    );
  }

  function renderTieVoteStage() {
    var tp = state.tieBreakPending;
    var decider = playerById(tp.deciderId);
    return (
      '<div class="stage-top"><div class="stage-timer">⚖ Remis głosów!</div></div>' +
      '<div class="stage-main">' +
        '<p>Remis pomiędzy: <b>' + tp.candidates.map(function (id) { return WL.escapeHtml(playerById(id).nickname); }).join(', ') + '</b></p>' +
        '<p><b>' + WL.escapeHtml(decider.nickname) + '</b> ma najwięcej poprawnych odpowiedzi (' + decider.correct + ') i decyduje, kto odpada:</p>' +
        '<div class="tie-choices">' + tp.candidates.map(function (id) {
          var p = playerById(id);
          return '<button class="btn big danger-ghost" data-act="resolveTie" data-val="' + id + '">' + avatarHtml(p.avatarSeed, 40) + ' Wyeliminuj ' + WL.escapeHtml(p.nickname) + '</button>';
        }).join('') + '</div>' +
      '</div>'
    );
  }

  function renderTestRoundEndStage() {
    return (
      '<div class="stage-main center-stage">' +
        '<div class="elim-banner test-round-banner">' +
          '<h2>🧪 Runda testowa zakończona!</h2>' +
          '<p>Nikt nie odpada — to była rozgrzewka. Od rundy 2 zaczynają się prawdziwe eliminacje.</p>' +
        '</div>' +
        '<button class="btn big" data-act="proceedAfterTestRound">Rozpocznij rundę 2 →</button>' +
      '</div>'
    );
  }

  function renderEliminationStage() {
    var ea = state.eliminationAnnounce;
    var p = playerById(ea.playerId);
    return (
      '<div class="stage-main center-stage">' +
        '<div class="elim-banner">' + avatarHtml(p.avatarSeed, 96) +
          '<h2>' + WL.escapeHtml(p.nickname) + ' odpada z gry!</h2>' +
          (ea.deciderId ? '<p>Remis rozstrzygnięty przez ' + WL.escapeHtml(playerById(ea.deciderId).nickname) + '.</p>' : '') +
        '</div>' +
        '<button class="btn big" data-act="proceedAfterAnnounce">Kontynuuj →</button>' +
      '</div>'
    );
  }

  function renderPenaltyIntroStage() {
    return (
      '<div class="stage-main center-stage">' +
        '<h2>🥅 Finał — Rzuty karne</h2>' +
        '<p>' + state.finalists.map(function (id) { return WL.escapeHtml(playerById(id).nickname); }).join(' &nbsp;vs&nbsp; ') + '</p>' +
        '<p>Każdy z finalistów odpowiada na do ' + WL.PENALTY_QUESTIONS_PER_PLAYER + ' pytań. Przewaga nie do odrobienia kończy serię wcześniej.</p>' +
        '<button class="btn big" data-act="beginPenaltyKicks">Rozpocznij rzuty karne</button>' +
      '</div>'
    );
  }

  function renderPenaltyStage() {
    var p = state.penalty;
    var ids = state.finalists, a = ids[0], b = ids[1];
    var shooter = playerById(p.currentShooterId);
    return (
      '<div class="stage-top"><div class="stage-timer">🥅 Rzuty karne — kolejka ' + shooter.nickname +
        ' <span class="hard-round-pill" title="Finał losuje tylko trudne pytania">🔥 same trudne</span>' +
      '</div></div>' +
      '<div class="penalty-score">' +
        penaltyScoreCard(a, p) + '<div class="vs">:</div>' + penaltyScoreCard(b, p) +
      '</div>' +
      '<div class="stage-main two-col">' +
        '<div class="qcard">' +
          '<div class="qcard-who">Strzela: <b>' + WL.escapeHtml(shooter.nickname) + '</b></div>' +
          '<div class="qcard-draw">' +
            '<select id="catFilterSelect">' + catOptionsHtml(preferredCategory) + '</select>' +
            '<button class="btn tiny ghost" data-act="rerollPenaltyQuestion">🔄 Losuj inne pytanie</button>' +
          '</div>' +
          (penaltyQuestion ? (
            '<div class="qcard-cat">' + WL.escapeHtml(penaltyQuestion.category) + '</div>' +
            '<div class="qcard-q">' + WL.escapeHtml(penaltyQuestion.question) + '</div>' +
            '<div class="qcard-a">Odpowiedź: <b>' + WL.escapeHtml(penaltyQuestion.answer) + '</b></div>' +
            '<div class="qcard-actions">' +
              '<button class="btn big good" data-act="gradePenalty" data-val="1">⚽ Gol (A)</button>' +
              '<button class="btn big ghost" data-act="rerollPenaltyQuestion">🔄 Nowe pytanie (S)</button>' +
              '<button class="btn big bad" data-act="gradePenalty" data-val="0">🚫 Brak (D)</button>' +
            '</div>'
          ) : (
            '<div class="stage-empty">Losowanie pytania...</div>'
          )) +
        '</div>' +
        '<div class="side-col">' + renderLogFeed() + '</div>' +
      '</div>'
    );
  }

  function penaltyScoreCard(id, p) {
    var pl = playerById(id);
    var dots = '';
    for (var i = 0; i < WL.PENALTY_QUESTIONS_PER_PLAYER; i++) {
      var used = i < p.attempts[id];
      var scored = i < p.goals[id];
      dots += '<span class="pk-dot ' + (used ? (scored ? 'scored' : 'missed') : '') + '"></span>';
    }
    return '<div class="pk-card">' + avatarHtml(pl.avatarSeed, 48) + '<div><b>' + WL.escapeHtml(pl.nickname) + '</b><div class="pk-dots">' + dots + '</div></div><div class="pk-goals">' + p.goals[id] + '</div></div>';
  }

  function renderPenaltyResultStage() {
    var winner = playerById(state.penalty.winnerId);
    return (
      '<div class="stage-main center-stage">' +
        '<h2>🏆 ' + WL.escapeHtml(winner.nickname) + ' wygrywa rzuty karne!</h2>' +
        (state.tiebreak && state.tiebreak.resolved ? '<p>' + WL.escapeHtml(state.tiebreak.questionFull) + '</p>' : '') +
        '<button class="btn big" data-act="finishGame">Zakończ grę i pokaż zwycięzcę</button>' +
      '</div>'
    );
  }

  function renderTiebreakDrawStage() {
    return (
      '<div class="stage-top"><div class="stage-timer">🎯 Dogrywka — szacowanie &nbsp;·&nbsp; ⏱ ' + WL.formatClock(state.tiebreak.timeLeft) + '</div></div>' +
      '<div class="stage-main center-stage">' +
        '<p>Pytanie do przeczytania na głos:</p>' +
        '<div class="qcard-q">' + WL.escapeHtml(tiebreakQuestion.question) + '</div>' +
        '<p class="hint">(poprawna wartość, widoczna tylko dla Ciebie: <b>' + WL.escapeHtml(String(tiebreakQuestion.answer)) + '</b>)</p>' +
        '<p>Gracze piszą swoje szacunki na tabliczkach.</p>' +
        '<button class="btn" data-act="skipToTiebreakReveal">Przejdź do odsłaniania teraz</button>' +
      '</div>'
    );
  }

  function renderTiebreakRevealStage() {
    var ids = state.finalists;
    return (
      '<div class="stage-main center-stage">' +
        '<h3>Odczytaj wartości z tabliczek</h3>' +
        '<div class="tiebreak-boards">' +
          ids.map(function (id) {
            var p = playerById(id);
            var img = boards[id];
            return '<div class="tb-board">' +
              '<div class="reveal-who">' + avatarHtml(p.avatarSeed, 32) + '<b>' + WL.escapeHtml(p.nickname) + '</b></div>' +
              (img ? '<img class="board-img" src="' + img + '"/>' : '<div class="board-img empty">Brak rysunku</div>') +
              '<label>Odczytana wartość: <input type="number" step="any" data-guess="' + id + '"/></label>' +
            '</div>';
          }).join('') +
        '</div>' +
        '<p>Poprawna wartość: <b>' + WL.escapeHtml(String(tiebreakQuestion.answer)) + '</b></p>' +
        '<button class="btn big danger" data-act="resolveTiebreak">Rozstrzygnij</button>' +
      '</div>'
    );
  }

  function renderGameOverStage() {
    var w = playerById(state.winnerId);
    return (
      '<div class="stage-main center-stage gameover">' +
        '<div class="confetti-emoji">🎉🏆🎉</div>' +
        (w ? (avatarHtml(w.avatarSeed, 120) + '<h1>' + WL.escapeHtml(w.nickname) + '</h1><p>Zwycięzca gry!</p><p class="won-money">' + WL.formatMoney(state.totalMoney) + '</p>') : '<h1>Koniec gry</h1>') +
        '<button class="btn big" data-act="newGameSameRoom">🔄 Nowa gra w tym pokoju</button>' +
      '</div>'
    );
  }

  function bindStageActions(stage) {
    $$('[data-act]', stage).forEach(function (el) {
      el.addEventListener('click', function () {
        var act = el.getAttribute('data-act');
        var val = el.getAttribute('data-val');
        switch (act) {
          case 'rerollQuestion': rerollQuestion(); break;
          case 'useManualQuestion':
            var sel = $('#manualQSelect', stage);
            if (sel && sel.value) useSpecificQuestion(sel.value);
            break;
          case 'grade': gradeAnswer(val === '1'); break;
          case 'pauseTimer': state.timerPaused = !state.timerPaused; broadcastState(); break;
          case 'forceEndRound': if (confirm('Zakończyć rundę teraz?')) forceEndRound(); break;
          case 'skipToReveal':
            state.voting.active = false; state.phase = 'reveal'; broadcastState();
            break;
          case 'revealNext': revealNextBoard(); break;
          case 'finalizeVoting': finalizeVoting(); break;
          case 'resolveTie': resolveTie(val); break;
          case 'proceedAfterAnnounce': proceedAfterAnnounce(); break;
          case 'proceedAfterTestRound': proceedAfterTestRound(); break;
          case 'beginPenaltyKicks': beginPenaltyKicks(); break;
          case 'rerollPenaltyQuestion': penaltyQuestion = null; drawPenaltyQuestion(preferredCategory); break;
          case 'gradePenalty': gradePenalty(val === '1'); break;
          case 'skipToTiebreakReveal':
            state.tiebreak.active = false; state.phase = 'tiebreakReveal'; broadcastState();
            break;
          case 'resolveTiebreak':
            var guesses = {};
            $$('[data-guess]', stage).forEach(function (inp) {
              guesses[inp.getAttribute('data-guess')] = inp.value === '' ? null : parseFloat(inp.value);
            });
            resolveTiebreak(guesses);
            break;
          case 'finishGame': finishGame(); break;
          case 'newGameSameRoom': newGameSameRoom(); break;
        }
      });
    });
    $$('[data-vote-idx]', stage).forEach(function (sel) {
      sel.addEventListener('change', function () { setBoardVote(parseInt(sel.getAttribute('data-vote-idx'), 10), sel.value); });
    });
    var catSel = $('#catFilterSelect', stage);
    if (catSel) catSel.addEventListener('change', function () { preferredCategory = catSel.value; });
  }

  // ---------------------------------------------------------------------
  // Keyboard shortcuts: A = Dobrze/Gol, S = Nowe pytanie, D = Źle/Brak
  // ---------------------------------------------------------------------
  document.addEventListener('keydown', function (e) {
    var tag = document.activeElement ? document.activeElement.tagName : '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    var key = e.key.toLowerCase();
    if (key !== 'a' && key !== 's' && key !== 'd') return;
    if (state.phase === 'question' && currentQuestion) {
      if (key === 's') { rerollQuestion(); }
      else { gradeAnswer(key === 'a'); }
      e.preventDefault();
    } else if (state.phase === 'penalty' && penaltyQuestion) {
      if (key === 's') { penaltyQuestion = null; drawPenaltyQuestion(preferredCategory); }
      else { gradePenalty(key === 'a'); }
      e.preventDefault();
    }
  });

  // ---------------------------------------------------------------------
  // Boot
  // ---------------------------------------------------------------------
  function boot() {
    WLQuestions.mountEditor($('#questionsEditorMount'), bank);

    $$('.tab-btn').forEach(function (b) { b.addEventListener('click', function () { switchTab(b.dataset.tab); }); });

    var createBtn = $('#createRoomBtn');
    if (createBtn) createBtn.addEventListener('click', function () {
      createBtn.disabled = true;
      createBtn.textContent = 'Tworzenie pokoju...';
      createRoom().catch(function (err) {
        alert('Nie udało się utworzyć pokoju: ' + (err && err.message ? err.message : err));
        createBtn.disabled = false;
        createBtn.textContent = 'Utwórz pokój';
      });
    });

    var startBtn = $('#startGameBtn');
    if (startBtn) startBtn.addEventListener('click', startGame);

    var resumeBanner = $('#resumeBanner');
    var saved = loadPersisted();
    if (saved && saved.roomCode && saved.phase && saved.phase !== 'lobby') {
      resumeBanner.style.display = '';
      $('#resumeText').textContent = 'Wykryto niedokończoną grę w pokoju ' + saved.roomCode + ' (runda ' + saved.round + '). Wznowić?';
      $('#resumeYes').addEventListener('click', function () {
        state = saved;
        currentQuestion = null; penaltyQuestion = null; tiebreakQuestion = null; boards = {};
        resumeBanner.style.display = 'none';
        createRoom(state.roomCode).then(function () { renderAll(); switchTab('game'); }).catch(function (err) {
          alert('Nie udało się wznowić pokoju o tym samym kodzie (' + (err && err.message) + '). Utwórz nowy pokój.');
        });
      });
      $('#resumeNo').addEventListener('click', function () { clearPersisted(); resumeBanner.style.display = 'none'; });
    } else if (resumeBanner) { resumeBanner.style.display = 'none'; }

    renderAll();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

}());
