import "./Login.css";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../Service/ApiServeice";
import { toast } from 'react-toastify';
import { PiSpinnerGapFill } from "react-icons/pi";
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassWord] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const handleClickLogin = async () => {
        if (password !== confirmPassword) {
            toast.error("Not match password");
            return;
        }
        setIsLoading(true)
        let res = await postRegister(email, password);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setIsLoading(false);
            navigate('/login');
        }
        if (res && res.EC !== 0) {
            setIsLoading(false);
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
                    <div className="title">Not a member!</div>
                    <div className="des">
                        Register Now
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
                            className="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Enter password" />
                    </div>
                    <div className="group">
                        <input
                            className="ConfirmPassword"
                            onChange={(e) => setConfirmPassWord(e.target.value)}
                            value={confirmPassword}
                            type="password"
                            placeholder="Confirm password" />
                    </div>
                    <div className="sign">
                        <button
                            className="btn-login"
                            onClick={() => handleClickLogin()}
                            disabled={isLoading}
                        >
                            {isLoading === true && <PiSpinnerGapFill className="loading-icon" />}
                            <span>Sign Up</span>
                        </button>
                    </div>
                    <div className="btn-goHome">
                        <button onClick={() => handleClickGoHome()}><FaArrowLeft></FaArrowLeft></button>
                    </div>
                </div>
            </div>

        </>
    )
};

export default Register;