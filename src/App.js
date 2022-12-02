import Register from './screens/Register';
import Login from './screens/Login';
import StoresLayout from './screens/StoresLayout';
import Home from './screens/Home';
import Store from './screens/Store'
import AddStore from './screens/AddStore';
import Layout from './screens/Layout';
import Missing from './screens/Missing';
import Unauthorized from './screens/Unauthorized';
import LinkPage from './screens/LinkPage';
import RequireAuth from './screens/RequireAuth';
import { Routes, Route } from 'react-router-dom';

// All file structure is from  https://youtu.be/oUZjO00NkhY

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth  />}>
          <Route element={<StoresLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/add_store" element={<AddStore />} />          
            <Route path="/store/:id/" element={<Store />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;