import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import Navbar from "../components/Navbar.js";
import Button from "../components/Button.js";
import useStores from "../hooks/useStores.js";
import GroceryItem from "../components/GroceryItem.js";

const  Store = () =>  {
  const {id} = useParams();
  const { stores} = useStores();
  const [store, setStore] = useState({});
  const [groceries, setGroceries ] = useState([]);

  useEffect(() => {
    const  currentStore = stores.find( (store) => {
      console.log("store in find $$$$$",store);
      console.log("store id in find !!!!!", store.id);
      return store.id === Number(id)
    });
    setStore(currentStore);
    setGroceries(currentStore?.groceries);
    console.log("params id %%%%%", id);
    console.log("store &&&&&&&",store);
    console.log("currentStore ******", currentStore);
  }, []);

  //   console.log(`json ${JSON.stringify(params)}`);
  //   console.log(`id ${params.id}`);
  //   console.log(`location : ${location.pathname}`);
  //   console.log(`location json : ${JSON.stringify(location)}`);


  function handleDeleteClick() {
  }

  const handleCompleteClick = () => {

  }

  return (
    <div className="mailDetail">
      <h1 className="subject">{store?.name}</h1>
      <div className="senderInfo">
        <p className="sender">{store?.id}</p>
      </div>
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
      <Button onClick={handleCompleteClick} className="buttonInactive">
        Archive
      </Button>
    </div>
  );
}

export default Store