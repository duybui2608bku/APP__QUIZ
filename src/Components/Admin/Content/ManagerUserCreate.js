import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ManagerUserCreate = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label for="inputEmail4" className="form-label">Email</label>
                            <input type="email" className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label for="inputPassword4" classNameName="form-label">Password</label>
                            <input type="password" className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label for="inputCity" className="form-label">User Name</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label for="inputState" className="form-label">State</label>
                            <select className="form-select">
                                <option selected value="ADMIN">ADMIN</option>
                                <option value="USER">USER</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label for="inputEmail4" className="form-label">Image</label>
                            <input type="file" className="form-control" />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ManagerUserCreate;