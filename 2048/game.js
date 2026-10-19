'use strict';
// Pure game rules are also exported for the included Node.js tests.
function mergeLine(line) {
  const values = line.filter(v => v !== 0);
  const out = [];
  let gained = 0;
  for (let i = 0; i < values.length; i++) {
    if (values[i] === values[i + 1]) {
      const value = values[i] * 2;
      out.push(value); gained += value; i++;
    } else out.push(values[i]);
  }
  while (out.length < 4) out.push(0);
  return {line: out, gained};
}
function slide(board, direction) {
  const next = board.map(row => row.slice());
  let gained = 0;
  for (let i = 0; i < 4; i++) {
    const cells = [];
    for (let j = 0; j < 4; j++) {
      cells.push(direction === 'left' ? [i,j] : direction === 'right' ? [i,3-j] : direction === 'up' ? [j,i] : [3-j,i]);
    }
    const result = mergeLine(cells.map(([r,c]) => board[r][c]));
    gained += result.gained;
    cells.forEach(([r,c],j) => { next[r][c] = result.line[j]; });
  }
  return {board: next, gained, changed: next.some((row,r) => row.some((v,c) => v !== board[r][c]))};
}
function canMove(board) {
  return board.some((row,r) => row.some((v,c) => v === 0 || (r < 3 && v === board[r+1][c]) || (c < 3 && v === row[c+1])));
}
if (typeof module !== 'undefined') module.exports = {mergeLine, slide, canMove};
if (typeof document !== 'undefined') {
  let board, score, acknowledgedWin;
  let best = 0;
  try { best = Number(localStorage.getItem('simple2048.best')) || 0; } catch (_) {}
  const $ = id => document.getElementById(id);
  function spawn() {
    const empty = [];
    board.forEach((row,r) => row.forEach((v,c) => {if (!v) empty.push([r,c]);}));
    if (!empty.length) return;
    const [r,c] = empty[Math.floor(Math.random()*empty.length)];
    board[r][c] = Math.random() < 0.9 ? 2 : 4;
  }
  function render() {
    $('board').replaceChildren();
    board.flat().forEach(value => {
      const tile = document.createElement('div');
      tile.className = 'tile' + (value >= 4096 ? ' huge' : value >= 128 ? ' large' : '');
      tile.dataset.v = value;
      tile.textContent = value || '';
      tile.setAttribute('aria-label', value ? String(value) : '空');
      $('board').append(tile);
    });
    $('score').textContent = score;
    $('best').textContent = best;
    const won = !acknowledgedWin && board.flat().some(v => v >= 2048);
    const over = !canMove(board);
    $('overlay').hidden = !(won || over);
    $('continue').hidden = !won || over;
    $('message').textContent = won ? '你达到了 2048！' : '游戏结束';
    $('detail').textContent = won ? '挑战成功！你可以继续合并更大的数字。' : `本次得分：${score}，再挑战一次吧。`;
    $('status').textContent = won || over ? $('message').textContent : `当前分数 ${score}`;
  }
  function restart() {
    board = Array.from({length:4}, () => Array(4).fill(0));
    score = 0; acknowledgedWin = false; spawn(); spawn(); render();
  }
  function move(direction) {
    if (!$('overlay').hidden) return;
    const result = slide(board, direction);
    if (!result.changed) return;
    board = result.board; score += result.gained;
    if (score > best) {
      best = score;
      try { localStorage.setItem('simple2048.best', String(best)); } catch (_) {}
    }
    spawn(); render();
  }
  document.addEventListener('keydown', event => {
    if (event.ctrlKey || event.altKey || event.metaKey) return;
    const direction = {ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',s:'down',a:'left',d:'right'}[event.key.length === 1 ? event.key.toLowerCase() : event.key];
    if (direction) {event.preventDefault(); move(direction);}
  });
  document.querySelectorAll('[data-dir]').forEach(button => button.addEventListener('click', () => move(button.dataset.dir)));
  $('restart').onclick = restart; $('again').onclick = restart;
  $('continue').onclick = () => {acknowledgedWin = true; render();};
  let start = null;
  $('board').addEventListener('pointerdown', event => {
    if (!event.isPrimary) return;
    start = [event.clientX,event.clientY]; $('board').setPointerCapture(event.pointerId);
  });
  $('board').addEventListener('pointerup', event => {
    if (!start) return;
    const dx = event.clientX-start[0], dy = event.clientY-start[1]; start = null;
    if (Math.max(Math.abs(dx),Math.abs(dy)) < 24) return;
    move(Math.abs(dx) > Math.abs(dy) ? (dx>0?'right':'left') : (dy>0?'down':'up'));
  });
  $('board').addEventListener('pointercancel', () => {start = null;});
  restart();
}
