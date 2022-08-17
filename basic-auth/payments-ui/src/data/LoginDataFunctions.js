import axios from "axios";

export const getAuthHeader = (loginData) => {
    return {'Authorization' : 'Basic ' + btoa(`${loginData.username}:${loginData.password}`)}
}

export const login = (loginData) => {
    console.log(getAuthHeader(loginData));
    return axios({url : "http://localhost:8080/api/login", method: "POST",
        headers : {...getAuthHeader(loginData),  'Accept': 'application/json', 'Content-Type' : 'application/json'},
            data: loginData});
}
