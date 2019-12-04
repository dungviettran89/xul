useradd mariadb
mkdir -p /data/mariadb
chown mariadb /data/mariadb
su mariadb -c "java -DmariaDB4j.port=3306 -DmariaDB4j.dataDir=/data/mariadb -jar mariadb/*.jar"