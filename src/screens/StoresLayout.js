import { useNavigate,  Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { BASE_URL, STORES_URL } from "../constants/network";
import useStores from "../hooks/useStores";

const StoresLayout = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const { addStore, addGroceries } = useStores();
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const axiosPrivate = axios.create({
        baseURL: BASE_URL,
        headers: {"Authorization": `Bearer ${auth.accessToken}`}
      });

    axiosPrivate.interceptors.request.use(
        config => {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
            }
            return config;
        }, (error) => Promise.reject(error)
    );

    axiosPrivate.interceptors.response.use(
        response => response,
        async (error) => {
            const prevRequest = error?.config;
            // Django backend return 401 I changed 403 error code to 401.
            if ( ( error?.response?.status === 401 )&& !prevRequest?.sent) {
                prevRequest.sent = true;
                const newAccessToken = await refresh();
                prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosPrivate(prevRequest);
            }
            return Promise.reject(error);
        }
    );


    const handlePostStore = async (store) => {
        try {      
            const res = await axiosPrivate.post(
                STORES_URL,
                store
            );
            console.log(JSON.stringify(res?.data));
            addStore(res.data);
            navigate('/', { state: { from: location }, replace: true });
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
    }

    const handlePatchGroceries = async ( storeId, bodyParameters) => {
        try {      
            const res = await axiosPrivate.patch(
                `${STORES_URL}${storeId}`,
                bodyParameters
            );
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
    }

    return (
        <Outlet context={[handlePostStore, handlePatchGroceries]}/>
    );
}

export default StoresLayout;