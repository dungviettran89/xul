FROM alpine:latest

ENV VNC_PORT=5901 \
    NO_VNC_PORT=6080
EXPOSE $VNC_PORT $NO_VNC_PORT

# Setup testing repo
RUN echo "@edge http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories
RUN echo "@edge http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories
RUN echo "@edge http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories

# Install basic packages
RUN apk --update --no-cache add bash py3-numpy chromium x11vnc novnc@edge xvfb openbox supervisor sudo xfce4-terminal wget ca-certificates && \
    update-ca-certificates
# Fix novnc index.html
RUN ln -s /usr/share/novnc/vnc_lite.html /usr/share/novnc/index.html

# Hide status bar
RUN sed -i 's/id="noVNC_status_bar"/id="noVNC_status_bar" style="display:none;"/g' /usr/share/novnc/vnc_lite.html

# Setup basic environment
ENV TERM=xterm \
    VNC_COL_DEPTH=24 \
    VNC_RESOLUTION=1280x720 \
    VNC_VIEW_ONLY=false \
    URL="https://www.google.com"

# Add new user
RUN addgroup headless && adduser -G headless -s /bin/sh -D headless

# Add supervisord
COPY supervisord.conf /etc/supervisord.conf
USER headless

# Entrypoint
CMD ["/usr/bin/supervisord","-j","/tmp/supervisord.pid","-l","/home/headless/supervisord.log","-c","/etc/supervisord.conf"]