import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from './Components/Users'
import Admin from './Components/Admin';
import Home from './Components/Home';
import ManageUser from './Components/Admin/Content/ManagerUser';
import Dashboard from './Components/Admin/Content/DashBoard';
import Login from './Components/Auth/Login';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Layout = (props) => {

    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<Home />}></Route>
                    <Route path='users' element={<User />}></Route>
                </Route>
                <Route path='/admin' element={<Admin />}>
                    <Route index element={<Dashboard />} />
                    <Route path='manager-user' element={<ManageUser />} />
                </Route>
                <Route path='/login' element={<Login />}></Route>
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
                theme="colored"
                transition="bounce" />
        </>
    )
};

export default Layout;