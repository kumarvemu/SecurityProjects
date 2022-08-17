import './Search.css';
import {useState} from "react";

const Search = (props) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [valid, setValid] = useState(true);

    const doSearch = (event) => {
        event.preventDefault();
        if (valid) {
            props.setSearchTerm(searchTerm);
        }
    }

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        setValid (event.target.value.trim().length > 0);
    }

    const resetSearch = () => {
        setSearchTerm("");
    }

    return (
        <div className="searchBox">
            <form onSubmit={doSearch}>
            <label htmlFor="orderId">Order Id:</label>
            <input id="orderId" type="text" value={searchTerm} onChange={handleChange} className={!valid ? 'searchBoxError' : ''} />
            <button type="submit" disabled={!valid} >Search</button>
                <button onClick={resetSearch}>Reset</button>
            </form>
        </div>
    );
}

export default Search
