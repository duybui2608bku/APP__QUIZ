import video from "../../Asset/video.mp4";
import { useSelector } from "react-redux";

const Home = () => {

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
                    <div className="title-3">
                        <button className="btn-title-3">Get's started. It's free</button>
                    </div>
                </div>
            </div>

        </>
    )
};

export default Home;