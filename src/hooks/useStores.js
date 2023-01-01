import { useContext } from 'react';
import { StoresContext } from '../contexts/StoresContextProvider';

const useStores = () => useContext(StoresContext);

export default useStores;
