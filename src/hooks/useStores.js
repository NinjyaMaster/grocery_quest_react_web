import { useContext } from "react";
import { StoresContext } from "../context/StoresContextProvider";

const useStores = () => {
    return useContext(StoresContext);
}

export default useStores;