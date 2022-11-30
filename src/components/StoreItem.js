import React, { useState} from "react";
import { Link } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import { STORES_URL } from "../constants/network";
import useStores from '../hooks/useStores';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const StoreItem = (props) => {
  const { store } = props;
  const params = useParams();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const { deleteStore } = useStores();
  const [errMsg, setErrMsg] = useState('');

//   console.log(`json ${JSON.stringify(params)}`);
   console.log(`id ${params.id}`);
   console.log(`location : ${location.pathname}`);
   console.log(`location json : ${JSON.stringify(location)}`);

  //<div className="mail_id">{details.id}</div>

  const handleStoreDeleteClick = async (e) =>{
    console.log("&&delete", store.id);
    e.preventDefault();

    try {
      const response = await axiosPrivate.delete(
          `${STORES_URL}${store.id}`
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      deleteStore(store.id);
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