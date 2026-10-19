#!/usr/bin/env bash
# Launch the offline game in the default browser.
set -euo pipefail
GAME_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
if command -v xdg-open >/dev/null 2>&1; then
  xdg-open "$GAME_DIR/index.html"
elif command -v firefox >/dev/null 2>&1; then
  firefox "$GAME_DIR/index.html"
else
  echo "请用浏览器打开此文件：$GAME_DIR/index.html"
fi
