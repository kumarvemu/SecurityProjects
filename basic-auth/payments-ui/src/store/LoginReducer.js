export const defaultLoginData = {
    isLoggedIn: false,
    name : "",
    username: "",
    password : "",
    role : ""
}

export const loginReducer = (state, action) => {
    if (action.type === "login") {
        return {...action.value , isLoggedIn: true}
    }
    else if (action.type === "logout") {
        return defaultLoginData;
    }
    else { //initialization
        return defaultLoginData;
    }
}
