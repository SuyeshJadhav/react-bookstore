import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout.js';
import axios from 'axios';
import { Checkbox } from 'antd'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart.js';
import { toast } from 'react-toastify';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();


  //get all category
  const getAllCategory = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
    if (data?.success) {
      setCategories(data?.category);
    }
  }

  useEffect(() => {
    getAllCategory();
  }, [])

  //get all products
  const getAllProducts = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
    setProducts(data.products);
  }

  useEffect(() => {
    if (!checked.length) getAllProducts();
  }, [checked.length])

  useEffect(() => {
    if (checked.length) filterProduct();
    // eslint-disable-next-line
  }, [checked.length])

  //filter by genre
  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter(c => c !== id)
    }
    setChecked(all);
  }

  //get filtered products
  const filterProduct = async () => {
    const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, { checked });
    setProducts(data?.products);
  }

  return (
    <Layout title={"Home │ BookStore"}>
      <div className="row mt-3 mb-4">
        <div className="col-md-2" style={{ paddingLeft: "5%", paddingTop: "18px" }}>
          <h4 style={{ marginTop: "10px", marginBottom: "25px" }}>Filter by Genre</h4>
          {categories?.map((c) => (
            <div className='d-flex flex-row px-2 mt-1 mx-1' key={c._id}>
              <Checkbox onChange={(e) => handleFilter(e.target.checked, c._id)} style={{ fontSize: "medium" }}>
                {c.name}
              </Checkbox>
            </div>
          ))}
          <div className="d-flex flex-column">
            <button className=' btn btn-sm moreDetailBtn mt-4' style={{ marginRight: "50px", fontSize: "15px" }} onClick={() => { window.location.reload() }}>clear filters</button>
          </div>
        </div>
        <div className="col-md-10" style={{ paddingTop: "15px" }}>
          <h1 className='text-center fw-bold' >All Products</h1>
          <div className="grid-container text-center">
            {products?.map((p) => (
              <div className="card-container p-2" key={p._id}>
                <div className="card" style={{ backgroundColor: "#EEEEEE" }}>
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{ height: "250px"} }
                    key={p._id}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{p.name}</h5>
                    <h6 className="card-title" style={{ color: "grey" }}>by {p.author}</h6>
                    <p className="card-text mt-4">{p.description.substring(0, 35)}...</p>
                    <p className="card-text mt-4 fw-bold">₹{p.price}</p>
                    <button className="btn btn-sm m-1 mt-1 moreDetailBtn" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                    <button className="btn btn-sm m-1 mt-1 addToCartBtn" onClick={() => { setCart([...cart, p]); localStorage.setItem('cart', JSON.stringify([...cart, p])); toast.success('Item added to cart'); }}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage