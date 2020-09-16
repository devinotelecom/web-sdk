self.addEventListener('push', function (event: PushEvent) {
  try {
    const data = event.data.json();
    console.log('Push -> ', data);
    self.registration.showNotification(data.title, data.options);
  } catch (e) {
    console.warn('onpush |', e);
  }
});

self.addEventListener('pushsubscriptionchange', function (event: PushSubscriptionChangeEvent) {
  console.log('Subscription change ->', event.newSubscription);
});

self.addEventListener('notificationclose', function (event: NotificationEvent) {
  console.log('Notification close ->', event);
});

self.addEventListener('notificationclick', function (event: NotificationEvent) {
  console.log('Notification click ->', event);
});
