import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getQuizById } from "../../Service/ApiServeice";
import './DetailQuiz.scss';
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import ContenQuiz from "./ContentQuiz";
const DetaiQuiz = () => {
    const params = useParams();
    const location = useLocation();
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const handleClickNextQuestion = () => {
        if (index < dataQuiz.length - 1) {
            setIndex(index + 1);
        } else {
            setIndex(dataQuiz.length - 1)
        }
    }

    const handleClickPreQuestion = () => {
        if (index > 0) {
            setIndex(index - 1);
        } else {
            setIndex(0)
        }
    }

    useEffect(() => {
        fetchQuiz();
    }, [params.id])

    const fetchQuiz = async () => {
        let data = await getQuizById(params.id);
        setDataQuiz(data.DT.qa);
    }
    return (
        <>
            <div className="detail-quiz-container">
                <div className="left-content">
                    <div className="title-quiz">
                        {location?.state?.quizTitle}
                    </div>
                    <ContenQuiz dataQuiz={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
                        index={index}
                    ></ContenQuiz>
                    <div className="footer-quiz">
                        <div className="icon"><FaChevronCircleLeft onClick={handleClickPreQuestion} /></div>
                        <button className="btn btn-primary">Submit</button>
                        <div className="icon"><FaChevronCircleRight onClick={handleClickNextQuestion} /></div>
                    </div>
                </div>
                <div className="right-content"></div>
            </div>
        </>
    )
};

export default DetaiQuiz;