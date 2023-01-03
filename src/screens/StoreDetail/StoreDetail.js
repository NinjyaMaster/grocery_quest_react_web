import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'; // eslint-disable-line
// import Navbar from "../components/Navbar.js";
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

      <button type="button" className="buttonInactive" onClick={handleDelete}>
        Delete
      </button>
      <button type="button" onClick={handleAddGroceries} className="buttonInactive">
        Add Groceries
      </button>
    </div>
  );
}

export default StoreDetail;
