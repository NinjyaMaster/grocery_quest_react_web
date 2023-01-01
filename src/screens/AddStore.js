/* eslint-disable */
import { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

function AddStore() {
  const [storeName, setStoreName] = useState('');
  const [groceryName1, setGroceryName1] = useState('');
  const [groceryQty1, setGroceryQty1] = useState(1);
  const [groceryName2, setGroceryName2] = useState('');
  const [groceryQty2, setGroceryQty2] = useState(1);
  const [errMsg, setErrMsg] = useState('');

  const STORE_GROCERY_REGEX = /^[A-z][ A-z0-9]{2,20}[A-z0-9]$/;

  const [handlePostStore] = useOutletContext();

  const handleAddStoreSubmit = async (e) => {
    e.preventDefault();
    const enternedGroceries = [];

    if (!STORE_GROCERY_REGEX.test(storeName)) {
      console.log('store name is wrong');
      return;
    }

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
      name: storeName,
      is_completed: false,
      groceries: enternedGroceries,
    };
    handlePostStore(bodyParameters);
  };

  return (
    <div>
      <div>Add Store</div>
      <p className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
        {errMsg}
      </p>
      <form onSubmit={handleAddStoreSubmit}>
        <input
          id="storeName"
          type="text"
          placeholder="Store Name"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          className="form-textinput"
        />
        <br />
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
        <input type="submit" value="Submit" className="buttonInactive" />
      </form>
      <Link to="/">Cancel</Link>
    </div>
  );
}

export default AddStore;
