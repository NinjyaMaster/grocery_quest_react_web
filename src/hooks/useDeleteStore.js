// reference: https://www.youtube.com/watch?v=vR5nDFHbH_c

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosContext } from '../contexts/AxiosProvider';
import { STORES_URL } from '../constants/network';
import useStores from './useStores';

const useDeleteStoreAPI = () => {
  const { authAxios } = useContext(AxiosContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const { deleteStore } = useStores();
  const navigate = useNavigate();

  const deleteStoreAPI = async (storeId) => {
    try {
      await authAxios.delete(`${STORES_URL}${storeId}`);
      deleteStore(storeId);
      navigate('/');
    } catch (err) {
      setErrorMessage(err);
    }
  };

  return { errorMessage, deleteStoreAPI };
};

export default useDeleteStoreAPI;
