import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from './Components/Users';
import Admin from './Components/Admin';
import Home from './Components/Home';
import ManageUser from './Components/Admin/Content/ManagerUser';
import Dashboard from './Components/Admin/Content/DashBoard';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App></App>}>
        <Route index element={<Home></Home>}></Route>
        <Route path='users' element={<User></User>}></Route>
      </Route>
      <Route path='/admin' element={<Admin></Admin>}>
        <Route index element={<Dashboard></Dashboard>} />
        <Route path='manager-user' element={<ManageUser></ManageUser>} />
      </Route>
    </Routes>
  </BrowserRouter >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
