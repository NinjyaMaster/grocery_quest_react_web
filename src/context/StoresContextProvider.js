import { createContext, useReducer, useMemo } from 'react';

export const StoresContext = createContext({
  stores: [],
  addStore: ({ description, amount, date }) => {}, // eslint-disable-line
  addGroceries: ({ storeId, groceriesList }) => {}, // eslint-disable-line
  deleteGrocery: ({ storeId, groceryId }) => {}, // eslint-disable-line
  setStores: (store) => {}, // eslint-disable-line
  deleteStore: (id) => {}, // eslint-disable-line
  updateStore: (id, { description, amount, date }) => {}, // eslint-disable-line
});

const storesReducer = (state, action) => {
  let updatableStoreIndex;
  let deleteGroceryIndex;
  let updatableStore;
  let updatedStore;
  let updatedStores;
  let inverted;

  switch (action.type) {
    case 'ADD_STORE':
      return [action.payload, ...state];
    case 'ADD_GROCERIES':
      updatableStoreIndex = state.findIndex(
        (store) => Number(store.id) === Number(action.payload.storeId)
      );
      updatableStore = state[updatableStoreIndex];
      updatedStore = { ...updatableStore };
      updatedStore.groceries.splice(0, updatedStore.groceries.length);
      action.payload.groceriesList.forEach((grocery) => {
        updatedStore.groceries.push(grocery);
      });
      updatedStores = [...state];
      updatedStores[updatableStoreIndex] = updatedStore;
      return updatedStores;
    case 'SET':
      inverted = action.payload.reverse();
      return inverted;
    case 'UPDATE':
      updatableStoreIndex = state.findIndex((store) => store.id === action.payload.id);
      updatableStore = state[updatableStoreIndex];
      // updatedItem = {...updatableStore, ...action.payload.data};
      updatedStores = [...state];
      updatedStores[updatableStoreIndex] = action.payload.data;
      return updatedStores;
    case 'DELETE_STORE':
      return state.filter((store) => store.id !== action.payload);
    case 'DELETE_GROCERY':
      updatableStoreIndex = state.findIndex((store) => store.id === action.payload.storeId);
      updatableStore = state[updatableStoreIndex];
      updatedStore = { ...updatableStore };
      deleteGroceryIndex = updatedStore.groceries.findIndex(
        (grocery) => grocery.id === action.payload.groceryId
      );
      if (deleteGroceryIndex > -1) {
        updatedStore.groceries.splice(deleteGroceryIndex, 1);
      }
      updatedStores = [...state];
      updatedStores[updatableStoreIndex] = updatedStore;
      return updatedStores;
    default:
      return state;
  }
};

function StoresContextProvider({ children }) {
  const [storesState, dispatch] = useReducer(storesReducer, []);

  function addStore(storeData) {
    dispatch({ type: 'ADD_STORE', payload: storeData });
  }

  function addGroceries(storeId, groceriesList) {
    dispatch({
      type: 'ADD_GROCERIES',
      payload: { storeId, groceriesList },
    });
  }

  function setStores(stores) {
    dispatch({ type: 'SET', payload: stores });
  }

  function deleteStore(id) {
    dispatch({ type: 'DELETE_STORE', payload: id });
  }

  function deleteGrocery(storeId, groceryId) {
    dispatch({ type: 'DELETE_GROCERY', payload: { storeId, groceryId } });
  }

  function updateStore(id, storeData) {
    dispatch({ type: 'UPDATE', payload: { id, data: storeData } });
  }

  const value = useMemo(
    () => ({
      stores: storesState,
      setStores,
      addStore,
      addGroceries,
      deleteStore,
      deleteGrocery,
      updateStore,
    }),
    [storesState]
  );

  return <StoresContext.Provider value={value}>{children}</StoresContext.Provider>;
}

export default StoresContextProvider;
