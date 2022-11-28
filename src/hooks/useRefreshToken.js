import axios from '../api/axios';
import useAuth from './useAuth';
import { REFRESH_URL } from '../constants/network';

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.post(REFRESH_URL, {
            //withCredentials: true
            "refresh": auth.refreshToken
        });
        setAuth(prev => {
            //console.log(JSON.stringify(prev));
            console.log(prev);
            console.log(response.data);
            return { ...prev, accessToken: response.data.access }
        });
        return response.data.access;
    }
    return refresh;
};

export default useRefreshToken;