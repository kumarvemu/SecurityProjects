import axios from 'axios';

export const getAllPaymentsForCountry = (loginData, country) => {
    const transactionsPromise = axios({url : `http://localhost:8080/api/payment?country=${country}`,
        method: "GET", headers : {'Accept': 'application/json'} });
    return transactionsPromise;
}

export const getAllPaymentsForOrderId = (loginData, orderId) => {
    const transactionsPromise = axios({url : `http://localhost:8080/api/payment?order=${orderId}`,
        method: "GET", headers : { 'Accept': 'application/json'} });
    return transactionsPromise;
}

export const getCountries = (loginData) => {
    return axios({url : "http://localhost:8080/api/countries", method: "GET",
        headers : {'Accept': 'application/json'} });
}

export const addNewTransaction = (loginData, payment) => {
    return axios({url : "http://localhost:8080/api/payment",
        method: "POST",
        headers : {'Accept': 'application/json', 'Content-Type' : 'application/json'},
        data: payment});
}
