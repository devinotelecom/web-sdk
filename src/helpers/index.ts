import { LocalStorage } from '../types';

export const fetchFactory = (url: string, settings = {} as RequestInit) => {
  return fetch(url, {
    credentials: 'include',
    ...settings,
    headers: {
      'Content-Type': 'application/json',
      ...settings.headers,
    },
  });
};

export const handleErrors = (response: Response) => {
  if (!response.ok) {
    return response.json().then((res) => Promise.reject(res.message));
  }
  return response;
};

export const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export const onURLChange = (() => {
  let currentURL = window.location.href;
  let oldURL = currentURL;
  const callbacks: ((url: string) => void)[] = [];

  setInterval(function () {
    currentURL = window.location.href;
    if (currentURL !== oldURL) {
      callbacks.forEach((cb) => {
        cb(currentURL);
      });
      oldURL = currentURL;
    }
  }, 500);

  return (cb: (url: string) => void) => {
    callbacks.push(cb);
  };
})();

export const setEndpointToStore = (endpoint: string, storage: LocalStorage) => {
  storage.setItem('devino.webpush.endpoint', endpoint);
};

export const getEndpointFromStore = (storage: LocalStorage) => {
  return storage.getItem('devino.webpush.endpoint');
};
