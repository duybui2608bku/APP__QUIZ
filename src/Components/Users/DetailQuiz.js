import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getQuizById, postSubmitQuiz } from "../../Service/ApiServeice";
import './DetailQuiz.scss';
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import ContenQuiz from "./ContentQuiz";
import _ from "lodash";
const DetaiQuiz = () => {
    const params = useParams();
    const quizId = params.id;
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

    const handleCheckBock = (questionId, answerId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => item.id === questionId)
        if (question && question.answers) {
            let b = question.answers.map(item => {
                if (item.id === answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            });
            question.answers = b;
        }
        let index = dataQuizClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }

    }

    const handleSubmit = async () => {
        let payload = {
            quizId: +quizId,
            answers: []
        };
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.id;
                let userAnswersId = [];
                if (question.answers && Array.isArray(question.answers)) {
                    question.answers.forEach(answer => {
                        if (answer.isSelected === true) {
                            userAnswersId.push(answer.id);
                        }
                    });
                }
                answers.push({
                    questionId: questionId,
                    userAnswerId: userAnswersId
                });
            });

            payload.answers = answers;
            let res = await postSubmitQuiz(payload);
            console.log(res);
        }
    };




    useEffect(() => {
        fetchQuiz();
    }, [quizId])

    const fetchQuiz = async () => {
        let data = await getQuizById(params.id);
        data.DT.qa = data.DT.qa.map(question => ({
            ...question,
            answers: question.answers.map(answer => ({
                ...answer,
                isSelected: false
            }))
        }));
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
                        handleCheckBock={handleCheckBock}
                    ></ContenQuiz>
                    <div className="footer-quiz">
                        <div className="icon"><FaChevronCircleLeft onClick={handleClickPreQuestion} /></div>
                        <button className="btn btn-primary" onClick={() => handleSubmit()}>Submit</button>
                        <div className="icon"><FaChevronCircleRight onClick={handleClickNextQuestion} /></div>
                    </div>
                </div>
                <div className="right-content"></div>
            </div>
        </>
    )
};

export default DetaiQuiz;