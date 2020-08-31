import { urlBase64ToUint8Array, setEndpointToStore, getEndpointFromStore } from '../helpers/index';
import { getVariables } from '../common/index';

/**
 * Ask permission to show notification and get push subscription in permission granted
 */
export const askNotificationPermission = () => {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications.');
    return;
  }

  new Promise(function (resolve, reject) {
    const permissionResult = Notification.requestPermission(function (result) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
    .then(function (permissionResult) {
      if (permissionResult === 'granted') {
        getPushSubscription();
      } else {
        console.warn("We weren't granted notification permission.");
      }
    })
    .catch((err) => {
      console.warn("Can't get notification permission.", err);
    });
};

/**
 * Subscrube user to push notification
 */
export const subscribeUserToPush = () => askNotificationPermission();

/**
 * Get push subscription
 */
const getPushSubscription = () => {
  if (!('serviceWorker' in navigator)) {
    console.warn('This browser does not support service workers.');
    return;
  }

  if (!('PushManager' in window)) {
    console.warn('This browser does not support web push api.');
    return;
  }

  const { SERVICE_WORKER_NAME, APPLICATION_SERVER_KEY } = getVariables();

  navigator.serviceWorker.register(`${SERVICE_WORKER_NAME}.js`);
  navigator.serviceWorker.ready
    .then(function (registration) {
      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(APPLICATION_SERVER_KEY),
      };

      registration.pushManager
        .subscribe(subscribeOptions)
        .then(function (pushSubscription) {
          const { endpoint } = pushSubscription;

          if (getEndpointFromStore(localStorage) !== endpoint) {
            setEndpointToStore(pushSubscription.endpoint, localStorage);
            console.log('Send to server -> ', pushSubscription);
          }
        })
        .catch(function (err) {
          console.warn("Can't get PushSubscription.", err);
        });
    })
    .catch(function (err) {
      console.warn('Unable to register service worker.', err);
    });
};

/**
 * Check for new push subscription
 */
export const checkPushSubscription = () => {
  if (Notification.permission === 'granted') {
    subscribeUserToPush();
  }
};
