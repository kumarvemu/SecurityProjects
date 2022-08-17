import React from 'react';

import Search from "./Search/Search"
import Transactions from "./Transactions/Transactions";
import {useState} from "react";
import {useHistory} from 'react-router-dom';

const FindTransactionPage = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const history = useHistory();

    const applySearchTerm = (searchTerm) => {
        setSearchTerm(searchTerm);
        history.push(`/find/${searchTerm}`);
    }

    return (
        <div>
                <Search setSearchTerm={applySearchTerm} />
                <Transactions searchTerm={searchTerm} />
        </div>
    );
}

export default FindTransactionPage;
