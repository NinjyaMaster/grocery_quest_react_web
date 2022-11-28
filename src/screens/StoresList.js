import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { STORES_URL } from "../constants/network";

const StoresList = () => {
    const [stores, setStores] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getStores = async () => {
            try {
                // I don't know why django backend doesn't like signal: controller.signal
                // I leave it here until I figure out.
                 //const response = await axiosPrivate.get(STORES_URL, {
                 //    signal: controller.signal
                 //});
                const response = await axiosPrivate.get(STORES_URL);
                console.log(response.data);
                isMounted && setStores(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getStores();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    const getStoresDetail = async () => {
        try {
            // I don't know why django backend doesn't like signal: controller.signal
            // I leave it here until I figure out.
             //const response = await axiosPrivate.get(STORES_URL, {
             //    signal: controller.signal
             //});
            const response = await axiosPrivate.get(`${STORES_URL}6`);
            console.log(response.data);
            //isMounted && setStores(response.data);
        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }

    return (
        <article>
            <h2>Stores List</h2>
            {stores?.length
                ? (
                    <ul>
                        {stores.map((store, i) => <li key={i}>{store?.name}</li>)}
                    </ul>
                ) : <p>No to display</p>
            }
            <br />
            <button onClick={getStoresDetail}>Store Detial</button>
        </article>
    );
};

export default StoresList;