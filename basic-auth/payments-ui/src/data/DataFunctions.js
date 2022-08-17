import axios from 'axios';
import {getAuthHeader} from "./LoginDataFunctions";

export const getAllPaymentsForCountry = (loginData, country) => {
    const authHeader = getAuthHeader(loginData)
    const transactionsPromise = axios({url : `http://localhost:8080/api/payment?country=${country}`,
        method: "GET", headers : {...authHeader, 'Accept': 'application/json'} });
    return transactionsPromise;
}

export const getAllPaymentsForOrderId = (loginData, orderId) => {
    const authHeader = getAuthHeader(loginData)
    const transactionsPromise = axios({url : `http://localhost:8080/api/payment?order=${orderId}`,
        method: "GET", headers : {...authHeader, 'Accept': 'application/json'} });
    return transactionsPromise;
}

export const getCountries = (loginData) => {
    const authHeader = getAuthHeader(loginData)
    return axios({url : "http://localhost:8080/api/countries", method: "GET",
        headers : {...authHeader, 'Accept': 'application/json'} });
}

export const addNewTransaction = (loginData, payment) => {
    const authHeader = getAuthHeader(loginData)
    return axios({url : "http://localhost:8080/api/payment",
        method: "POST",
        headers : {...authHeader, 'Accept': 'application/json', 'Content-Type' : 'application/json'},
        data: payment});
}
