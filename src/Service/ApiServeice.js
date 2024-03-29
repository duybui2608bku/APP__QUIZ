import axios from '../Utils/AxiousCustomize';
const postCreateUser = (email, password, user, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', user);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data);
}

const getAllUser = () => {
    return axios.get('api/v1/participant/all');
}

const putUpdateUser = (id, user, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', user);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data);
}

const deleteUser = (userID) => {
    return axios.delete('api/v1/participant', { data: { id: userID } });
}

const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const postLogin = (userEmail, userPassword) => {
    return axios.post(`api/v1/login`, { email: userEmail, password: userPassword });
}

const postRegister = (userEmail, userPassword) => {
    return axios.post(`api/v1/register`, { email: userEmail, password: userPassword });
}

const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant');
}

const getQuizById = (idQuiz) => {
    return axios.get(`api/v1/quiz-with-qa/${idQuiz}`);
}

const postSubmitQuiz = (data) => {
    return axios.post(`api/v1/quiz-submit`, { ...data });
}

const postQuiz = (description, name, difficulty, quizImage) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);
    return axios.post(`api/v1/quiz`, data);
}

const getAllQuiz = () => {
    return axios.get(`api/v1/quiz/all`);
}

const deleteQuiz = (id) => {
    return axios.delete(`api/v1/quiz/${id}`);
}

const putUpdateQuiz = (id, description, name, difficulty, quizImage) => {
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);
    return axios.put('api/v1/quiz', data);
}

const postQuestionForQuiz = (id, description, questionImage) => {
    const data = new FormData();
    data.append('quiz_id', id);
    data.append('description', description);
    data.append('questionImage', questionImage);
    return axios.post('api/v1/question', data);
}

const postAnswerForQuestion = (description, correctAnswer, question_id) => {
    return axios.post('api/v1/answer', {
        description, correctAnswer, question_id
    });
}

const postAssignQuizToUser = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', {
        quizId, userId
    });
}

const getQuizWithQA = (id) => {
    return axios.get(`api/v1/quiz-with-qa/${id}`);
}

const postUpsertQA = (data) => {
    return axios.post(`api/v1/quiz-upsert-qa`, { ...data });
}

const postLogOut = (email, refresh_token) => {
    return axios.post('api/v1/logout', {
        email, refresh_token
    });
}

const getOverView = () => {
    return axios.get('api/v1/overview');
}

const postChangePassword = (current_password, new_password) => {
    return axios.post('api/v1/change-password', {
        current_password, new_password
    });
}

const getHistory = () => {
    return axios.get('api/v1/history');
}


export {
    postCreateUser, getAllUser,
    putUpdateUser, deleteUser,
    getUserWithPaginate,
    postLogin, postRegister,
    getQuizByUser, getQuizById,
    postSubmitQuiz, postQuiz,
    getAllQuiz, deleteQuiz,
    putUpdateQuiz, postQuestionForQuiz,
    postAnswerForQuestion, postAssignQuizToUser,
    getQuizWithQA, postUpsertQA,
    postLogOut, getOverView,
    postChangePassword, getHistory
};