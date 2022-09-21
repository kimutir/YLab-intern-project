# Study project Front-2022

Учебный проект на React

## Требования

- Node.js >= 12

## Установка

`npm install`

## Запуск для разработки

В режиме разработки (development)  приложение запускается командой:

`npm start`

Приложение по умолчанию доступно по адресу `http://localhost:8031`. Порт меняется в файле конфигурации `src/config.js` и может отличаться от указанного.

```javascript
let config = {
 dev: {
   port: 8031,
 },
 // ...
}
```

В режиме разработки используется локальный webpack http сервер для отслеживания изменения в коде и последующего “горячего” обновления приложения в браузера. 

## Сборка для продакшена

Для публикации проекта на сервере сначала выполняется сборка приложения командой:

`npm run build`

Собранные и минимизированные файлы приложения помещаются в папку `/dist/web`.  На http сервере директория `/dist/web` должны быть публичной. 
Основные файлы в ней - это `index.html` и `main.js` Ниже есть пример настройки сервера nginx. [README](dist/README.md)

## Сборка для SSR

SSR - это рендер приложения на стороне сервера, чтобы клиент по первому запросу получал готовый html с данными. В первую очередь для обработки поисковиками. В последнюю для сокращения времени первого отображения. 

Чтобы фронтенд приложение запускать на сервере, его нужно собрать специально для ssr командой:  

`npm run build:ssr`

Сборка для SSR не отменяет обычной сборки, так как сервер все равно должен отдавать фронтенд приложение клиенту. Поэтому можно воспользоваться командой сборки всего:

`npm run build:all`
 
В директории ./dist/node будут созданы файлы серверного приложения. Приложение на сервере можно запустить командой:

`node ./server.js`

В `server.js` подключаются собранные файлы из `./dist/node`.

Можно одной командой выполнить сборку всего и запуск приложения с ssr:

`npm run start:ssr`

Сборка и запуск SSR по умолчанию работает в режиме продакшена. Как именно устроен SSR подробно рассматривается в соответствующем разделе документации.

## Настройка

Параметры сборки определяются в файле `webpack.config.js`. По умолчанию учтены режимы разработки/продакшена, сборки для серверного рендера, импорта файлов с jsx, less, картинок, шрифтов, прокси для апи (обхода CORS).

Конфигурация самого приложения определяется в файле `src/config.js`. По умолчанию определены параметры АПИ, роутинга. Здесь же параметры сервера разработки и рендера. В config.js можно добавлять свои параметры приложения.

Кроме настройки приложения и его сборки для продакшена потребуется настроить http сервер. Рекомендуется использовать nginx.
Nginx должен отдавать статичные файлы из `./dist/web`, а если url не на существующий файл, то отдавать `./dist/web/index.html`.

Пример настройки nginx

```
server {
    listen 80;
    server_name react-skeleton.com;
    location / {
        root /home/user/react-skeleton/dist/web;
        try_files $uri /index.html;
    }
}
```

Если планируется использовать серверный рендер (SSR), то потребуется запустить приложение на node.js и вместо отдачи index.html из nginx проксировать запросы в серверное приложение.

```
server {
    listen 80;
    server_name react-skeleton.com;
    location / {
        root /home/user/react-skeleton/dist/web;
        try_files $uri @ssr;
    }

    location @ssr {
        proxy_redirect off;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Frame-Options   SAMEORIGIN;
        proxy_pass http://127.0.0.1:8133;
    }
}
```

Для постоянной работы приложения рендера воспользуетесь менеджером процессов pm2. 

`pm2 start process.json`

## Алиасы путей

Вместо указания относительных путей можно применить алиас на src директорию.

```js
import Button from "@src/components/button"
```

## Библиотека компонент

`npm run storybook`

[http://localhost:9030](http://localhost:9030/)

## Анализ размера сборки

`npm run build-analize`

## Code generator

Для автоматического создания типовых файлов можно использовать hygen.io

`npm i -g hygen`

```
hygen component help
hygen component new --name Pizza --path components/elements/pizza
hygen component store pizzas
hygen component api pizzas
```

Шаблоны и пути к файлам можно редактировать в папке `_templates`