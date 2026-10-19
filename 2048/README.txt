# 2048 Simple Offline Edition

## Running the Game (Linux Desktop)

1. Extract the entire folder.
2. Double-click `index.html` to open it in Firefox, Chrome, or another browser. If it opens in a text editor by default, right-click and choose “Open With” to select a browser.
3. Alternatively, open a terminal in the folder and run:
   ```bash
   bash start.sh
   ```

No Python, Node.js, internet connection, or additional software installation is required. All you need is a modern browser.

## Controls

- **Arrow keys / WASD:** Move all tiles.
- Matching tiles merge when they collide. Each tile can merge only once per move.
- A successful move randomly adds a new 2 or 4 tile. Moves that leave the board unchanged do not add tiles.
- You can continue playing after reaching 2048. The game ends when no legal moves remain.
- Click **Restart** to start a new game. Your current game progress is not saved.
- The game attempts to save your best score in the current browser. Clearing browser data or moving the game files may reset it.
- On-screen direction buttons and swipe controls are also supported.

## Files

| File | Description |
|---|---|
| `index.html` | Interface and styles |
| `game.js` | Game logic |
| `start.sh` | Linux launch script |
| `README.txt` | These instructions |
| `test.cjs` | Game rule tests |

## Rule Tests (Optional, Requires Node.js)

```bash
node test.cjs
```
