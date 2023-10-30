import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/cart'
import {toast} from 'react-toastify';

const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState({})
    const [cart, setCart] = useCart();
    //initalp detaails
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug])

    //get products
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <div className="row container-fluid mt-4">
                <div className="col-md-6 text-center" style={{ marginTop: "9vh" }}>
                    <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                        style={{ height: '250px', width: "23rem", }}
                    />
                </div>
                <div className="col-md-6">
                    <h1 className='mb-4 fw-bold'>Product Details</h1>
                    <h5 >Name: {product.name}</h5>
                    <h5>Author: {product.author}</h5>
                    <h5>Description: {product.description}</h5>
                    <h5>Genre: {product.category?.name}</h5>
                    <h5 className='mb-4'>Price: ₹{product.price}</h5>
                    <button className="btn btn-sm mt-4 moreDetailBtn" onClick={() => { setCart([...cart, product]); localStorage.setItem('cart', JSON.stringify([...cart, product])); toast.success('Item added to cart'); }}>Add to Cart</button>

                </div>
            </div>
        </Layout>

    )
}

export default ProductDetails