import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListQuiz from "./Components/Users/ListQuiz";
import Admin from './Components/Admin';
import Home from './Components/Home';
import ManageUser from './Components/Admin/Content/ManagerUser';
import Dashboard from './Components/Admin/Content/DashBoard';
import Login from './Components/Auth/Login';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from "./Components/Auth/Register";
import DetaiQuiz from "./Components/Users/DetailQuiz";
import Notfound from "./404/404";
const Layout = (props) => {

    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<Home />}></Route>
                    <Route path='users' element={<ListQuiz />}></Route>
                </Route>
                <Route path='/quiz/:id' element={<DetaiQuiz />}></Route>
                <Route path='/admin' element={<Admin />}>
                    <Route index element={<Dashboard />} />
                    <Route path='manager-user' element={<ManageUser />} />
                </Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="*" element={<Notfound />}></Route>
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