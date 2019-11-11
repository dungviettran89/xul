#!/bin/bash
export WIDTH=1000
export HEIGHT=1000
export NOVNC_PORT=6080
export VNC_PORT=5900
export RESOLUTION="${WIDTH}x${HEIGHT}x24"
export DISPLAY=:99
export HOME=/home/headless
export CHROME_FLAGS="$CHROME_FLAGS --no-sandbox"
export CHROME_FLAGS="$CHROME_FLAGS --no-gpu"
export CHROME_FLAGS="$CHROME_FLAGS --window-size=${WIDTH},${HEIGHT}"
export CHROME_FLAGS="$CHROME_FLAGS --window-position=0,0"

/usr/bin/Xvfb :99 -screen 0 ${RESOLUTION} > /tmp/xvfb.log & disown
sleep 2s
/usr/bin/x11vnc -rfbport 5900 -bg -xkb -noxrecord -noxfixes -noxdamage -display :99 -wait 5 -shared -forever > /tmp/x11vnc.log & disown
/vnc/novnc/utils/launch.sh --listen 6080 --vnc localhost:5900 > /tmp/novnc_server.log & disown
cd xul-server
npm run start