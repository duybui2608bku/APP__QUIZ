import { useState } from "react";
import "./MagageQuiz.scss";
import { postQuiz } from "../../../../Service/ApiServeice";
import { toast } from 'react-toastify';
import QuizTable from "./QuizTable";
import Accordion from 'react-bootstrap/Accordion';
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModaleUpdateQuiz from "./ModalUpdateQuiz";
import UpdateQA from "./UpdateQA";
import AssignQuiz from "./AssignQuiz";
const ManageQuiz = (props) => {

    const [name, setName] = useState('');
    const [des, setDes] = useState('');
    const [level, setLevel] = useState('EASY');
    const [image, setImage] = useState(null);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [idDelete, setIdDelete] = useState('');
    const [dataAfterDelete, setDataAfterDelete] = useState(false);
    const [dataAfterCreate, setDataAfterCreate] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [dataUpdateQuiz, setDataUpdateQuiz] = useState({});
    const [dataAfterUpdate, setDataAfterUpdate] = useState(false);
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
        if (e.target && e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !des) {
            toast.error("Name and description are requied!");
            return;
        }

        let res = await postQuiz(name, des, level, image);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setDes("");
            setName('');
            setImage(null);
            setDataAfterCreate(!dataAfterCreate)
        } else {
            toast.error(res.EM)
        }
    }

    const handleClickDelete = (id) => {
        setShowModalDelete(true);
        setIdDelete(id);
    }

    const handleClickUpdateQuiz = (dataUpdate) => {
        setShowModalUpdate(true);
        setDataUpdateQuiz(dataUpdate);

    }



    return (
        <div className="manage-quiz-container">
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manager Quiz</Accordion.Header>
                    <Accordion.Body>
                        <div className="manage-quiz-add">
                            <form>
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
                                        <label htmlFor="floatingInput">Name</label>
                                    </div>
                                    <div className="form-floating">
                                        <input type="text"
                                            className="form-control"
                                            id="floatingPassword"
                                            placeholder="Description"
                                            value={des}
                                            onChange={(e) => onChangDes(e)}
                                        />
                                        <label htmlFor="floatingPassword">Description</label>
                                    </div>
                                    <div className="mt-3">
                                        <select className="form-select" id="floatingSelectGrid" aria-label="Floating label select example" onChange={(e) => handleChangeSelected(e)}>
                                            <option defaultValue={level}>Easy</option>
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
                                    <div className="mt-3">
                                        <button className="btn btn-warning btn-lg"
                                            onClick={(e) => handleSubmit(e)}
                                        >Save</button>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        <div className="list-quiz">
                            <div className="mb-3 ">List Quiz</div>
                            <QuizTable
                                handleClickDelete={handleClickDelete}
                                handleClickUpdateQuiz={handleClickUpdateQuiz}
                                dataAfterDelete={dataAfterDelete}
                                dataAfterCreate={dataAfterCreate}
                                dataAfterUpdate={dataAfterUpdate}
                            ></QuizTable>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Update Q/A Quiz</Accordion.Header>
                    <Accordion.Body>
                        <UpdateQA />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Assign to user</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <ModalDeleteQuiz
                show={showModalDelete}
                setShow={setShowModalDelete}
                idDelete={idDelete}
                dataAfterDelete={dataAfterDelete}
                setDataAfterDelete={setDataAfterDelete}
            ></ModalDeleteQuiz>
            <ModaleUpdateQuiz
                show={showModalUpdate}
                setShow={setShowModalUpdate}
                dataUpdateQuiz={dataUpdateQuiz}
                dataAfterUpdate={dataAfterUpdate}
                setDataAfterUpdate={setDataAfterUpdate}
            >
            </ModaleUpdateQuiz>
        </div>
    );
};

export default ManageQuiz;
