#!/bin/bash
export WIDTH=1280
export HEIGHT=720
export NOVNC_PORT=6080
export VNC_PORT=5900
export RESOLUTION="${WIDTH}x${HEIGHT}x24"
export DISPLAY=:99
export HOME=/home/headless
export CHROME_FLAGS="$CHROME_FLAGS --no-sandbox"
export CHROME_FLAGS="$CHROME_FLAGS --no-gpu"
export CHROME_FLAGS="$CHROME_FLAGS --window-size=${WIDTH},${HEIGHT}"
export CHROME_FLAGS="$CHROME_FLAGS --window-position=0,0"

/usr/bin/Xvfb :99 -screen 0 ${RESOLUTION} > >(sed 's/^/[Xvfb] /') 2>&1  &
sleep 2s
/usr/bin/x11vnc -rfbport 5900 -xkb -noxrecord -noxfixes -noxdamage -display :99 -wait 5 -shared -forever > >(sed 's/^/[x11vnc] /') 2>&1  &
/usr/bin/novnc_server --listen 6080 --vnc localhost:5900 > >(sed 's/^/[novnc_server] /') 2>&1  &
while true; do /usr/bin/chromium-browser ${CHROME_FLAGS}; sleep 10s; done > >(sed 's/^/[chromium] /') 2>&1 &
wait
