import video from "../../Asset/video.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { UseSelector } from "react-redux";
const Home = () => {

    const isAuthenticated = useSelector(state => state.userReducer.isAuthenticated);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/users');
    }
    return (
        <>
            <div className="homepage-container">
                <video autoPlay muted loop className="video">
                    <source src={video} type="video/mp4"></source>
                </video>
                <div className="homepage-content">
                    <div className="title-1">Make forms
                        <br></br> worth filling out</div>
                    <div className="title-2">Get more data—like signups, feedback, and anything<br></br>
                        else—with forms designed to be refreshingly different.</div>
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