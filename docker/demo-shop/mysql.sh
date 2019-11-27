useradd mariadb
su mariadb -c "java -DmariaDB4j.port=3306 -jar mariadb/*.jar"