import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import Navbar from "../components/Navbar.js";
import Button from "../components/Button.js";
import useStores from "../hooks/useStores.js";
import GroceryItem from "../components/GroceryItem.js";
import { useNavigate, useLocation, Link } from "react-router-dom";

const  StoreDetail = () =>  {
  const {storeId} = useParams();
  const { stores} = useStores();
  const [store, setStore] = useState({});
  const [groceries, setGroceries ] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const  currentStore = stores.find( (store) => {
      return Number(store.id) === Number(storeId)
    });
    setStore(currentStore);
    setGroceries(currentStore?.groceries);
  }, []);

  function handleDeleteClick() {
  }

  const handleAddGroceriesClick = () => {
    navigate(`/store/${storeId}/add_groceries/`, { state: { from: location }, replace: true });
  }

  return (
    <div className="mailDetail">
      <h1 className="subject">{store?.name}</h1>
      <div className="senderInfo">
        <p className="sender">{store?.id}</p>
      </div>
      <Link to="/">Back</Link> 
      <p className="body">{store?.name}</p>
      { groceries?.length
          ? (
              <ul>
              {groceries?.map((grocery) =>
                  <li key={grocery?.id}>
                  <GroceryItem key={grocery?.id} storeId={store?.id} grocery={grocery}/>
                  </li>
                )}
                </ul>
          ) : <p> No Grocery. Please add groceries </p>
      }
            <br />




      <Button className="buttonInactive" onClick={handleDeleteClick}>
        Delete
      </Button>
      <Button onClick={handleAddGroceriesClick} className="buttonInactive">
        Add Groceries
      </Button>
    </div>
  );
}

export default StoreDetail