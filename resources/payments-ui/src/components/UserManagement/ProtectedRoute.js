
import {Redirect, Route, useLocation} from "react-router-dom";
import NotAuthorized from "./NotAuthorized";
import {useSelector} from "react-redux";

const ProtectedRoute = (props) => {

    const role = useSelector(state => state.role);
    const location = useLocation();

    //start with assumption that there is no logged in user
    const redirectTo = `/login?target=${location.pathname}`;
    let result = <Redirect to={redirectTo} />
    if (props.roles.includes(role)) {
        result = props.component;
    }
    else if (role !== "") {
        result = <NotAuthorized />
    }


    return (<Route path={props.path}>
        {result}
    </Route>);
}

export default ProtectedRoute;
