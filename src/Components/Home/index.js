import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import imgQuiz from "../../Asset/Remove-bg.ai_1711302005275.png";
const Home = () => {

    const isAuthenticated = useSelector(state => state.userReducer.isAuthenticated);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/users');
    }
    return (
        <>
            <div className="homepage-container">
                <img src={imgQuiz}></img>
                <div className="homepage-content">
                    <div className="title-1">Make forms
                        <br></br> worth filling out</div>
                    <div className="title-2">Get more data—like signups,<br></br> feedback, and anything<br></br>
                        else—with forms designed to be <br></br> refreshingly different.</div>
                    {isAuthenticated ? (
                        <div className="title-3">
                            <button className="btn-title-3" onClick={() => handleClick()}>Get's Quiz Now!</button>
                        </div>
                    ) : (<button className="btn-title-3" onClick={() => handleClick()}>Doing started. It's free</button>)}
                </div>
            </div>

        </>
    )
};

export default Home;