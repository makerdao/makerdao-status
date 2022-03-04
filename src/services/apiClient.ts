/* eslint-disable no-underscore-dangle */
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

const apiClient = axios.create({
  baseURL: 'https://data-api.makerdao.network/v1/',
});

export default apiClient;

apiClient.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (request: AxiosRequestConfig<any>) => {
    const needToBeLoggedIn = !request.url?.endsWith('access-token');

    if (needToBeLoggedIn) {
      const token = localStorage.getItem('access_token');
      if (token) {
        (
          request.headers as unknown as AxiosRequestHeaders
        ).Authorization = `Bearer ${token}`;
      }
    }
    return request;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      ((error.response && error.response.status === 403) ||
        (error.response && error.response.status === 401)) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const token = await getAccessToken();
      localStorage.setItem('access_token', token);
      (
        axios.defaults.headers as unknown as AxiosRequestHeaders
      ).Authorization = `Bearer ${token}`;
      return apiClient(originalRequest);
    }
    return Promise.reject(error);
  },
);

const getAccessToken = async () => {
  const headers = new Headers();
  headers.append('accept', 'application/json');
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append(
    'username',
    process.env.REACT_APP_USER_MAKERDAO_NETWORK_API || '',
  );
  urlencoded.append(
    'password',
    process.env.REACT_APP_PASSWORD_MAKERDAO_NETWORK_API || '',
  );

  const response = await apiClient.post('login/access-token', urlencoded, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data.access_token;
};
