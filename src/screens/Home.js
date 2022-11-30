import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useStores from "../hooks/useStores";
import StoresList from "../components/StoresList";

const Home = () => {
    const { setAuth } = useAuth();
    const { setStores } = useStores();
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context
        // axios to /logout endpoint
        setAuth({});
        setStores([]);
        navigate('/login');
    }

    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <StoresList />
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home