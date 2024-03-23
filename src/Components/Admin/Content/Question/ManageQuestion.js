import { FaPlusCircle } from "react-icons/fa";
import { FaCircleMinus } from "react-icons/fa6";
import { FaImages } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import "./ManageQuestion.scss";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import _ from "lodash";
import { toast } from "react-toastify";
const ManageQuestion = () => {

    const INIT = [
        {
            id: uuidv4(),
            description: "Question 1",
            image: '',
            imageName: " ",
            answers: [
                {
                    id: uuidv4(),
                    description: 'Answers 1',
                    isCorrect: false
                },
                {
                    id: uuidv4(),
                    description: 'Answers 2',
                    isCorrect: false
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
                },
                {
                    id: uuidv4(),
                    description: 'Answers 2',
                    isCorrect: false
                }
            ]
        }
    ];

    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [question, setQuestion] = useState(INIT);

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


    return (
        <>
            <div className="manager-question-container">
                <div className="form-control">
                    <div className="selected-question col-md-12 row">
                        <select className="form-select form-select-lg mb-3 ms-2" aria-label=".form-select-lg example">
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
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
                                                    <input value={item.description} type="text" class="form-control" id="floatingInput" placeholder="Description" />
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
                                                    <input id="lableUpload" type="file" hidden></input>
                                                    <label htmlFor='lableUpload' className="upload" ><RiImageAddFill />Upload Image</label>
                                                    <div className="status-image">
                                                        <FaImages /> No image uploaded!
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
                                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                            </div>
                                                            <div class="form-floating mb-3 col-md-4 description-question">
                                                                <input value={answer.description} type="text" class="form-control" id="floatingInput" placeholder="name@example.com" />
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
            </div>
        </>
    )
};

export default ManageQuestion;
