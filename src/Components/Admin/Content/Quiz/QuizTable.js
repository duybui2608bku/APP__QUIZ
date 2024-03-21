import { useEffect, useState } from "react";
import { getAllQuiz } from "../../../../Service/ApiServeice";

const QuizTable = (props) => {

    const { handleClickDelete, dataAfterDelete } = props;

    const [dataQuizById, setDataQuizById] = useState([]);

    useEffect(() => {
        fetchQuiz();
    }, [dataAfterDelete])

    const fetchQuiz = async () => {
        let res = await getAllQuiz();
        if (res && res.EC === 0) {
            setDataQuizById(res.DT)
        }
    }

    return (
        <>
            <div>
                <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Level</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataQuizById && dataQuizById.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td><b>{item.id}</b></td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.difficulty}</td>
                                    <td>
                                        <button className="btn btn-primary mx-3">Update</button>
                                        <button className="btn btn-warning" onClick={() => handleClickDelete(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
};

export default QuizTable;