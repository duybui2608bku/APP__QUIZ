const userLogin = (res) => {
    return {
        type: 'FETCH_USER_LOGIN_SUCCESS',
        payload: res
    }
}

export default userLogin;