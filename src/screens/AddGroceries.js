import { useState, useContext } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'; // eslint-disable-line
import { AxiosContext } from '../contexts/AxiosProvider';
import { STORES_URL } from '../constants/network';
import useStores from '../hooks/useStores';

function AddGroceries() {
  const { storeId } = useParams();

  const { authAxios } = useContext(AxiosContext);
  const { addGroceries } = useStores();

  const [groceryName1, setGroceryName1] = useState('');
  const [groceryQty1, setGroceryQty1] = useState(1);
  const [groceryName2, setGroceryName2] = useState('');
  const [groceryQty2, setGroceryQty2] = useState(1);
  const [errMsg, setErrMsg] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const STORE_GROCERY_REGEX = /^[A-z][ A-z0-9]{2,20}[A-z0-9]$/;

  const handleAddGroceries = async (e) => {
    e.preventDefault();
    const enternedGroceries = [];

    if (STORE_GROCERY_REGEX.test(groceryName1)) {
      enternedGroceries.push({
        name: groceryName1,
        qty: groceryQty1,
        store_id: 0, // correct store_id will be set inside of backend serializer
        is_completed: false,
      });
    }

    if (STORE_GROCERY_REGEX.test(groceryName2)) {
      enternedGroceries.push({
        name: groceryName2,
        qty: groceryQty2,
        store_id: 0, // correct store_id will be set inside of backend serializer
        is_completed: false,
      });
    }

    const bodyParameters = {
      id: storeId,
      is_completed: false,
      groceries: enternedGroceries,
    };

    try {
      const res = await authAxios.patch(`${STORES_URL}${storeId}`, bodyParameters);
      addGroceries(storeId, res.data.groceries);
      navigate(`/store/${storeId}/`, { state: { from: location }, replace: true });
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
  };

  return (
    <div>
      <div aria-label="Add Groceries">Add Groceries</div>
      <p className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
        {errMsg}
      </p>
      <form onSubmit={handleAddGroceries}>
        <input
          id="groceryName1"
          type="text"
          placeholder="Grocery Name"
          value={groceryName1}
          onChange={(e) => setGroceryName1(e.target.value)}
          className="form-textinput"
        />
        <br />
        <input
          id="groceryQty1"
          type="number"
          placeholder="qty"
          value={groceryQty1}
          onChange={(e) => setGroceryQty1(e.target.value)}
          className="form-textinput"
        />
        <br />
        <input
          id="groceryName2"
          type="text"
          placeholder="Grocery Name"
          value={groceryName2}
          onChange={(e) => setGroceryName2(e.target.value)}
          className="form-textinput"
        />
        <br />
        <input
          id="groceryQty2"
          type="number"
          placeholder="qty"
          value={groceryQty2}
          onChange={(e) => setGroceryQty2(e.target.value)}
          className="form-textinput"
        />
        <br />
        <button type="submit" className="buttonInactive">
          Submit
        </button>
      </form>
      <Link to="/">Cancel</Link>
    </div>
  );
}

export default AddGroceries;
