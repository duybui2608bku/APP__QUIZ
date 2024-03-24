import { FaPlusCircle } from "react-icons/fa";
import { FaCircleMinus } from "react-icons/fa6";
import { FaImages } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import './UpdateQA.scss';
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import _, { forEach } from "lodash";
import { toast } from "react-toastify";
import { getAllQuiz, getQuizWithQA, postUpsertQA } from "../../../../Service/ApiServeice";

const UpdateQA = () => {

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

    const [selectedQuiz, setSelectedQuiz] = useState('');
    const [listQuiz, setListQuiz] = useState([]);
    const [question, setQuestion] = useState(INIT);
    const [listQA, setlistQA] = useState([]);
    const [prevSelectedQuiz, setPrevSelectedQuiz] = useState('');
    useEffect(() => {
        fetchQuiz();
    }, [])

    useEffect(() => {
        if (prevSelectedQuiz !== selectedQuiz) {
            fetchQuestion();
            setPrevSelectedQuiz(selectedQuiz);
        }
    }, [selectedQuiz]);

    const fetchQuiz = async () => {
        let res = await getAllQuiz();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
            setSelectedQuiz(res.DT[0].id);
            setPrevSelectedQuiz(res.DT[0].id);
        }
    }

    const fetchQuestion = async () => {
        let res = await getQuizWithQA(selectedQuiz);
        if (res && res.EC === 0) {
            setlistQA(res.DT)
        }
    }


    const handleAddRemoveQuestion = (type, id) => {
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

            let listQAClone = _.cloneDeep(listQA);
            listQAClone.qa.push(newQuestion);
            setlistQA(listQAClone);
            toast.success("Add quiz success!");
        }

        if (type === 'REMOVE') {
            let listQAClone = _.cloneDeep(listQA);
            listQAClone.qa = listQAClone.qa.filter(question => question.id !== id);
            setlistQA(listQAClone);
            toast.success("Delete quiz success!");
        }
    }


    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let listQAClone = _.cloneDeep(listQA);
        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            };
            let index = listQAClone.qa.findIndex(item => item.id === questionId);
            listQAClone.qa[index].answers.push(newAnswer);
            setlistQA(listQAClone);
            toast.success("Add answer success!")
        }
        if (type === 'REMOVE') {
            let listQAClone = _.cloneDeep(listQA);
            let index = listQAClone.qa.findIndex(item => item.id === questionId);
            listQAClone.qa[index].answers = listQAClone.qa[index].answers.filter(item => item.id !== answerId);
            setlistQA(listQAClone);
            toast.success("Delete answer success!")
        }
    }

    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let listQAClone = _.cloneDeep(listQA);
            console.log(listQAClone);

            const questionIndex = listQAClone.qa.findIndex(item => item.id === questionId);
            if (questionIndex > -1) {
                listQAClone.qa[questionIndex].description = value;
                setlistQA(listQAClone);
            }
        }
    }

    const handleChangeFile = (questionId, e) => {
        let listQAClone = _.cloneDeep(listQA);
        let index = listQAClone.qa.findIndex(item => item.id === questionId);
        if (index > -1 && e.target && e.target.files && e.target.files[0]) {
            listQAClone.qa[index].imageFile = e.target.files[0];
            listQAClone.qa[index].imageName = e.target.files[0].name;
            setlistQA(listQAClone);
        }
    }

    const handleAnswerQuestion = (type, questionId, answerId, value) => {
        let listQAClone = _.cloneDeep(listQA);
        let index = listQAClone.qa.findIndex(item => item.id === questionId);

        if (index > -1) {
            listQAClone.qa[index].answers = listQAClone.qa[index].answers.map(answer => {
                if (answer.id === answerId) {
                    if (type === "CHECKBOX") {
                        answer.isCorrect = !answer.isCorrect;
                    }
                    if (type === "ANSWER") {
                        answer.description = value;
                    }
                }
                return answer;
            });
            setlistQA(listQAClone);
        }
    }


    const handleSubmit = async () => {

        //Validate
        if (_.isEmpty(selectedQuiz)) {
            toast.error("Please select a quiz");
            return;
        }

        let hasError = false;

        const updatedQuestions = listQA.qa.map((questionItem, questionIndex) => {
            let updatedAnswers = questionItem.answers.map((answer, answerIndex) => {
                if (answer.description === '') {
                    toast.error(`Please enter a description for the answer ${answerIndex + 1} for question ${questionIndex + 1} `);
                    answer.isValidate = "is-invalid";
                    hasError = true;
                }
                else {
                    answer.isValidate = "";
                }
                return answer;
            });

            if (questionItem.description === "") {
                toast.error(`Please enter a description for the question ${questionIndex + 1}`);
                questionItem.isValidate = "is-invalid";
                hasError = true;
            }
            if (questionItem.imageName === '') {
                toast.error(`Please chosse a image for ${questionIndex + 1}`);
                hasError = true;
            }
            else {
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

        //end validate

        const listQAClone = _.cloneDeep(listQA);
        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });


        for (const item of listQAClone.qa) {
            if (item.imageFile instanceof Blob) {
                item.imageFile = await toBase64(item.imageFile);
            }
        }

        let res = await postUpsertQA({
            quizId: listQAClone.quizId,
            questions: listQAClone.qa
        });

        if (res && res.EC === 0) {
            toast.success(res.EM);
            fetchQuiz();
        }
    }

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
                    {listQA && listQA.qa && listQA.qa.length > 0
                        && listQA.qa.map((item, index) => {
                            return (
                                <div key={item.id} className="add-question-container">
                                    <div className=" col-md-12 row">
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3">
                                                <input
                                                    value={item.description}
                                                    type="text"
                                                    className={`form-control ${item.isValidate}`}
                                                    id="floatingInput"
                                                    placeholder="Description"
                                                    onChange={(e) => handleOnChange('QUESTION', item.id, e.target.value)}
                                                />
                                                <label htmlFor="floatingInput">Answers {index + 1}: description.</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 add-quiz">
                                            <div className="icon-add-quiz">
                                                <FaPlusCircle onClick={() => handleAddRemoveQuestion("ADD")} />
                                            </div>
                                            {listQA.qa.length > 1 &&
                                                <div className="icon-add-quiz">
                                                    <FaCircleMinus onClick={() => handleAddRemoveQuestion("REMOVE", item.id)} />
                                                </div>
                                            }
                                            <div className="upload-image">
                                                <input
                                                    id={`${item.id}`}
                                                    type="file"
                                                    onChange={(e) => handleChangeFile(item.id, e)}
                                                    hidden
                                                // value={item.imageFile}
                                                ></input>
                                                <label htmlFor={`${item.id}`} className="upload" >
                                                    <RiImageAddFill />Upload Image
                                                </label>
                                                <div className="status-image">
                                                    {item.imageFile ? item.imageName : <><FaImages /> No image uploaded!</>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {item.answers && item.answers.length > 0 &&
                                        item.answers.map((answer, ansIndex) => {
                                            return (
                                                <div key={answer.id} className="col-md-12 row add-question">
                                                    <div className="form-check col-md-1 checkbox-question">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value=""
                                                            checked={answer.isSelected}
                                                            onChange={(e) => handleAnswerQuestion("CHECKBOX", item.id, answer.id, e.target.checked)}
                                                            id="flexCheckDefault"
                                                        />
                                                    </div>
                                                    <div className="form-floating mb-3 col-md-4 description-question">
                                                        <input
                                                            value={answer.description}
                                                            type="text"
                                                            className={`form-control ${answer.isValidate}`}
                                                            id="floatingInput"
                                                            placeholder="name@example.com"
                                                            onChange={(e) => handleAnswerQuestion("ANSWER", item.id, answer.id, e.target.value)}
                                                        />
                                                        <label htmlFor="floatingInput">{answer.description}</label>
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
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }

                </div>
                {listQA &&
                    <div className="mt-3 d-flex justify-content-center ">
                        <button onClick={handleSubmit} className="btn btn-lg btn-warning">Save Question</button>
                    </div>
                }
            </div>
        </>
    )
};

export default UpdateQA;
