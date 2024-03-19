import React, { useState, useEffect } from "react";
import { ImFacebook2 } from "react-icons/im";
import { FaGooglePlus, FaArrowLeft, FaGithub } from "react-icons/fa";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../Service/ApiServeice";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import userLogin from "../../Redux/Action/UserLogin";
import { ImSpinner9 } from "react-icons/im";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                handleClickLogin();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [email, password]);

    const handleClickLogin = async () => {
        setIsLoading(true)
        let res = await postLogin(email, password);
        if (res && res.EC === 0) {
            dispatch(userLogin(res))
            toast.success(res.EM);
            setIsLoading(false)
            navigate('/');
        }
        if (res && res.EC !== 0) {
            setIsLoading(false)
            toast.error(res.EM);
        }
    };

    const handleClickRegister = () => {
        navigate('/register');
    };

    const handleClickGoHome = () => {
        navigate("/");
    };

    return (
        <div className="login-container">
            <div className="login">
                <div className="title">Hello Again!</div>
                <div className="des">Wellcome back you've been missed!</div>
                <div className="group">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        className="userName"
                        placeholder="Enter email" />
                </div>
                <div className="group">
                    <input
                        className="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Enter password" />
                </div>
                <div className="recovery">
                    <a href="">Recovery</a>
                </div>
                <div className="sign">
                    <button className="btn-login"
                        onClick={handleClickLogin}
                        disabled={isLoading}
                    >
                        {isLoading === true && <ImSpinner9 className="loading-icon" />}
                        <span>Sign In</span>
                    </button>
                </div>
                <div className="or">Or continue with</div>
                <div className="list">
                    <div className="item">
                        <FaGooglePlus />
                    </div>
                    <div className="item">
                        <ImFacebook2 />
                    </div>
                    <div className="item">
                        <FaGithub />
                    </div>
                </div>
                <div className="register">
                    Not a member? <a href="" onClick={handleClickRegister}>Register</a>
                </div>
                <div className="btn-goHome">
                    <button onClick={handleClickGoHome}><FaArrowLeft /></button>
                </div>
            </div>
        </div>
    );
};

export default Login;
