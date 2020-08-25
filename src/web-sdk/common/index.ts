import { onURLChange } from '../helpers/index';
import { sendEvent } from '../triggers/index';
import { checkPushSubscription } from '../web-push/index';
import { InitParams } from '../types';

const EMAIL_URL_MARKER = 'email_marker';
const APPLICATION_SERVER_KEY =
  'BCDbS01NFg77PBFmXW7LEtik9Wcq1fRsDvHBhjQCkpUi3S17veh6MpZisJbNuoqSyEKftw0HOu4CbkyvXAQrEMY';

let BASE_URL = process.env.BASE_URL;
let IS_EMAIL_WATCHED = false;
let SERVICE_WORKER_NAME = 'sw';
let WEB_PUSH_ENABLED = false;

/**
 * Initialize basic configuration
 */
export const init = ({ baseUrl, serviceWorkerName = 'sw', webPush = false }: InitParams = {}) => {
  SERVICE_WORKER_NAME = serviceWorkerName;
  WEB_PUSH_ENABLED = webPush;
  baseUrl && (BASE_URL = baseUrl);
  if (!IS_EMAIL_WATCHED) {
    sendEventIfUrlHasMarker(window.location.href);
    IS_EMAIL_WATCHED = true;
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
    IS_EMAIL_WATCHED,
    SERVICE_WORKER_NAME,
    APPLICATION_SERVER_KEY,
    WEB_PUSH_ENABLED,
  };
};

/**
 * Url watcher, to send event if url has email marker
 */
const watchEmailMarkerInUrl = () => {
  sendEventIfUrlHasMarker(window.location.href);
  onURLChange(sendEventIfUrlHasMarker);
};

/**
 * Send event if url param has marker
 *
 * @param {string} url - url to check marker
 */
const sendEventIfUrlHasMarker = (url: string) => {
  if (new RegExp(EMAIL_URL_MARKER).test(url)) {
    sendEvent({ eventName: 'EMAIL_LINK', eventData: { url } });
  }
};
