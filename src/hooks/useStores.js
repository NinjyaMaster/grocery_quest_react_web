import { useContext } from "react";
import { StoresContext } from "../context/stores_context";

const useStores = () => {
    return useContext(StoresContext);
}

export default useStores;