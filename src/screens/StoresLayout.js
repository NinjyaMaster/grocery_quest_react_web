/* eslint-disable */
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import { BASE_URL, STORES_URL, GROCERY_URL } from '../constants/network';
import useStores from '../hooks/useStores';

function StoresLayout() {
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const { addStore, addGroceries, setStores, deleteStore, deleteGrocery } = useStores();
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${auth.accessToken}` },
  });

  axiosPrivate.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${auth?.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      // Django backend return 401 I changed 403 error code to 401.
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const newAccessToken = await refresh();
        prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosPrivate(prevRequest);
      }
      return Promise.reject(error);
    }
  );

  const handlePostStore = async (store) => {
    try {
      const res = await axiosPrivate.post(STORES_URL, store);
      addStore(res.data);
      navigate('/', { state: { from: location }, replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('need another message');
      } else if (err.response?.status === 400) {
        setErrMsg('need another message');
      } else if (err.response?.status === 401) {
        setErrMsg('need another message');
      } else {
        setErrMsg('need another message');
      }
    }
  };

  const handlePatchGroceries = async (storeId, bodyParameters) => {
    try {
      const res = await axiosPrivate.patch(`${STORES_URL}${storeId}`, bodyParameters);
      addGroceries(storeId, res.data.groceries);
      navigate(`/store/${storeId}/`, { state: { from: location }, replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('need another message');
      } else if (err.response?.status === 400) {
        setErrMsg('need another message');
      } else if (err.response?.status === 401) {
        setErrMsg('need another message');
      } else {
        setErrMsg('need another message');
      }
    }
  };

  const handleGetStores = async (isMounted) => {
    try {
      // I don't know why django backend doesn't like signal: controller.signal
      // I leave it here until I figure out.
      // const response = await axiosPrivate.get(STORES_URL, {
      //    signal: controller.signal
      // });
      const response = await axiosPrivate.get(STORES_URL);
      console.log(response.data);
      isMounted && setStores(response.data);
    } catch (err) {
      console.error(err);
      navigate('/login', { state: { from: location }, replace: true });
    }
  };

  const handleDeleteStore = async (storeId) => {
    try {
      const response = await axiosPrivate.delete(`${STORES_URL}${storeId}`);
      // console.log(JSON.stringify(response?.data));
      console.log('$$$$$$ delete');
      deleteStore(storeId);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('need another message');
      } else if (err.response?.status === 400) {
        setErrMsg('need another message');
      } else if (err.response?.status === 401) {
        setErrMsg('need another message');
      } else {
        setErrMsg('need another message');
      }
    }
    navigate(`/`);
  };

  const handleDeleteGrocery = async (storeId, groceryId) => {
    try {
      const response = await axiosPrivate.delete(`${GROCERY_URL}${groceryId}`);
      console.log(JSON.stringify(response?.data));
      // console.log(JSON.stringify(response));
      deleteGrocery(storeId, groceryId);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('need another message');
      } else if (err.response?.status === 400) {
        setErrMsg('need another message');
      } else if (err.response?.status === 401) {
        setErrMsg('need another message');
      } else {
        setErrMsg('need another message');
      }
    }
  };

  return (
    <Outlet
      context={[
        handlePostStore,
        handlePatchGroceries,
        handleGetStores,
        handleDeleteStore,
        handleDeleteGrocery,
      ]}
    />
  );
}

export default StoresLayout;
