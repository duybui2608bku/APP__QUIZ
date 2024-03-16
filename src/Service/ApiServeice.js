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
export { postCreateUser, getAllUser };