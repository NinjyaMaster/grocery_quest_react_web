import React , {useState} from "react";
import { useParams, useLocation } from "react-router-dom";
import useStores from '../hooks/useStores';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { GROCERY_URL } from "../constants/network";

const GroceryItem = (props) => {
  const { grocery, storeId } = props;
  const params = useParams();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const { deleteGrocery } = useStores();
  const [errMsg, setErrMsg] = useState('');

//   console.log(`json ${JSON.stringify(params)}`);
   //console.log(`id ${params.id}`);
   console.log(`location : ${location.pathname}`);
   console.log(`location json : ${JSON.stringify(location)}`);

  //<div className="mail_id">{details.id}</div>

  const handleDeleteGroceryClick = async (e) =>{
    console.log("&&&&& delete grocery", grocery.id)
    e.preventDefault();

    try {
      const response = await axiosPrivate.delete(
          `${GROCERY_URL}${grocery.id}`
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      deleteGrocery(storeId,grocery.id);
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
      <div className="store">
        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <div className="name">{grocery.name}</div>
        <div className="id">{grocery.id}</div>
        <button onClick={handleDeleteGroceryClick}>Delete</button>
      </div>
  );
}

export default GroceryItem