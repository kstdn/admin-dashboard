import { refreshAccessToken } from 'api';
import axios, { AxiosError } from 'axios';
import {
  baseUrl,
  createdStatusCode,
  unauthorizedErrorCode,
} from 'constant-values';
import { Store } from 'store';

export const configureAxios = (store: Store) => {
  axios.defaults.baseURL = baseUrl;
  axios.defaults.transformResponse = response => response.data;
  axios.defaults.withCredentials = true;
  axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded';
  axios.interceptors.response.use(
    res => res,
    error => {
      if (isAccessTokenExpiredError(error)) {
        return resetTokenAndReattemptRequest(error);
      }
      // If the error is due to other reasons, we just throw it back to axios
      return Promise.reject(error);
    },
  );
};

let isAlreadyFetchingAccessToken = false;

// This is the list of waiting requests that will retry after the access token refresh completes
let subscribers: Function[] = [];

async function resetTokenAndReattemptRequest(error: AxiosError) {
  try {
    /* We create a new Promise that will retry the request,
    clone all the request configuration from the failed
    request in the error object. */
    const retryOriginalRequest = new Promise(resolve => {
      addSubscriber(() => {
        const errorResponse = error?.response;
        if (errorResponse) {
          resolve(axios(errorResponse.config));
        }
      });
    });

    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;
      const response = await refreshAccessToken();
      if (response.status !== createdStatusCode) {
        return Promise.reject(error);
      }
      isAlreadyFetchingAccessToken = false;
      onAccessTokenFetched();
    }
    return retryOriginalRequest;
  } catch (err) {
    return Promise.reject(err);
  }
}

const onAccessTokenFetched = () => {
  subscribers.forEach(callback => callback());
  subscribers = [];
};

const addSubscriber = (callback: Function) => {
  subscribers.push(callback);
};

const isAccessTokenExpiredError = (error: AxiosError) => {
  return error?.response?.status === unauthorizedErrorCode;
};
