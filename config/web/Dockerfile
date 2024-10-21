FROM library/php:8.3.12-fpm-alpine3.20 AS builder-stage

RUN docker-php-ext-install pdo pdo_mysql opcache

RUN apk update && \
    apk add --update linux-headers && \
    apk add --no-cache git libzip-dev zip unzip autoconf gcc g++ make openssh-client

RUN pecl install redis && \
    docker-php-ext-enable redis

WORKDIR /var/www/api

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer


COPY ./backend ./
COPY ./backend/.env.example ./.env


RUN chmod 777 -R ./storage
RUN chmod 777 -R ./bootstrap/cache

RUN composer install
RUN php artisan optimize

FROM nginx:1.20.1 AS production-stage

WORKDIR /var/www/api

COPY --from=builder-stage /var/www/api ./

COPY ./config/web/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["sh", "-c", "/entrypoint.sh"]