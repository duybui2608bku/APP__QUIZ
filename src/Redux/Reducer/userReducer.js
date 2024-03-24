const INIT = {
    account: {
        access_token: '',
        refresh_token: '',
        username: '',
        image: '',
        role: '',
        email: ''
    },
    isAuthenticated: false
};

const userReducer = (state = INIT, action) => {
    switch (action.type) {
        case "FETCH_USER_LOGIN_SUCCESS":
            return {
                ...state,
                account: {
                    access_token: action?.payload?.DT?.access_token,
                    refresh_token: action?.payload?.DT?.refresh_token,
                    username: action?.payload?.DT?.username,
                    image: action?.payload?.DT?.image,
                    role: action?.payload?.DT?.role,
                    email: action?.payload?.DT?.email  // Kiểm tra cú pháp truy cập email
                },
                isAuthenticated: true
            };
        case "FETCH_USER_LOGOUT_SUCCESS":
            return {
                ...state, account: {
                    access_token: '',
                    refresh_token: '',
                    username: '',
                    image: '',
                    role: '',
                    email: ''
                }, isAuthenticated: false
            };
        default:
            return state;
    }
};

export default userReducer;
