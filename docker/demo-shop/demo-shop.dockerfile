FROM prestashop/prestashop:1.7

#prepare image
RUN mkdir -p /usr/share/man/man1/ \
 && apt-get update \
 && apt-get install -y default-jre-headless dumb-init bash axel \
 && rm -rf /var/lib/apt/lists/*
RUN mkdir -p /app/mariadb \
 && cd /app/mariadb \
 && axel -n16 https://repo1.maven.org/maven2/ch/vorburger/mariaDB4j/mariaDB4j-app/2.4.0/mariaDB4j-app-2.4.0.jar

ENV PS_INSTALL_AUTO=1 \
 PS_ERASE_DB=1 \
 PS_HANDLE_DYNAMIC_DOMAIN=1 \
# PS_DOMAIN=demo-shop.janet-and-co.ga\
 DB_SERVER=127.0.0.1 \
 DB_USER=presta_demo \
 DB_PASSWD=presta_demo \
 DB_NAME=presta_demo

WORKDIR /app/
ADD *.sh /app/
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
ENTRYPOINT ["/app/entrypoint.sh"]