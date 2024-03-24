import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRout = (props) => {
    const isAuthenticated = useSelector(state => state.userReducer.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to='/login'></Navigate>
    }

    return (
        <>
            <div>
                {props.children}
            </div>
        </>
    )
};

export default PrivateRout;
