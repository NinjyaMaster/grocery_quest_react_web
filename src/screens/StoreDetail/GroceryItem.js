/* eslint-disable */
import { useState, useContext } from 'react';
import useStores from '../../hooks/useStores';
import { GROCERY_URL } from '../../constants/network';
import { AxiosContext } from '../../contexts/AxiosProvider';

function GroceryItem(props) {
  const { grocery, storeId } = props;
  const { deleteGrocery } = useStores();
  const [errMsg, setErrMsg] = useState('');
  const { authAxios } = useContext(AxiosContext);

  const handleDeleteGrocery = async (e) => {
    e.preventDefault();

    try {
      await authAxios.delete(`${GROCERY_URL}${grocery.id}`);
      deleteGrocery(storeId, grocery.id);
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
    <div className="store">
      <p className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
        {errMsg}
      </p>
      <div className="name">{grocery.name}</div>
      <div className="id">{grocery.id}</div>
      <button onClick={handleDeleteGrocery}>Delete</button>
    </div>
  );
}

export default GroceryItem;
