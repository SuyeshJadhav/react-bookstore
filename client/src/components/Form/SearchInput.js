import React from 'react'
import { useSearch } from '../../context/search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmitButton = async (e) => {
        e.preventDefault();
        if (values.keyword) {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`);
            if (data.length > 0) {
                setValues({ ...values, results: data });
                navigate("/search");
            }
        }
    }

    return (
        <div>
            <form className="d-flex" style={{ paddingLeft: "10px" }} role="search" onSubmit={handleSubmitButton}>
                <input className="form-control me-2" type="search" style={{ width: "300px" }} placeholder="Search" aria-label="Search" value={values.keyword} onChange={(e) => setValues({ ...values, keyword: e.target.value })} />
                <button className="btn btn-outline-success border-none shadow-none">Search</button>
            </form>
        </div>
    )
}

export default SearchInput