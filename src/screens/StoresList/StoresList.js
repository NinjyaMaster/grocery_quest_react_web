import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import useAuth from '../../hooks/useAuth';
import useStores from '../../hooks/useStores';
import { AxiosContext } from '../../contexts/AxiosProvider';
import { STORES_URL } from '../../constants/network';

import StoreItem from './StoreItem';

function StoresList() {
  const { logout } = useAuth();
  const { stores, setStores } = useStores();
  const navigate = useNavigate();
  const location = useLocation();
  const { authAxios } = useContext(AxiosContext);

  useEffect(() => {
    let isMounted = true; // eslint-disable-line
    const controller = new AbortController();

    const getStoresData = async () => {
      try {
        const res = await authAxios.get(STORES_URL);
        const storesList = res.data;
        setStores(storesList);
        return res.data;
      } catch (error) {
        alert('Add Store Failed'); // eslint-disable-line
        isMounted = false;
        controller.abort();
        return error;
      }
    };
    getStoresData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddStore = () => {
    navigate('/add_store', { state: { from: location }, replace: true });
  };

  return (
    <section>
      <h1>Stores</h1>
      <article>
        <button type="button" onClick={handleAddStore}>
          Add Store
        </button>
        <h2>Stores List</h2>
        {stores?.length ? (
          <ul>
            {stores.map((store) => (
              <li key={store?.id}>
                {' '}
                <StoreItem key={store?.id} store={store} />
              </li>
            ))}
          </ul>
        ) : (
          <p> No Stores. Please add stores </p>
        )}
      </article>
      <div className="flexGrow">
        <button type="button" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </section>
  );
}

export default StoresList;
