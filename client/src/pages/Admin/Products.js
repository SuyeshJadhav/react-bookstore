import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([])

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
      setProducts(data.products)
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, [])

  return (
    <Layout title={"Products | BookStore"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 mt-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 mt-3">
            <h1 className='text-center'>All Products</h1>
            <div className="grid-container">
              {products?.map((p) => (
                <Link to={`/dashboard/admin/product/${p.slug}`} key={p._id} className='product-link p-2'>
                  <div className="card-container" style={{ backgroundColor: "#EEEEEE" }}>
                    <div className="card">
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        style={{ height: "250px" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title fw-bold">{p.name}</h5>
                        <h6 className="card-title" style={{ color: "grey" }}>by {p.author}</h6>
                        <p className="card-text">{p.description.substring(0, 30)}...</p>
                        <p className="card-text mt-4 fw-bold">₹{p.price}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Products