import { ImFacebook2 } from "react-icons/im";
import { FaGooglePlus } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import "./Login.css";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../Service/ApiServeice";
import { toast } from 'react-toastify';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleClickLogin = async () => {
        let res = await postLogin(email, password);
        if (res && res.EC === 0) {
            toast.success(res.EM);
        }

        if (res && res !== 0) {
            toast.error(res.EM);
        }
    }

    const navigate = useNavigate();

    const handleClickGoHome = () => {
        navigate("/");
    }

    return (
        <>
            <div className="login-container">
                <div className="login">
                    <div className="title">Hello Again!</div>
                    <div className="des">Wellcome back you've
                        <br />been missed!
                    </div>
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
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="text" className="password"
                            placeholder="Enter password" />
                        <span className="open-eye"><FaEye /></span>
                        <span className="off-eye"><FaEyeSlash /></span>
                    </div>
                    <div className="recovery">
                        <a href="">Recovery</a>
                    </div>
                    <div className="sign">
                        <button
                            className="btn-login"
                            onClick={() => handleClickLogin()}
                        >Sign In</button>
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
                        Not a member? <a href="">Register</a>
                    </div>
                    <div className="btn-goHome">
                        <button onClick={() => handleClickGoHome()}><FaArrowLeft></FaArrowLeft></button>
                    </div>
                </div>
            </div>

        </>
    )
};

export default Login;