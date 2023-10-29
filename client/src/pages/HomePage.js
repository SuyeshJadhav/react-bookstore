import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout.js';
import { useAuth } from '../context/auth.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Checkbox } from 'antd'

const HomePage = (props) => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);


  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCategory();
  }, [])

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, [])

  //filter by genre
  const handleFilter = (value, id) => {
    let all = [...checked]
    if(value){
      all.push(id)
    } else {
      all = all.filter(c => c !== id)
    }
    setChecked(all);
  }


  return (
    <Layout title={"Home │ BookStore"}>
      <div className="row mt-3" style={{ overflowX: "hidden" }}>
        <div className="col-md-2">
          <h3 className='text-center'>Filters</h3>
          <h6>Genre</h6>
          {categories?.map(c => (
            <div className="d-flex flex-column">
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            </div>
          ))}
        </div>
        <div className="col-md-10">
          {JSON.stringify(checked,null,4)}
          <h1 className='text-center'>All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link to={`/dashboard/admin/product/${p.slug}`} key={p._id} className='product-link'>
                <div className="card m-2" style={{ width: "20rem", height: "370px" }}>
                  <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} style={{ height: "200px" }} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                    <button href="#" class="btn btn-sm m-1 mt-4">More Details</button>
                    <button href="#" class="btn btn-sm m-1 mt-4">Add to Cart</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default HomePage