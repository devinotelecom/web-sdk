export interface CustomerData {
  email: string;
  phone: string;
  pushToken: string;
  customData: object;
}

export interface CustomerSubscribeParams {
  subscriptionChannel: string;
  subscribed: boolean;
}

export interface SendEventeParams {
  eventName: string;
  eventData: object;
}

export interface InitParams {
  baseUrl?: string;
  webPush?: boolean;
  watchUrl?: boolean;
  serviceWorkerName?: string;
}

export interface LocalStorage {
  getItem?(key: string): string | null;
  setItem?(key: string, value: string): void;
}
