
/*========================================================
    * function Name: createApiMiddleware
    * function Purpose: check api calling using apiMidddleWare
    * function Parameters: url, method, body, onLoadStart, onLoadEnd, onSuccess, onError
    * function ReturnType: data and error
    * function Description: createApiMiddleware method api calling using apiMidddleWare
    *=====================================================*/

/**
 * @param {import('./ApiClient').default} apiClient
 * @returns {import('redux').Middleware}
 */
import { Alert } from 'react-native';
export default function createApiMiddleware(apiClient) {
  return function apiMiddleware(middlewareAPI) {
    const { dispatch, getState } = middlewareAPI;

    return next => async action => {
      next(action);
      if (action.type === API_REQUEST) {
        const {
          url,
          method,
          body,
          onLoadStart,
          onLoadEnd,
          onSuccess,
          onError,
          header
        } = action.payload;

        let headers;
        if (global.token) {
          headers = {
            'Authorization': `Bearer ${global.token}`,
            'Content-Type':
              body && body.constructor === FormData
                ? 'multipart/form-data'
                : 'application/json',
          }
        } else {
          headers = {
            'Content-Type':
              body && body.constructor === FormData
                ? 'multipart/form-data'
                : 'application/json',
          }
        }

        const request = {
          method: method,
          url: url,
          data: body,
          headers: headers
        }

        try {

          if (typeof onLoadStart === 'function') {
            dispatch(onLoadStart());
          }
          const response = await apiClient.requestApiClient(request);
          if (typeof onLoadEnd === 'function') {
            dispatch(onLoadEnd());
          }
          if (response.status === 200 || response.status === 201) {
            if (typeof onSuccess === 'function') {
              dispatch(onSuccess(response.data));
            }
          }
          else {
            if (typeof onError === 'function') {
              dispatch(onError(response.data));
            }
          }
        }
        catch (error) {
          Alert.alert("Exhibitor", "Server did not responding.\nPlease Try Again", [{ text: 'Ok' }])
          if (typeof onLoadEnd === 'function') {
            dispatch(onLoadEnd(error));
          }
          // dispatch(onError(error));
        }
      }
    };
  };
}

export const API_REQUEST = 'api/request';

/**
 * @typedef {Object} ApiPayload
 * @property {string} [method]
 * @property {string} url
 * @property {*} [body]
 * @property {Function} [onLoadStart]
 * @property {Function} [onLoadEnd]
 * @property {Function} [onSuccess]
 * @property {Function} [onError]
 *
 * @param {ApiPayload} payload
 * @returns {{ type: 'api/request', payload: ApiPayload }}
 **/
export function apiRequest(payload) {
  return { type: API_REQUEST, payload };
}