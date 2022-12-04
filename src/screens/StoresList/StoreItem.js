import React, { useState} from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const StoreItem = (props) => {
  const { store, handleDeleteStore } = props;
  const location = useLocation();
  const [errMsg, setErrMsg] = useState('');

  const handleStoreDeleteClick = async (e) =>{
    e.preventDefault();
    handleDeleteStore(store.id);
  }


  return (
    <>
      <Link to={`${location.pathname}store/${store.id}/`}>
      <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <div className="store">
          <div className="name">{store.name}</div>
          <div className="id">{store.id}</div>
        </div>
      </Link>
      <button onClick={handleStoreDeleteClick}>Delete</button>
    </>
  );
}

export default StoreItem