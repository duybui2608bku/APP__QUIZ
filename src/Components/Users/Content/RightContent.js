import CountDown from "./CountDown";

const RightContent = (props) => {

    const { dataQuiz, checked, handleClickQuestion, handleSubmit } = props;

    return (
        <>
            <div className="timer-down">
                <CountDown
                    handleSubmit={handleSubmit}
                />
            </div>
            <div className="list-question">
                {dataQuiz && dataQuiz.length > 0
                    && dataQuiz.map((item, index) => {
                        return (
                            <div className={checked && checked[index] ?
                                `question-item checked` :
                                `question-item`}
                                key={index}
                                onClick={() => handleClickQuestion(index)}
                            >{index + 1}</div>
                        )
                    })
                }
            </div>
        </>
    )
};

export default RightContent;
