import { useEffect, useState } from "react";
import { getAllQuiz, getAllUser, postAssignQuizToUser } from "../../../../Service/ApiServeice";
import { toast } from "react-toastify";

const AssignQuiz = (props) => {



    const [selectedUser, setSelectedUser] = useState('');
    const [listUser, setListUser] = useState([]);
    const [listQuiz, setListQuiz] = useState([]);


    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, [])
    const [selectedQuiz, setSelectedQuiz] = useState(listQuiz.length > 0 ? listQuiz[0].id : '');
    const fetchQuiz = async () => {
        let res = await getAllQuiz();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        } else {
            toast.error(res.EM)
        }
    };

    const fetchUser = async () => {
        let res = await getAllUser();
        if (res && res.EC === 0) {
            setListUser(res.DT);
        } else {
            toast.error(res.EM)
        }
    }

    const handleAssign = async () => {

        if (selectedQuiz === '') {
            toast.error("Please chosse quiz to assign!")
            return;
        }

        if (selectedUser === '') {
            toast.error("Please chosse user to assign!")
            return;
        }

        const res = await postAssignQuizToUser(selectedQuiz, selectedUser);
        if (res && res.EC === 0) {
            toast.success(res.EM)
        } else {
            toast.error(res.EM)
        }
        console.log(res);
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
                    <button className="btn btn-warning btn-lg" onClick={handleAssign}>Assign</button>
                </div>
            </div>
        </>
    )
};

export default AssignQuiz;
