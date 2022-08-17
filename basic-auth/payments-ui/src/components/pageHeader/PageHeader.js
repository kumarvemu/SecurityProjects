import './pageHeader.css';
import Menu from "./Menu";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const PageHeader = () => {

    const loginData = useSelector( state => state);

    const dispatch = useDispatch();
    const history = useHistory();

    const logout = () => {
        dispatch({type: "logout"});
        history.push("/login");
    }

    return (
        <div className="pageHeader">
            <h1><Link to="/">Payments Application</Link></h1>
            <Menu/>
            {loginData.isLoggedIn && <p className="userDetails">user: {loginData.name} ({loginData.role}) <button onClick={logout}>Log out</button></p> }
        </div>
    );
};

export default PageHeader
