FROM alpine:latest
RUN echo "@edge http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories
RUN echo "@edge http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories
RUN apk --update --no-cache add \
    python \
    py-numpy@edge \
    git \
    bash \
    chromium \
    x11vnc \
    xvfb \
    sudo \
    wget \
    curl \
    ca-certificates \
    npm \
    nodejs \
    dumb-init \
    xrandr
WORKDIR /vnc/
RUN git clone --depth 1 https://github.com/novnc/noVNC.git novnc && \
    git clone --depth 1 https://github.com/novnc/websockify novnc/utils/websockify && \
    rm -rf novnc/.git && \
    rm -rf novnc/utils/websockify/.git &&\
    cd novnc &&\
    cp vnc_lite.html index.html &&\
    sed -e 's/id="top_bar"/id="top_bar" style="display:none;"/g' -i index.html
WORKDIR /app/
ADD docker/xul-server/entrypoint.sh /app/entrypoint.sh
ADD packages/xul-server /app/xul-server
RUN cd xul-server && npm install
ENTRYPOINT ["dumb-init","--"]
CMD ["./entrypoint.sh"]