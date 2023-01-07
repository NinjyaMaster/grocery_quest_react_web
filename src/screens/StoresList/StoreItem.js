import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useDeleteStoreAPI from '../../hooks/useDeleteStore';

function StoreItem(props) {
  const { store } = props;
  const location = useLocation();
  const [errMsg, setErrMsg] = useState(''); // eslint-disable-line
  const { errorMessage, deleteStoreAPI } = useDeleteStoreAPI();

  const handleStoreDeleteClick = async (e) => {
    e.preventDefault();
    deleteStoreAPI(store.id);
    console.log('error:', errorMessage); // eslint-disable-line
  };

  return (
    <div data-testid={`${store.id}`}>
      <Link to={`${location.pathname}store/${store.id}/`}>
        <p className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
          {errMsg}
        </p>
        <div className="store">
          <div className="name">{store.name}</div>
          <div className="id">{store.id}</div>
        </div>
      </Link>
      <button type="button" onClick={handleStoreDeleteClick}>
        Delete
      </button>
    </div>
  );
}

export default StoreItem;
