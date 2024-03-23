import { FaPlusCircle } from "react-icons/fa";
import { FaCircleMinus } from "react-icons/fa6";
import { FaImages } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import "./ManageQuestion.scss";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import _, { forEach } from "lodash";
import { toast } from "react-toastify";
import { getAllQuiz, postAnswerForQuestion, postQuestionForQuiz } from "../../../../Service/ApiServeice";
const ManageQuestion = () => {

    const INIT = [
        {
            id: uuidv4(),
            description: "Question 1",
            image: '',
            imageName: " ",
            isValidate: "",
            answers: [
                {
                    id: uuidv4(),
                    description: 'Answers 1',
                    isCorrect: false,
                    isValidate: "",
                }
            ]
        },
        {
            id: uuidv4(),
            description: "Question 2",
            image: '',
            imageName: " ",
            answers: [
                {
                    id: uuidv4(),
                    description: 'Answers 1',
                    isCorrect: false
                }
            ]
        }
    ];
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState("");
    const [question, setQuestion] = useState(INIT);

    useEffect(() => {
        fetchQuiz();
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuiz();
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
    }

    console.log(selectedQuiz);

    const handleAddRemoveQuestion = (type, id) => {
        console.log(type)
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: "",
                image: '',
                imageName: " ",
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            };
            setQuestion([...question, newQuestion]);
            toast.success("Add quiz success!")
        }
        if (type === 'REMOVE') {
            let questionClone = _.cloneDeep(question);
            questionClone = questionClone.filter(item => item.id !== id);
            setQuestion(questionClone);
            toast.success("Delete quiz success!")
        }
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionClone = _.cloneDeep(question);
        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            };
            let index = questionClone.findIndex(item => item.id === questionId);
            questionClone[index].answers.push(newAnswer);
            setQuestion(questionClone);
            toast.success("Add answer success!")
        }
        if (type === 'REMOVE') {
            let questionClone = _.cloneDeep(question);
            let index = questionClone.findIndex(item => item.id === questionId);
            questionClone[index].answers = questionClone[index].answers.filter(item => item.id !== answerId);
            setQuestion(questionClone);
            toast.success("Delete answer success!")
        }
    }

    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionClone = _.cloneDeep(question);
            let index = questionClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                questionClone[index].description = value;
                setQuestion(questionClone);
            }
        }
    }

    const handleChangeFile = (questionId, e) => {
        let questionClone = _.cloneDeep(question);
        let index = questionClone.findIndex(item => item.id === questionId);
        if (index > -1 && e.target && e.target.files && e.target.files[0]) {
            questionClone[index].image = e.target.files[0];
            questionClone[index].imageName = e.target.files[0].name;
            setQuestion(questionClone);
        }
    }

    const handleAnswerQuestion = (type, questionId, answerId, value) => {
        let questionClone = _.cloneDeep(question);
        let index = questionClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            questionClone[index].answers = questionClone[index].answers.map(answers => {
                if (answers.id === answerId) {
                    if (type === "CHECKBOX") {
                        answers.isCorrect = !answers.isCorrect;
                    }
                    if (type === "ANSWER") {
                        answers.description = value;
                    }
                }
                return answers;
            });
            setQuestion(questionClone);
        }
    }

    const handleSubmit = async () => {
        if (_.isEmpty(selectedQuiz)) {
            toast.error("Please select a quiz");
            return;
        }

        let hasError = false;

        const updatedQuestions = question.map((questionItem, questionIndex) => {
            let updatedAnswers = questionItem.answers.map((answer, answerIndex) => {
                if (answer.description === '') {
                    toast.error(`Please enter a description for the answer ${answerIndex + 1} for question ${questionIndex + 1} `);
                    answer.isValidate = "is-invalid";
                    hasError = true;
                } else {
                    answer.isValidate = "";
                }
                return answer;
            });

            if (questionItem.description === "") {
                toast.error(`Please enter a description for the question ${questionIndex + 1}`);
                questionItem.isValidate = "is-invalid";
                hasError = true;
            } else {
                questionItem.isValidate = "";
            }

            return {
                ...questionItem,
                answers: updatedAnswers
            };
        });

        setQuestion(updatedQuestions);

        if (hasError) {
            return;
        }

        for (const questionItem of updatedQuestions) {
            const q = await postQuestionForQuiz(selectedQuiz, questionItem.description, questionItem.image);
            for (const answer of questionItem.answers) {
                const a = await postAnswerForQuestion(answer.description, answer.isCorrect, q.DT.id);
            }
        }

        toast.success("Save Quiz Success");
        setQuestion(INIT);
    }


    console.log(question);
    return (
        <>
            <div className="manager-question-container">
                <div className="form-control">
                    <div className="selected-question col-md-12 row">
                        <select value={selectedQuiz} onChange={(e) => setSelectedQuiz(e.target.value)} className="form-select form-select-lg mb-3 ms-2" aria-label=".form-select-lg example">
                            {listQuiz && listQuiz.length > 0 &&
                                listQuiz.map((item, index) => (
                                    <option key={item.id} value={item.id}>Quiz id: {item.id} - {item.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    {question && question.length > 0
                        && question.map((item, index) => {
                            return (
                                <>
                                    <div key={item.id} className="add-question-container">
                                        <div className=" col-md-12 row">
                                            <div className="col-md-6">
                                                <div class="form-floating mb-3">
                                                    <input value={item.description}
                                                        type="text" className={`form-control ${item.isValidate}`}
                                                        id="floatingInput"
                                                        placeholder="Description"
                                                        onChange={(e) => handleOnChange('QUESTION', item.id, e.target.value)}
                                                    />
                                                    <label for="floatingInput">Question {index + 1} description.</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 add-quiz">
                                                <div className="icon-add-quiz">
                                                    <FaPlusCircle onClick={() => handleAddRemoveQuestion("ADD")} />
                                                </div>
                                                {question.length > 1 &&
                                                    <div className="icon-add-quiz">
                                                        <FaCircleMinus onClick={() => handleAddRemoveQuestion("REMOVE", item.id)} />
                                                    </div>
                                                }
                                                <div className="upload-image">
                                                    <input id={`${item.id}`}
                                                        type="file"
                                                        onChange={(e) => handleChangeFile(item.id, e)}
                                                        hidden></input>
                                                    <label htmlFor={`${item.id}`} className="upload" ><RiImageAddFill />Upload Image</label>
                                                    <div className="status-image">
                                                        {item.image ? item.imageName : <><FaImages /> No image uploaded!</>}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        {item.answers && item.answers.length > 0 &&
                                            item.answers.map((answer, index) => {
                                                return (
                                                    <>
                                                        <div className="col-md-12 row add-question">
                                                            <div class="form-check col-md-1 checkbox-question">
                                                                <input class="form-check-input"
                                                                    type="checkbox"
                                                                    value=""
                                                                    checked={answer.isSelected}
                                                                    onChange={(e) => handleAnswerQuestion("CHECKBOX", item.id, answer.id, e.target.checked)}
                                                                    id="flexCheckDefault" />
                                                            </div>
                                                            <div class="form-floating mb-3 col-md-4 description-question">
                                                                <input value={answer.description}
                                                                    type="text" className={`form-control ${answer.isValidate}`}
                                                                    id="floatingInput"
                                                                    placeholder="name@example.com"
                                                                    onChange={(e) => handleAnswerQuestion("ANSWER", item.id, answer.id, e.target.value)}
                                                                />
                                                                <label for="floatingInput">{answer.description}</label>
                                                            </div>
                                                            <div className="col-md-7 icon-add-remove">
                                                                <div className="icon-add-quiz  icon-add-answer">
                                                                    <FaPlusCircle onClick={() => handleAddRemoveAnswer("ADD", item.id)} />
                                                                </div>
                                                                {item.answers.length > 1 &&
                                                                    <div className="icon-add-quiz col-md-7 icon-add-answer">
                                                                        <FaCircleMinus onClick={() => handleAddRemoveAnswer("REMOVE", item.id, answer.id)} />
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                {question && question.length > 0 &&
                    <div className="mt-3 d-flex justify-content-center ">
                        <button onClick={handleSubmit} className="btn btn-lg btn-warning">Save Question</button>
                    </div>
                }
            </div>
        </>
    )
};

export default ManageQuestion;
