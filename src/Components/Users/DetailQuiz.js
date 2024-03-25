import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getQuizById, postSubmitQuiz } from "../../Service/ApiServeice";
import './DetailQuiz.scss';
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import ContenQuiz from "./ContentQuiz";
import _ from "lodash";
import ModalSubmitQuiz from "./ModelSubitQuiz";
import { toast } from 'react-toastify';
import RightContent from "./Content/RightContent";
import { FaArrowAltCircleLeft } from "react-icons/fa";
const DetaiQuiz = () => {
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [showModalSubmit, setShowModalSubmit] = useState(false);
    const [dataModaleResult, setDataModaleResult] = useState({});
    const [checked, setChecked] = useState([]);
    const [submit, setSubmit] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        fetchQuiz();
    }, [quizId])

    useEffect(() => {
        if (dataQuiz && dataQuiz.length > 0 && !checked) {
            setChecked(new Array(dataQuiz.length).fill(false));
        }
    }, [dataQuiz]);

    const backhome = () => {
        navigate('/users')
    }

    const showAnswer = () => {
        setSubmit(true);
    }

    const handleClickQuestion = (index) => {
        setIndex(index);
    }


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
        let question = dataQuizClone.find(item => item.id === questionId);

        if (question && question.answers) {
            let updatedAnswers = question.answers.map(item => {
                if (item.id === answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            });
            question.answers = updatedAnswers;
        }

        let updatedChecked = [...checked];
        let questionIndex = dataQuizClone.findIndex(item => item.id === questionId);
        updatedChecked[questionIndex] = question.answers.some(answer => answer.isSelected);

        setDataQuiz(dataQuizClone);
        setChecked(updatedChecked);
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
            if (res && res.EC === 0) {
                setShowModalSubmit(true);
                setDataModaleResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
            } else {
                toast.error(res.EC)
            }
        }
    };






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
                        submit={submit}
                    ></ContenQuiz>
                    <div className="footer-quiz">
                        <div className="icon"><FaChevronCircleLeft onClick={handleClickPreQuestion} /></div>
                        <button disabled={submit} className="btn btn-primary" onClick={() => handleSubmit()}>Submit</button>
                        <div className="icon"><FaChevronCircleRight onClick={handleClickNextQuestion} /></div>
                    </div>
                    <div style={{ color: 'blue', fontSize: '30px', cursor: "pointer" }}>
                        <FaArrowAltCircleLeft onClick={backhome} />
                    </div>

                </div>
                <div className="right-content">
                    <RightContent
                        dataQuiz={dataQuiz}
                        checked={checked}
                        handleClickQuestion={handleClickQuestion}
                        handleSubmit={handleSubmit}
                        submit={submit}
                    />
                </div>
                <ModalSubmitQuiz
                    show={showModalSubmit}
                    setShow={setShowModalSubmit}
                    dataModaleResult={dataModaleResult}
                    showAnswer={showAnswer}
                ></ModalSubmitQuiz>
            </div>
        </>
    )
};

export default DetaiQuiz;