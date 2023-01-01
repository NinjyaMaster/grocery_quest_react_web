import { useContext } from 'react';
import { StoresContext } from '../context/StoresContextProvider';

const useStores = () => useContext(StoresContext);

export default useStores;
