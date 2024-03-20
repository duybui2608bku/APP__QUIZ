import _ from 'lodash';
const ContenQuiz = (props) => {

    const { dataQuiz } = props;
    if (_.isEmpty(dataQuiz)) {
        return (
            <></>
        );
    }

    const handleCheckBock = (e) => {
        console.log(e.target.checked)
    }
    console.log(dataQuiz);
    return (
        <>
            <div className="content-quiz">
                <div className="question-quiz">Question {props.index + 1} : {dataQuiz.description}</div>
                <div className='img-quiz'>
                    {dataQuiz.imageFile ? (
                        <img src={`data:image/jpeg;base64,${dataQuiz.imageFile}`} />
                    ) : (
                        <div>No Image</div>
                    )}
                </div>
                <div className="answer-quiz">
                    {dataQuiz.answers && dataQuiz.answers.length &&
                        dataQuiz.answers.map((item, index) => {
                            return (
                                <div key={`answer-${index}`}>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" onChange={(e) => handleCheckBock(e)} />
                                        <label className="form-check-label">{item.description}</label>
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