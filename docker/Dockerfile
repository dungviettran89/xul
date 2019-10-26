FROM alpine:latest
RUN echo "@edge http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories
RUN echo "@edge http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories
RUN echo "@edge http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories

# Install basic packages
RUN apk --update --no-cache add \
    bash \
    chromium \
    x11vnc \
    novnc@edge \
    xvfb \
    sudo \
    wget \
    curl \
    ca-certificates \
    dumb-init

# Fix novnc index.html
RUN ln -s /usr/share/novnc/vnc_lite.html /usr/share/novnc/index.html

# Hide status bar
RUN sed -i 's/id="noVNC_status_bar"/id="noVNC_status_bar" style="display:none;"/g' /usr/share/novnc/vnc_lite.html
# Add new user
RUN addgroup headless && adduser -G headless -s /bin/bash -D headless
USER headless
ADD docker/entrypoint.sh /entrypoint.sh
ENTRYPOINT ["dumb-init","/entrypoint.sh"]