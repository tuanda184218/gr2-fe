import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  {/* <React.StrictMode> */}
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="users" element={<User />} />
          <Route path="admins" element={<Admin />} />
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>  
  {/* </React.StrictMode> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
