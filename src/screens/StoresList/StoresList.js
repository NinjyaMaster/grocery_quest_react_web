import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useStores from "../../hooks/useStores"
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import StoreItem from "./StoreItem";

const StoresList = () => {
    const { setAuth } = useAuth();
    const { stores, setStores } = useStores();
    const navigate = useNavigate();
    const [handlePostStore, handlePatchGroceries, handleGetStores, handleDeleteStore] = useOutletContext();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        handleGetStores(isMounted);

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    const logout = () => {
        setAuth({});
        setStores([]);
        navigate('/login');
    }

    const handleAddStore = () => {
        navigate('/add_store', { state: {from: location}, replace:true });
    }

    return (
        <section>
            <h1>Stores</h1>
            <article>
                <button onClick={handleAddStore}>Add Store</button>
                <h2>Stores List</h2>
                { stores?.length
                    ? (
                        <ul>
                        {stores.map((store) =>
                            <li key={store?.id}> <StoreItem key={store?.id}  store={store} handleDeleteStore={handleDeleteStore}/></li>
                        )}
                        </ul>
                    ) : <p> No Stores. Please add stores </p>

                }
            </article>
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )    

}

export default StoresList;