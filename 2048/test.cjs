const assert = require('node:assert/strict');
const {mergeLine, slide, canMove} = require('./game.js');
assert.deepEqual(mergeLine([2,2,2,2]), {line:[4,4,0,0],gained:8});
assert.deepEqual(mergeLine([2,2,4,0]), {line:[4,4,0,0],gained:4});
assert.deepEqual(mergeLine([0,2,0,2]), {line:[4,0,0,0],gained:4});
const board = [[2,0,2,0],[0,0,0,0],[0,0,0,0],[2,0,0,0]];
assert.deepEqual(slide(board,'left').board[0],[4,0,0,0]);
assert.deepEqual(slide(board,'right').board[0],[0,0,0,4]);
assert.deepEqual(slide(board,'up').board.map(r=>r[0]),[4,0,0,0]);
assert.deepEqual(slide(board,'down').board.map(r=>r[0]),[0,0,0,4]);
assert.equal(board[0][0],2); // input is not mutated
assert.equal(slide([[2,4,8,16],[0,0,0,0],[0,0,0,0],[0,0,0,0]],'left').changed,false);
const full = [[2,4,2,4],[4,2,4,2],[2,4,2,4],[4,2,4,2]];
assert.equal(canMove(full),false);
full[3][3]=4; assert.equal(canMove(full),true);
full[3][3]=0; assert.equal(canMove(full),true);
assert.deepEqual(mergeLine([1024,1024,0,0]),{line:[2048,0,0,0],gained:2048});
console.log('All 2048 rule checks passed.');
