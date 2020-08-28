import { onURLChange } from '../helpers/index';
import { sendEvent } from '../triggers/index';
import { checkPushSubscription } from '../web-push/index';
import { InitParams } from '../types';

const APPLICATION_SERVER_KEY =
  'BCDbS01NFg77PBFmXW7LEtik9Wcq1fRsDvHBhjQCkpUi3S17veh6MpZisJbNuoqSyEKftw0HOu4CbkyvXAQrEMY';

let BASE_URL = process.env.BASE_URL;
let URL_WATCHER_ENABLED = false;
let SERVICE_WORKER_NAME = 'sw';
let WEB_PUSH_ENABLED = false;
let WATCH_URL = false;

/**
 * Initialize basic configuration
 */
export const init = ({
  baseUrl,
  serviceWorkerName = 'sw',
  webPush = false,
  watchUrl = true,
}: InitParams = {}) => {
  SERVICE_WORKER_NAME = serviceWorkerName;
  WEB_PUSH_ENABLED = webPush;
  WATCH_URL = watchUrl;
  baseUrl && (BASE_URL = baseUrl);

  if (WATCH_URL && !URL_WATCHER_ENABLED) {
    startWatchUrl();
    URL_WATCHER_ENABLED = true;
  }

  if (WEB_PUSH_ENABLED) {
    checkPushSubscription();
  }
};

/**
 * Get app variables
 *
 * @returns {object} - Object with app variables
 */
export const getVariables = () => {
  return {
    BASE_URL,
    URL_WATCHER_ENABLED,
    SERVICE_WORKER_NAME,
    APPLICATION_SERVER_KEY,
    WEB_PUSH_ENABLED,
  };
};

/**
 * Url watcher
 */
const startWatchUrl = () => {
  sendPageViewEvent(window.location.href);
  onURLChange(sendPageViewEvent);
};

/**
 * Send page view event
 *
 * @param {string} url - url
 */
const sendPageViewEvent = (url: string) => {
  sendEvent({ eventName: 'DevinoPageView', eventData: { url } });
};
