import {useState} from "react";
import {login} from "../../data/LoginDataFunctions";
import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom';
import './Login.css';

const Login = (props) => {

    const [loginData, setLoginData] = useState({username:"", password: ""})
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const navigate =useHistory();
    const queryParams = new URLSearchParams(window.location.search)
    let target = queryParams.get("target")
    if (target == null) {
        target = "/";
    }

    const attemptLogin = (e) => {
        e.preventDefault();
        login(loginData.username, loginData.password).then (
            result => {
                if (result.status === 200) {
                    dispatch({
                        type: "login", value:
                            {...result.data}
                    })
                    console.log("successfully authenticated - ", result.data)
                    console.log("token part 1 : ", atob(result.data.token.split(".")[0]))
                    console.log("token part 2 : ", atob(result.data.token.split(".")[1]))
                    navigate.push(target);
                }
            }
        )
            .catch( error => {
                setMessage( "" + error);
            })
    }

    const handleChange = (e) => {
         setLoginData({...loginData, [e.target.id] : e.target.value});
    }


    return(
        <div className="login">
            <h1>Please log in</h1>
        <form onSubmit={attemptLogin} >
            <div className="input-container">
                <label htmlFor="username">Username </label>
                <input type="text" id="username" required onChange={handleChange} value={loginData.username} />

            </div>
            <div className="input-container">
                <label htmlFor="password`">Password </label>
                <input type="password" id="password" required onChange={handleChange} value={loginData.password} />

            </div>
            <div className="button-container">
                <input type="submit" />
            </div>
            {message}
        </form>
        </div>
    )
}

export default Login;
