const INIT = {
    account: {
        access_token: '',
        refresh_token: '',
        username: ''
    },
    isAuthenticated: false
};

const userReducer = (state = INIT, action) => {
    switch (action.type) {
        case "FETCH_USER_LOGIN_SUCCESS":
            console.log(action);
            return state;
        default:
            return state;
    }
};

export default userReducer;
