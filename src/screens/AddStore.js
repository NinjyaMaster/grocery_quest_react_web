import { useState } from "react";
import useStores from "../hooks/useStores";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { STORES_URL } from "../constants/network";
import axios from '../api/axios';
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

const AddStore = () => {
    const { axiosPrivate } = useAxiosPrivate();
    const { addStore } = useStores();
    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [storeName, setStoreName ] = useState("");
    const [groceryName1, setGroceryName1 ] = useState(""); 
    const [ groceryQty1, setGroceryQty1 ] = useState(1);
    const [groceryName2, setGroceryName2 ] = useState("");
    const [groceryQty2, setGroceryQty2] = useState(1);
    const [errMsg, setErrMsg] = useState('');    

    const STORE_GROCERY_REGEX = /^[A-z][A-z0-9]{2,20}$/;

    const handleAddStoreSubmit = async (e) =>{
        e.preventDefault();
        console.log("&&&");
        let enternedGroceries = [];

        if(!STORE_GROCERY_REGEX.test(storeName)) {
            console.log("store name is wrong");
            return;
        }

        if( STORE_GROCERY_REGEX.test(groceryName1) ){
            enternedGroceries.push({
                "name": groceryName1,
                "qty": groceryQty1,
                "store_id": 0, // correct store_id will be set inside of backend serializer
                "is_completed": false
            });
        } 

        if (STORE_GROCERY_REGEX.test(groceryName2) ){
            enternedGroceries.push({
                "name": groceryName2,
                "qty": groceryQty2,
                "store_id": 0, // correct store_id will be set inside of backend serializer
                "is_completed": false                
            });
        }


        const bodyParameters = {
        "name": storeName,
        "is_completed": false,
        "groceries":enternedGroceries
        };

        console.log("%%%%%%%",auth.accessToken);

        try {
            const response = await axios.post(
                STORES_URL,
                bodyParameters,
                {headers: {"Authorization": `Bearer ${auth.accessToken}`}}
            );            
            // const response = await axiosPrivate.post(
            //     `${STORES_URL}`,
            //     bodyParameters
            // );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            addStore(response.data);
            navigate('/', { state: { from: location }, replace: true });

          } catch (err) {
            console.error("^^^^",err);
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
        <div>
            <div>Add Store</div>
            <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <form onSubmit={handleAddStoreSubmit}>
                <input
                id="storeName"
                type="text"
                placeholder="Store Name"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="form-textinput"
                />
                <br></br>
                <input
                id="groceryName1"
                type="text"
                placeholder="Grocery Name"
                value={groceryName1}
                onChange={(e) => setGroceryName1(e.target.value)}
                className="form-textinput"
                />
                <br/>
                <input
                id="groceryQty1"
                type="number"
                placeholder="qty"
                value={groceryQty1}
                onChange={(e) => setGroceryQty1(e.target.value)}
                className="form-textinput"
                />                
                <br></br>
                <input
                id="groceryName2"
                type="text"
                placeholder="Grocery Name"
                value={groceryName2}
                onChange={(e) => setGroceryName2(e.target.value)}
                className="form-textinput"
                />
                <br/>
                <input
                id="groceryQty2"
                type="number"
                placeholder="qty"
                value={groceryQty2}
                onChange={(e) => setGroceryQty2(e.target.value)}
                className="form-textinput"
                />                
                <br></br>
                <input type="submit" value="Submit" className="buttonInactive" />
            </form>            
        </div>
    ); 


}

export default AddStore;