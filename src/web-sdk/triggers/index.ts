import { fetchFactory, handleErrors } from '../../helpers/index';
import { getVariables } from '../common/index';
import { CustomerData, CustomerSubscribeParams, SendEventeParams } from '../../types';

/**
 * Update customer data
 *
 * @param {string} email - Customer email
 * @param {string} phone - Customer phone
 * @param {string} pushToken - PushToken
 * @param {object} customData - Custom data
 * @returns {Promise}
 */
export const updateCustomerData = ({
  email,
  phone,
  pushToken,
  customData = {},
}: CustomerData): Promise<any> => {
  const { BASE_URL } = getVariables();

  return fetchFactory(`${BASE_URL}/customers/data`, {
    method: 'PUT',
    body: JSON.stringify({
      email,
      phone,
      pushToken,
      customData,
      reportedDateTimeUtc: new Date(),
    }),
  })
    .then(handleErrors)
    .catch((err) => {
      return err;
    });
};

/**
 * Customer subscription
 *
 * @param {string} subscribtionChannel - Channel to subscribe
 * @param {boolean} subscribed - Subcribe mark (true/false)
 * @returns {Promise}
 */
export const customerSubscribe = ({
  subscriptionChannel,
  subscribed,
}: CustomerSubscribeParams): Promise<any> => {
  const { BASE_URL } = getVariables();

  return fetchFactory(`${BASE_URL}/customers/subscription`, {
    method: 'PUT',
    body: JSON.stringify({
      subscriptionChannel,
      subscribed,
      reportedDateTimeUtc: new Date(),
    }),
  })
    .then(handleErrors)
    .catch((err) => {
      return err;
    });
};

/**
 *  Send trigger event to server
 *
 * @param {string} eventName - Event name
 * @param {object} eventData - Event data
 * @returns {Promise}
 */
export const sendEvent = ({ eventName, eventData = {} }: SendEventeParams): Promise<any> => {
  const { BASE_URL } = getVariables();

  return fetchFactory(`${BASE_URL}/customers/event`, {
    method: 'POST',
    body: JSON.stringify({
      eventName,
      eventData,
      reportedDateTimeUtc: new Date(),
    }),
  })
    .then(handleErrors)
    .catch((err) => {
      return err;
    });
};
