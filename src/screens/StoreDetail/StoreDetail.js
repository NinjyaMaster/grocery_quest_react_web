/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
// import Navbar from "../components/Navbar.js";
import Button from '../../components/Button';
import useStores from '../../hooks/useStores';
import GroceryItem from './GroceryItem';
import useDeleteStoreAPI from '../../hooks/useDeleteStore';

function StoreDetail() {
  const { storeId } = useParams();
  const { stores } = useStores();
  const [store, setStore] = useState({});
  const [groceries, setGroceries] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { errorMessage, deleteStoreAPI } = useDeleteStoreAPI(); // eslint-disable-line

  useEffect(() => {
    const currentStore = stores.find((oneStore) => Number(oneStore.id) === Number(storeId));
    setStore(currentStore);
    setGroceries(currentStore?.groceries);
    if (!currentStore) navigate('/', { state: { from: location }, replace: true });
  }, []);

  function handleDelete() {
    deleteStoreAPI(storeId);
  }

  const handleAddGroceries = () => {
    navigate(`/store/${storeId}/add_groceries/`, { state: { from: location }, replace: true });
  };

  return (
    <div className="mailDetail">
      <h1 className="subject">{store?.name}</h1>
      <div className="senderInfo">
        <p className="sender">{store?.id}</p>
      </div>
      <Link to="/">Back</Link>
      <p className="body">{store?.name}</p>
      {groceries?.length ? (
        <ul>
          {groceries?.map((grocery) => (
            <li key={grocery?.id}>
              <GroceryItem key={grocery?.id} storeId={store?.id} grocery={grocery} />
            </li>
          ))}
        </ul>
      ) : (
        <p> No Grocery. Please add groceries </p>
      )}
      <br />

      <Button className="buttonInactive" onClick={handleDelete}>
        Delete
      </Button>
      <Button onClick={handleAddGroceries} className="buttonInactive">
        Add Groceries
      </Button>
    </div>
  );
}

export default StoreDetail;
