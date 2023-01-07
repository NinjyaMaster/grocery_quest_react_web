// Install axios@0.27.2 because axios@^1.1.3 give Network Error
// when access token need to be used and POST method is used
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import React, { createContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import { BASE_URL, REFRESH_URL } from '../constants/network';

const AxiosContext = createContext();
const { Provider } = AxiosContext;

function AxiosProvider({ children }) {
  // const navigate = useNavigate();

  const authAxios = axios.create({
    baseURL: BASE_URL,
  });

  const publicAxios = axios.create({
    baseURL: BASE_URL,
  });

  authAxios.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        // const accessToken = await secureLocalStorage.getItem('accessToken');
        // secureLocalStorage is not async function

        // secureLocalStorage fails in test. I use local storage only for test
        const accessToken = secureLocalStorage.getItem('accessToken');
        // const accessToken = localStorage.getItem('accessToken');

        config.headers.Authorization = `Bearer ${accessToken}`; // eslint-disable-line
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  authAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && originalRequest.url === `${BASE_URL}${REFRESH_URL}`) {
        return Promise.reject(error);
      }

      if (error.response.status === 401 && !originalRequest.retry) {
        originalRequest.retry = true;
        // secureLocalStorage fails in test. I use local storage only for test
        const refreshToken = secureLocalStorage.getItem('refreshToken');
        // const refreshToken = localStorage.getItem('refreshToken');
        return axios
          .post(`${BASE_URL}${REFRESH_URL}`, {
            refresh: refreshToken,
          })
          .then((res) => {
            if (res.status === 200) {
              originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
              // secureLocalStorage fails in test. I use local storage only for test
              secureLocalStorage.setItem('accessToken', res.data.access);
              // localStorage.setItem('accessToken', res.data.access);
              return authAxios(originalRequest);
            }
            return Promise.reject(error);
          })
          .catch((err) => {
            console.error(err); // eslint-disable-line
            // I should use modal
            alert('Session expired. Please login again 1'); // eslint-disable-line
            // navigate('/login');
          });
      }
      return Promise.reject(error);
    }
  );

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}
    >
      {children}
    </Provider>
  );
}

export { AxiosContext, AxiosProvider };
