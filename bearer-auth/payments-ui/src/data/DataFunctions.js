import axios from 'axios';
import {getBearerAuthHeader} from "./LoginDataFunctions";

export const getAllPaymentsForCountry = (jwtToken, country) => {
    const authHeader = getBearerAuthHeader(jwtToken)
    const transactionsPromise = axios({url : `http://localhost:8080/api/payment?country=${country}`,
        method: "GET", headers : {...authHeader, 'Accept': 'application/json'} });
    return transactionsPromise;
}

export const getAllPaymentsForOrderId = (jwtToken, orderId) => {
    const authHeader = getBearerAuthHeader(jwtToken)
    const transactionsPromise = axios({url : `http://localhost:8080/api/payment?order=${orderId}`,
        method: "GET", headers : {...authHeader, 'Accept': 'application/json'} });
    return transactionsPromise;
}

export const getCountries = (jwtToken) => {
    const authHeader = getBearerAuthHeader(jwtToken)
    return axios({url : "http://localhost:8080/api/countries", method: "GET",
        headers : {...authHeader, 'Accept': 'application/json'} });
}

export const addNewTransaction = (jwtToken, payment) => {
    const authHeader = getBearerAuthHeader(jwtToken)
    return axios({url : "http://localhost:8080/api/payment",
        method: "POST",
        headers : {...authHeader, 'Accept': 'application/json', 'Content-Type' : 'application/json'},
        data: payment});
}
