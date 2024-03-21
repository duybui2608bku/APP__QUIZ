import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ModalSubmitQuiz = (props) => {

    const { show, setShow, dataModaleResult } = props;
    console.log(dataModaleResult);
    const handleClose = () => setShow(false);
    return (
        <>

            <Modal show={show}
                onHide={handleClose}
                backdrop={'static'}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Result Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Total question :<b>{dataModaleResult.countTotal}</b> </div>
                    <div>Total answer correct: <b>{dataModaleResult.countCorrect}</b> </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary">
                        Show answer
                    </Button>
                    <Button variant="primary"
                        onClick={handleClose}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalSubmitQuiz;