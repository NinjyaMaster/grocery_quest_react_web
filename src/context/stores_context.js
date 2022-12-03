import { createContext, useReducer } from "react";


export const StoresContext = createContext({
    stores: [],
    addStore:({description, amount, date}) => {},
    addGroceries: ({storeId, groceriesList}) => {},
    deleteGrocery: ({storeId,groceryId}) => {},
    setStores: (store) => {},
    deleteStore: (id) => {},
    updateStore: (id, {description, amount, date}) => {}
});

function storesReducer(state, action){
    let updatableStoreIndex;
    let deleteGroceryIndex;
    let updatableStore;
    let updatedStore;
    let updatedStores;

    switch(action.type){
        case 'ADD_STORE':
            return [ action.payload , ...state];
        case 'ADD_GROCERIES':
            updatableStoreIndex = state.findIndex(
                (store) => Number(store.id) === Number(action.payload.storeId)
            );
            updatableStore = state[updatableStoreIndex];
            updatedStore = {...updatableStore};
            updatedStore.groceries.splice(0,updatedStore.groceries.length);
            action.payload.groceriesList.forEach(grocery => {
                updatedStore.groceries.push(grocery);
            });
            updatedStores = [...state];
            updatedStores[updatableStoreIndex] = updatedStore;
            return updatedStores;
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;
        case 'UPDATE':
            updatableStoreIndex = state.findIndex(
                (store) => store.id === action.payload.id
                );
            updatableStore = state[updatableStoreIndex];
            //updatedItem = {...updatableStore, ...action.payload.data};
            updatedStores = [...state];
            updatedStores[updatableStoreIndex] = action.payload.data;
            return updatedStores;
        case 'DELETE_STORE':
            return state.filter((store) => store.id !== action.payload);
        case 'DELETE_GROCERY':
            updatableStoreIndex = state.findIndex(
                (store) => store.id === action.payload.storeId
            );
            updatableStore = state[updatableStoreIndex];
            updatedStore = {...updatableStore};
            deleteGroceryIndex = updatedStore.groceries.findIndex(
                (grocery) => grocery.id === action.payload.groceryId
            );
            if(deleteGroceryIndex > -1 ){
                updatedStore.groceries.splice(deleteGroceryIndex, 1);
            }
            updatedStores = [...state];
            updatedStores[updatableStoreIndex] = updatedStore;
            return updatedStores;
        default:
            return state;
    }
}

export default function StoresContextProvider({children}){
    const [storesState, dispatch] = useReducer(storesReducer, []);

    function addStore(storeData){
        dispatch({type: 'ADD_STORE', payload: storeData});
    }

    function addGroceries(storeId, groceriesList){
        dispatch({type: 'ADD_GROCERIES', payload: {storeId:storeId, groceriesList:groceriesList}});
    }

    function setStores(stores){
        dispatch({type:'SET', payload: stores });
    }

    function deleteStore(id){
        dispatch({type: 'DELETE_STORE', payload: id});
    }

    function deleteGrocery(storeId, groceryId){
        dispatch({type: 'DELETE_GROCERY', payload: {storeId: storeId, groceryId:groceryId}});
    }

    function updateStore(id, storeData){
        dispatch({type:'UPDATE', payload:{id:id, data:storeData}});
    }

    const value = {
        stores :  storesState,
        setStores: setStores,
        addStore: addStore,
        addGroceries: addGroceries,
        deleteStore: deleteStore,
        deleteGrocery: deleteGrocery,
        updateStore: updateStore,
    };

    return <StoresContext.Provider value={value}>{children}</StoresContext.Provider>
}