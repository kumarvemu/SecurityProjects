import './Transactions.css';
import {useState, useEffect} from 'react';
import {getAllPaymentsForCountry, getAllPaymentsForOrderId, getCountries} from '../../../data/DataFunctions';
import TransactionTableRow from "./TransactionTableRow";
import {useHistory, useParams, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";

const Transactions = (props) => {

    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);

    const [countryOptions, setCountryOptions] = useState([]);
    const [uniqueCountries, setUniqueCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const [selectedOrder, setSelectedOrder] = useState("");

    const history = useHistory();
    const loginData = useSelector(state => state)

    const loadCountries = () =>  {
        getCountries(loginData)
            .then(response => {
                const allCountries = response.data;
                setUniqueCountries(allCountries);
                setCountryOptions(allCountries.map(c => <option key={c} value={c}>{c}</option>));
            })
            .catch(error => {
                console.log("something went wrong", error);
            });
    }

    const loadTransactionsForSelectedCountry = () => {
        getAllPaymentsForCountry(loginData, selectedCountry)
            .then(response => {
                setLoading(false);
                setPayments(response.data);
            })
            .catch(error => {
                console.log("something went wrong", error);
            });
    };

    const params = useParams();
    const desiredOrder = params.orderId != null ? params.orderId : props.searchTerm;
    if (desiredOrder !== selectedOrder) {
        setSelectedOrder(desiredOrder);
    }

    const urlCountry = new URLSearchParams(useLocation().search).get("country");
    if (urlCountry !== selectedCountry) {
        setLoading(true);
        setSelectedCountry(urlCountry);
    }

    const loadTransactionsForSelectedOrder = () => {
        setCountryOptions([]);
        setPayments([]);

         getAllPaymentsForOrderId(loginData, selectedOrder)
            .then(response => {
                setLoading(false);
                setPayments(response.data);
            })
            .catch(error => {
                console.log("something went wrong", error);
            });
    };

    if(loading && selectedOrder === "") {
        loadTransactionsForSelectedCountry();
    }

    useEffect(() => {

        if (selectedOrder > 0 ) {
            setPayments([]);
            setLoading(true);
            loadTransactionsForSelectedOrder();
        }else {
            setPayments([]);
            loadCountries();
        }
    }, [selectedOrder]);

    const changeCountry = (e) => {
        const option = e.target.options.selectedIndex - 1;
        setLoading(true);
        setSelectedCountry(uniqueCountries[option]);
        history.push(`/find?country=${uniqueCountries[option]}`);
    }

    const countrySelector = <select id="countrySelector" onChange={changeCountry} defaultValue="xxx">
        <option key="xxx" value="xxx" disabled={true} >--select--</option>
        {countryOptions}
    </select>;

    return (
        <div>
            {countryOptions.length === 0 && selectedOrder === "" && <p className="loadingMessage">The data is loading please wait...</p>}

            {countryOptions.length > 0 && <div className="transactionsCountrySelector">
                Select country: {countrySelector}
                    </div>
            }

            {loading && <p className="loadingMessage">The data is loading please wait...</p>}

            {!loading && payments.length > 0 &&
                <div>

                    <table className="transactionsTable">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Order Id</th>
                            <th>Date</th>
                            <th>Country</th>
                            <th>Currency</th>
                            <th>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {payments.map(payment => TransactionTableRow(payment))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
        ;
}

export default Transactions
