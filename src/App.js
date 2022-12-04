import Register from './screens/Register';
import Login from './screens/Login';
import StoresLayout from './screens/StoresLayout';
import StoresList from './screens/StoresList/StoresList';
import StoreDetail from './screens/StoreDetail/StoreDetail'
import AddStore from './screens/AddStore';
import AddGroceries from './screens/AddGroceries';
import AllowAnyLayout from './screens/AllowAnyLayout';
import Missing from './screens/Missing';
import Unauthorized from './screens/Unauthorized';
import LinkPage from './screens/LinkPage';
import RequireAuth from './screens/RequireAuth';
import { Routes, Route } from 'react-router-dom';

// All file structure is from  https://youtu.be/oUZjO00NkhY

function App() {

  return (
    <Routes>
      <Route path="/" element={<AllowAnyLayout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth  />}>
          <Route element={<StoresLayout />}>
            <Route path="/" element={<StoresList />} />
            <Route path="/add_store" element={<AddStore />} />          
            <Route path="/store/:storeId/" element={<StoreDetail />} />
            <Route path="/store/:storeId/add_groceries/" element={<AddGroceries />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;