FROM mariadb:11.3

RUN { \
        echo '[mysqld]'; \
        echo 'character-set-server=utf8mb4'; \
        echo 'collation-server=utf8mb4_general_ci'; \
        echo '[client]'; \
        echo 'default-character-set=utf8mb4'; \
    } > /etc/mysql/conf.d/charset.cnf

RUN { \
        echo '[client]'; \
        echo 'user = docker'; \
        echo 'password = docker'; \
        echo 'host = localhost'; \
    } > /root/.mylogin.cnf && \
    chmod 600 /root/.mylogin.cnf