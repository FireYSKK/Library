# Настройка проекта с полного нуля
Для работы с проектом понадобиться

1. docker - 24+
2. docker compose - произвольной версии
3. git - произвольной версии

## Разворачивание проекта

1. Клонирование репозитория

```sh
$ git clone https://github.com/AlexsRyzhkov/Cloud.dev.git
```

2. Переход на ветку develop
```sh
$ git checkout develop
```
3. Сборка изображений и контейнеров приложения
```sh
$ docker compose up -d --build
```

## Настройка контейнера node

1. Установка всех зависимостей

```sh
$ docker compose exec node npm init
```
**Note:** Web доступен по url [localhost:3030](http://localhost:3030/):

2. Запуск среды разработки

```sh
$ docker compose exec node npm run dev
```
## Настройка контейнера python

1. Сборка контейнера

```sh
$ docker compose build python-cloud
```
**Note:** Django доступен по url [localhost:3020](http://localhost:3020/):

2. Генерация документации

```sh
$ cd cloud_dev/docs
$ make html
```

**Note:** Файлы документации располагаются в Cloud.dev/backend/cloud_dev/docs/_build/html 

## License

This repo available under the [MIT license](https://github.com/skarif2/gmail-signature/blob/master/LICENSE).

---
<h4 align="center">Made with&nbsp; 💖 &nbsp;by Alexs.</h4>