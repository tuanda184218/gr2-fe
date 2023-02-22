import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App';
import HomePage from "./components/Home/HomePage";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Admin from "./components/Admin/Admin";
import ManageUser from './components/Admin/Content/ManageUser';
import ManageProduct from './components/Admin/Content/ManageProduct';
import Dashboard from './components/Admin/Content/Dashboard';  
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListProduct from "./components/User/ListProduct";
import PrivateRoute from "./routes/PrivateRoute";

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="users" element={ <PrivateRoute><ListProduct /></PrivateRoute>}/>
        </Route>
        <Route path="admins" element={<PrivateRoute><Admin /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="manage-users" element={<ManageUser />} />
          <Route path="manage-products" element={<ManageProduct />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Layout;
