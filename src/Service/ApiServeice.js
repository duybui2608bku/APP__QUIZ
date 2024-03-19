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


export {
    postCreateUser, getAllUser,
    putUpdateUser, deleteUser,
    getUserWithPaginate,
    postLogin, postRegister,
    getQuizByUser, getQuizById
};