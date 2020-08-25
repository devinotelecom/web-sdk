self.addEventListener('push', function listenPushEvent(event: PushEvent) {
  console.log('Push -> ', event.data);
});

self.addEventListener('pushsubscriptionchange', function (event: PushSubscriptionChangeEvent) {
  console.log('Subscription change ->', event);
});

self.addEventListener('notificationclose', function (event: NotificationEvent) {
  console.log('Notification close ->', event);
});

self.addEventListener('notificationclick', function (event: NotificationEvent) {
  console.log('Notification click ->', event);
});
