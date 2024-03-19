import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getQuizById } from "../../Service/ApiServeice";
import './DetailQuiz.scss';
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
const DetaiQuiz = () => {
    const params = useParams();
    const location = useLocation();
    useEffect(() => {
        fetchQuiz();
    }, [params.id])

    const fetchQuiz = async () => {
        let data = await getQuizById(params.id);
        console.log(data);
    }
    return (
        <>
            <div className="detail-quiz-container">
                <div className="left-content">
                    <div className="title-quiz">
                        {location?.state?.quizTitle}
                    </div>
                    <div className="body-quiz">
                        body
                    </div>
                    <div className="content-quiz">
                        <div className="question-quiz">Question</div>
                        <div className="answer-quiz">
                            <div className="tem-ainswer">A.12345141</div>
                            <div className="tem-ainswer">B.12345141</div>
                            <div className="tem-ainswer">C.12345141</div>
                        </div>
                    </div>
                    <div className="footer-quiz">
                        <div className="icon"><FaChevronCircleLeft /></div>
                        <div className="icon"><FaChevronCircleRight /></div>
                    </div>
                </div>
                <div className="right-content">Counter</div>
            </div>
        </>
    )
};

export default DetaiQuiz;