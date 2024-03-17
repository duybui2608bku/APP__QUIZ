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

const deleteUser = (id) => {
    const data = new FormData();
    data.append('id', id);
    return axios.delete('api/v1/participant', data);
}


export { postCreateUser, getAllUser, putUpdateUser, deleteUser };