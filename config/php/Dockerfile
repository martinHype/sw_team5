FROM library/php:8.3.12-fpm-alpine3.20

RUN docker-php-ext-install pdo pdo_mysql opcache

RUN apk update && \
    apk add --update linux-headers && \
    apk add --no-cache git libzip-dev zip unzip autoconf gcc g++ make openssh-client


# Install required packages for zip extension
RUN apk update && apk add --no-cache \
    libzip-dev \
    zip \
    unzip \
    gcc \
    g++ \
    make \
    autoconf

# Install PHP zip extension
RUN docker-php-ext-configure zip && docker-php-ext-install zip

RUN pecl install redis && \
    docker-php-ext-enable redis

WORKDIR /var/www/api

COPY ./config/php/php.ini /usr/local/etc/php/php.ini

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY ./backend ./
COPY ./backend/.env.example ./.env

RUN chmod 777 -R ./storage
RUN chmod 777 -R ./bootstrap/cache

RUN composer install
RUN php artisan optimize

EXPOSE 9000

CMD /bin/sh -c " \
          cp -n .env.example .env \
          && php artisan optimize \
          && php-fpm"