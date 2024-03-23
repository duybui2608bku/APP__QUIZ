import { useEffect, useState } from "react";
import { getAllQuiz, getAllUser } from "../../../../Service/ApiServeice";

const AssignQuiz = (props) => {

    const [selectedQuiz, setSelectedQuiz] = useState('');
    const [listQuiz, setListQuiz] = useState([]);

    const [selectedUser, setSelectedUser] = useState('');
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuiz();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
    };

    const fetchUser = async () => {
        let res = await getAllUser();
        if (res && res.EC === 0) {
            setListUser(res.DT);
        }
    }

    return (
        <>
            <div className="col-md-12 row">
                <div className="selected-question col-md-6 mb-3">
                    <select
                        value={selectedQuiz}
                        onChange={(e) => setSelectedQuiz(e.target.value)}
                        className="form-select form-select-lg"
                        aria-label=".form-select-lg example">
                        {listQuiz && listQuiz.length > 0 &&
                            listQuiz.map((item, index) => (
                                <option key={item.id} value={item.id}>Quiz id: {item.id} - {item.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="selected-users col-md-6 mb-3">
                    <select
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        className="form-select form-select-lg"
                        aria-label=".form-select-lg example">
                        {listUser && listUser.length > 0 &&
                            listUser.map((item, index) => (
                                <option key={item.id} value={item.id}>User id: {item.id} - {item.username} - {item.email}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                    <button className="btn btn-warning btn-lg">Assign</button>
                </div>
            </div>
        </>
    )
};

export default AssignQuiz;
