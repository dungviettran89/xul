FROM alpine:latest
RUN apk --update --no-cache add \
#noVNC packages
 python3 py3-numpy x11vnc xvfb xrandr sudo wget curl ca-certificates npm nodejs dumb-init procps bash nano openssh \
#desktop packages
 ttf-dejavu ttf-droid ttf-freefont ttf-liberation ttf-ubuntu-font-family chromium firefox-esr git
WORKDIR /vnc/
RUN git clone --depth 1 https://github.com/novnc/noVNC.git novnc && \
    git clone --depth 1 https://github.com/novnc/websockify novnc/utils/websockify && \
    rm -rf novnc/.git && \
    rm -rf novnc/utils/websockify/.git &&\
    cd novnc &&\
    cp vnc_lite.html index.html &&\
    sed -e 's/id="top_bar"/id="top_bar" style="display:none;"/g' -i index.html
WORKDIR /app/
ADD docker/xul-server/*.sh /app/
RUN chmod +x *.sh
ADD packages/xul-server /app/xul-server
RUN cd xul-server && npm install
ADD packages/xul-ui /app/xul-ui
RUN cd xul-ui && npm install && npm run build
ENTRYPOINT ["dumb-init","--"]
CMD ["./entrypoint.sh"]

EXPOSE 8080