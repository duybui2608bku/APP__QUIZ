import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import _ from 'lodash';
import { putUpdateQuiz } from '../../../../Service/ApiServeice';
const ModaleUpdateQuiz = (props) => {

    const { show, setShow, dataUpdateQuiz, dataAfterUpdate, setDataAfterUpdate } = props;
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState("EASY");
    const [quizImage, setQuizImage] = useState('');
    const [previewImage, setPreviewImage] = useState("");

    console.log(difficulty);
    useEffect(() => {
        if (dataUpdateQuiz) {
            setDescription(dataUpdateQuiz.description || '');
            setName(dataUpdateQuiz.name || '');
            setDifficulty(dataUpdateQuiz.difficulty || 'EASY');
            setQuizImage(dataUpdateQuiz.image)
            if (dataUpdateQuiz.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdateQuiz.image}`);
            }
        }
    }, [dataUpdateQuiz]);

    console.log(name);
    const handleUploadImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
            setQuizImage(e.target.files[0]);
        } else {
            setPreviewImage("NULL");
        }
    }

    const handleClose = () => {
        setShow(false);
        setDescription('');
        setName('');
        setDifficulty('');
        setQuizImage('');
        setPreviewImage('');
    };

    const handleSubmit = async () => {


        if (!name || !description) {
            toast.error("Name and description are require!");
            return;
        }

        let res = await putUpdateQuiz(dataUpdateQuiz.id, description, name, difficulty, quizImage)
        if (res && res.EC === 0) {
            toast.success(res.EM);
            handleClose();
            setDataAfterUpdate(!dataAfterUpdate);
        }

        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    }


    return (
        <>
            <Modal show={show} onHide={handleClose} size='lg' backdrop="static" className='modal-css'>
                <Modal.Header closeButton>
                    <Modal.Title>Update Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">ID</label>
                            <input disabled={true} type="text" className="form-control" value={dataUpdateQuiz.id} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input type="text"
                                className="form-control"
                                placeholder='Nhập tên quiz:'
                                value={name}
                                onChange={(e) => { setName(e.target.value) }} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input type="text"
                                className="form-control"
                                placeholder='Nhập miêu tả quiz:'
                                value={description}
                                onChange={(e) => { setDescription(e.target.value) }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Difficulty</label>
                            <select value={difficulty} onChange={(e) => { setDifficulty(e.target.value) }} className="form-select">
                                <option value="EASY">EASY</option>
                                <option value="MIDLLE">MIDLLE</option>
                                <option value="HARD">HARD</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label img-upload" htmlFor='lableUpload'> <FcPlus className='icon-plus'></FcPlus>Upload File Img</label>
                            <input type="file"
                                className="form-control"
                                id='lableUpload'
                                hidden
                                onChange={(e) => handleUploadImage(e)} />
                        </div>
                        <div className="col-md-12 img-preview">
                            {previewImage ? (<img src={previewImage} alt='img'></img>) : (<span>Preview Image</span>)}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModaleUpdateQuiz;