import axios from "axios";

export const getBasicAuthHeader = (username, password) => {
    return {'Authorization' : 'Basic ' + btoa(`${username}:${password}`)}
}

export const getBearerAuthHeader = (jwtToken) => {
    return {'Authorization' : 'Bearer ' + jwtToken}
}

export const login = (username,password) => {
    return axios({url : "http://localhost:8080/api/login", method: "POST",
        headers : {...getBasicAuthHeader(username,password),  'Accept': 'application/json', 'Content-Type' : 'application/json'},
            data: {}});
}
