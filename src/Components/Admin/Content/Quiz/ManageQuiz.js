import { useState } from "react";
import "./MagageQuiz.scss";

const ManageQuiz = (props) => {

    const [name, setName] = useState('');
    const [des, setDes] = useState('');
    const [level, setLevel] = useState('EASY');
    const [image, setImage] = useState(null);

    const onChangName = (e) => {
        setName(e.target.value);
    }

    const onChangDes = (e) => {
        setDes(e.target.value);
    }

    const handleChangeSelected = (e) => {
        setLevel(e.target.value);
    }

    const onChangeFile = (e) => {

    }
    return (
        <div className="manage-quiz-container">
            <div className="manage-quiz-title">
                Manager Quiz
            </div>
            <hr></hr>
            <div className="manage-quiz-add">
                <form action="/action_page.php">
                    <fieldset className="border rounded-3 p-4">
                        <legend className="float-none w-auto px-3">Add Quiz</legend>
                        <div className="form-floating mb-3">
                            <input type="text"
                                className="form-control"
                                id="floatingInput"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => onChangName(e)}
                            />
                            <label for="floatingInput">Name</label>
                        </div>
                        <div className="form-floating">
                            <input type="text"
                                className="form-control"
                                id="floatingPassword"
                                placeholder="Description"
                                onChange={(e) => onChangDes(e)}
                            />
                            <label for="floatingPassword">Description</label>
                        </div>
                        <div className="mt-3">
                            <select className="form-select" id="floatingSelectGrid" aria-label="Floating label select example" onChange={(e) => handleChangeSelected(e)}>
                                <option selected value='EASY'>Easy</option>
                                <option value="MIDLLE">Midlle</option>
                                <option value="HARD">Hard</option>
                            </select>
                        </div>
                        <div className="mt-3">
                            <div>Upload Image</div>
                            <input type="file"
                                className="mt-3 form-control"
                                onChange={(e) => onChangeFile(e)}
                            ></input>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default ManageQuiz;
