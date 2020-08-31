# Devino Web SDK

Web SDK для подключения к триггерным рассылкам Devino

## Сборка

Для того чтобы собрать последнюю версию библиотеки на компьютере должен быть установлен node.js.
Необходимо скопировать все файлы из репозитория, либо склонировать репозиторий на компьютер следующей командой:

```
git clone https://github.com/devinotelecom/web-sdk.git
```

Перейти в папку с файлами, скачать все зависимости и запустить процесс сборки, выполнив команды:
```
npm install
npm run build
```
В результате сборки создастся папка dist,  в котором будет находится необходимый файл devino-web-sdk.js

## Подключение
Для подключения и инициализации библиотеки, необходимо файл devino-web-sdk.js скопировать в корневую директорию вашего сайта и затем, в теге head сайта добавить следующие строки:
```
<script src="devino-web-sdk.js"></script>
<script>
  Devino.init();
</script>
```
Подключение библиотеки через CDN:
```
<script src="https://integrationapi.net/web-sdk/devino-web-sdk.js"></script>
<script>
  Devino.init();
</script>
```

Для того чтобы отключить прослушивание изменений URL'а, необходимо инициализировать библиотеку с параметром watchUrl: false .
```
<script>
  Devino.init({ watchUrl: false });
</script>
```
## Доступные методы

`Devino.updateCustomerData()` - Обновляет данные о пользователе. На вход принимает объект со следующими свойствами:
- `email` - Email пользователя
- `phone` - Телефон пользователя
- `pushToken` - Токен пользователя
- `customData` - Произвольня информация о пользователе
```
Devino.updateCustomerData({
  email: 'test@test.ru',
  phone: '88001234567',
  pushToken: 'sometoken',
  customData: { additionalProp1: 'string', additionalProp2: 'string' },
});
```
\
`Devino.customerSubscribe()` - Обновляет сведения о подписки пользователе. На вход принимает объект со следующими свойствами:
- `subscriptionChannel` - Канал подписки
- `subscribed` - Маркер статуса подписки
```
Devino.customerSubscribe({ subscriptionChannel: 'PUSH', subscribed: true });
```
\
`Devino.sendEvent()` - Отправляет событие триггера. На вход принимает объект со следующими свойствами:
- `eventName` - Название события
- `eventData` - Дополнительная информация для события
```
Devino.sendEvent({
  eventName: 'eventName',
  eventData: { additionalProp1: 'string1', additionalProp2: 'string2' },
});
```