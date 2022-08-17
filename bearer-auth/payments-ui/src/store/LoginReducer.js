export const defaultLoginData = {
    isLoggedIn: false,
    name : "",
    token : "",
    role : ""
}

export const loginReducer = (state, action) => {
    if (action.type === "login") {

        const token = action.value.token;
        const encodedPayload = token.split(".")[1];
        const payload = JSON.parse( atob(encodedPayload));
        return {...payload, token : token , isLoggedIn: true}
    }
    else if (action.type === "logout") {
        return defaultLoginData;
    }
    else { //initialization
        return defaultLoginData;
    }
}
