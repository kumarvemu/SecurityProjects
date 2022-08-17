import {useState, Fragment} from "react";
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
        setMessage("");
        e.preventDefault();
        login(loginData).then (
            result => {
                if (result.status === 200) {
                    dispatch({
                        type: "login", value:
                            {...loginData, ...result.data}
                    })
                    navigate.push(target);
                }
                else {
                    setMessage("something went wrong " + result.status)
                }
            }
        )
            .catch(error => {
                if (error.toString().endsWith("401")) {
                   setMessage("Invalid username and password entered")
                }
                else {
                    setMessage("error " + error)
                }
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
            <p>{message}</p>
        </form>
        </div>
    )
}

export default Login;
