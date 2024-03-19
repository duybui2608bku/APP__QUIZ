import { useEffect, useState } from "react";
import { getQuizByUser } from "../../Service/ApiServeice";
import './ListQuiz.scss';
import { useNavigate } from "react-router-dom";
const ListQuiz = (props) => {
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/quiz/${id.id}`, { state: { quizTitle: id.description } })
    }
    const [arrQuiz, setArrQuiz] = useState([]);
    useEffect(() => {
        getQuizData();
    }, [])

    const getQuizData = async () => {
        let data = await getQuizByUser();
        if (data && data.EC === 0) {
            // console.log(data.DT[0])
            setArrQuiz(data.DT);
        }
    }
    return (
        <>
            <div className="list-quiz-container">
                {arrQuiz && arrQuiz.length > 0 &&
                    arrQuiz.map((item, index) => (
                        <div className="card" style={{ width: '18rem' }}>
                            <img src={`data:image/jpeg;base64,${item.image}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Quiz {index + 1}</h5>
                                <p className="card-text">{item.description}</p>
                                <button className="btn btn-primary" onClick={() => handleClick(item)}>Start now</button>
                            </div>
                        </div>
                    ))
                }

                {arrQuiz && arrQuiz.length === 0 &&
                    <div>You don't have any quiz now</div>
                }
            </div>
        </>
    )
};

export default ListQuiz;