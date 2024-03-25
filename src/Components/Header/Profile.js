import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { getHistory, postChangePassword } from '../../Service/ApiServeice';
import { toast } from 'react-toastify';

function Profile(props) {

    const { show, setShow } = props;
    const handleClose = () => setShow(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [dataHistory, setDataHistory] = useState([]);
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const account = useSelector(state => state.userReducer.account);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        let res = await getHistory();
        if (res && res.EC === 0) {
            setDataHistory(res.DT.data);
        }
    };

    console.log(dataHistory)

    const handleSavePassword = async () => {

        if ((oldPassword && newPassword && confirmNewPassword) === "") {
            toast.error("Please enter password");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            toast.error("New password not match");
            return;
        }

        if (oldPassword === newPassword) {
            toast.error("The new password matches the old password");
            return;
        }

        let res = await postChangePassword(oldPassword, newPassword);
        if (res && res.EC === 0) {
            toast.success(res.EM);
        }
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="profile"
                        id="fill-tab-example"
                        className="mb-3"
                        fill
                    >
                        <Tab eventKey="Main Info" title="Main Info">
                            <div className='profile-img'>
                                <img alt={account.name} src={`data:image/jpeg;base64,${account.image}`}></img>
                            </div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Email</th>
                                        <th>User Name</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{account.email}</td>
                                        <td>{account.username}</td>
                                        <td>{account.role}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Tab>
                        <Tab eventKey="Password" title="Password">
                            <div className='my-3'><b>Change Password</b></div>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Old Password"
                                className="mb-3"
                            >
                                <Form.Control onChange={(e) => setOldPassword(e.target.value)} type="password" placeholder="Old Password" />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="New Password">
                                <Form.Control onChange={(e) => setNewPassword(e.target.value)} type="password" placeholder="New Password" />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Confirm New Password" className='mt-3'>
                                <Form.Control onChange={(e) => setConfirmNewPassword(e.target.value)} type="password" placeholder="Confirm New Password" />
                            </FloatingLabel>
                            <div className='my-3'>
                                <button onClick={handleSavePassword} className='btn btn-success btn-lg'>Save</button>
                            </div>
                        </Tab>
                        <Tab eventKey="History" title="Historys">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Quiz Name</th>
                                        <th>Total Questions</th>
                                        <th>Total Correct</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataHistory && dataHistory.length > 0 &&
                                        dataHistory.map(item => {
                                            return (
                                                <tr>
                                                    <td>{item.id}</td>
                                                    <td>{item.quizHistory.name}</td>
                                                    <td>{item.total_questions}</td>
                                                    <td>{item.total_correct}</td>
                                                    <td>{item.createdAt}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </Tab>
                    </Tabs>
                    {/* {dataHistory && dataHistory.map(item => {
                        return (
                            <>
                                {item.id}
                            </>
                        )
                    })} */}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Profile;
