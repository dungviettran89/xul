#!/bin/bash
export WIDTH=${WIDTH:-1280}
export HEIGHT=${HEIGHT:-720}
export NOVNC_PORT=${NOVNC_PORT:-6080}
export VNC_PORT=${VNC_PORT:-5900}
export VNC_PASSWORD=${VNC_PASSWORD:-demo}
export LANG=${LANG:-en_GB.UTF-8}
export DISPLAY=:99
echo "WIDTH=${WIDTH}"
echo "HEIGHT=${HEIGHT}"
echo "NOVNC_PORT=${NOVNC_PORT}"
echo "VNC_PORT=${VNC_PORT}"
echo "VNC_PASSWORD=${VNC_PASSWORD}"
echo "LANG=${LANG}"

keepAlive() {
    while true; do
        $@;
        sleep 10s;
    done
}

/usr/bin/Xvfb :99 -screen 0 "${WIDTH}x${HEIGHT}x24" &
sleep 3s; keepAlive /usr/bin/x11vnc -rfbport "${VNC_PORT}" -passwd "${VNC_PASSWORD}" -display :99 -shared -forever &
sleep 3s; keepAlive /app/novnc/utils/launch.sh --listen ${NOVNC_PORT} --vnc localhost:${VNC_PORT} &
sleep 3s; cd xul-server; npm run start