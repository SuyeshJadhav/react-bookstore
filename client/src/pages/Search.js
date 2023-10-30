import React from 'react'
import Layout from './../components/Layout/Layout'
import { useSearch } from '../context/search'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'

const Search = () => {
    const [values] = useSearch();
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    return (
        <Layout title={'Search results'}>
            <div className="container-fluid p-4">
                <div className="text-center">
                    <h2>Search results</h2>
                    <h6>{values?.results.length < 1 ? 'No Products Found' : `Found: ${values?.results.length}`}</h6>
                    <div className="d-flex flex-wrap mx-4">
                        {values?.results.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className='card-img-top' alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">{p.name}</h5>
                                    <h6 className="card-title" style={{ color: "grey" }}>by {p.author}</h6>
                                    <p className="card-text mt-4">{p.description.substring(0, 35)}...</p>
                                    <p className="card-text mt-4 fw-bold">₹{p.price}</p>
                                    <button className="btn btn-sm m-1 mt-1 moreDetailBtn" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                    <button className="btn btn-sm m-1 mt-1 addToCartBtn" onClick={() => { setCart([...cart, p]); localStorage.setItem('cart', JSON.stringify([...cart, p])); toast.success('Item added to cart'); }}>Add to Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search