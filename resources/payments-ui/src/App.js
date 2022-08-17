import './App.css';

import {BrowserRouter, Switch, Route} from "react-router-dom";
import PageHeader from "./components/pageHeader/PageHeader";
import HomePage from "./components/HomePage/HomePage";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Login from "./components/UserManagement/Login";
import {createStore} from "redux";
import {defaultLoginData, loginReducer} from "./store/LoginReducer";
import {Provider} from "react-redux";
import AddTransactionPage from "./components/AddTransactionPage/AddTransactionPage";
import FindTransactionPage from "./components/FindTransactionPage/FindTransactionPage";

function App() {

    const userLoginStore = createStore(loginReducer, defaultLoginData);

    return (
        <Provider store={userLoginStore}>
            <BrowserRouter>
                <PageHeader/>
                <Switch>
                    <Route path="/login">
                        <Login targetLocation="/"/>
                    </Route>

                    <Route path = "/add" >
                        <AddTransactionPage />
                    </Route>
                    <Route path = {["/find/:orderId", "/find"]}>
                        <FindTransactionPage /></Route>

                    <Route exact path="/">
                        <HomePage/>
                    </Route>
                    <Route>
                        <PageNotFound/>
                    </Route>

                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
