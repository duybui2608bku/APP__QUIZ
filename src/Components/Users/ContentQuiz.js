import _ from 'lodash';
import { FcCheckmark } from "react-icons/fc";
import { HiOutlineXMark } from "react-icons/hi2";
const ContenQuiz = (props) => {

    const { dataQuiz } = props;

    if (_.isEmpty(dataQuiz)) {
        return (
            <></>
        );
    }

    const handleCheckBock = (e, quizId, answerId) => {
        props.handleCheckBock(quizId, answerId)
    }


    return (
        <>
            <div className="content-quiz">
                <div className="question-quiz">Question {props.index + 1} : {dataQuiz.description}</div>
                <div className='img-quiz'>
                    {dataQuiz.imageFile ? (
                        <img src={`data:image/jpeg;base64,${dataQuiz.imageFile}`} />
                    ) : (
                        <div>   </div>
                    )}
                </div>
                <div className="answer-quiz">
                    {dataQuiz.answers && dataQuiz.answers.length &&
                        dataQuiz.answers.map((item, index) => {
                            return (
                                <div key={`answer-${index}`}>
                                    <div className="form-check">
                                        <input checked={item.isSelected}
                                            className="form-check-input"
                                            type="checkbox"
                                            onChange={(e) => handleCheckBock(e, dataQuiz.id, item.id)} />
                                        <label className="form-check-label">{item.description}</label>
                                        {props.submit === true &&
                                            <>
                                                {item.isCorrect === true && <FcCheckmark className='correct' />}
                                                {item.isSelected === true && item.isCorrect === false &&
                                                    <span style={{ color: 'red' }}>
                                                        <HiOutlineXMark className='no-correct' />
                                                    </span>
                                                }

                                            </>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
};

export default ContenQuiz;