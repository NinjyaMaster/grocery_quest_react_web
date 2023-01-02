/* eslint-disable */
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useDeleteStoreAPI from '../../hooks/useDeleteStore';

function StoreItem(props) {
  const { store } = props;
  const location = useLocation();
  const [errMsg, setErrMsg] = useState('');
  const { errorMessage, deleteStoreAPI } = useDeleteStoreAPI();

  const handleStoreDeleteClick = async (e) => {
    e.preventDefault();
    deleteStoreAPI(store.id);
    console.log('error:', errorMessage);
  };

  return (
    <>
      <Link to={`${location.pathname}store/${store.id}/`}>
        <p className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
          {errMsg}
        </p>
        <div className="store">
          <div className="name">{store.name}</div>
          <div className="id">{store.id}</div>
        </div>
      </Link>
      <button onClick={handleStoreDeleteClick}>Delete</button>
    </>
  );
}

export default StoreItem;
