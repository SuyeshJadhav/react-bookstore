import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import { useCart } from '../context/cart'
import { useNavigate } from 'react-router-dom'


const CartPage = () => {
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();


    //total price
    const totalPrice = () => {
        try {
            let total = 0
            cart?.map((item) => { total = total + item.price })
            return total.toLocaleString('en-US', {
                style: "currency",
                currency: 'INR'
            });
        } catch (error) {
            console.log(error);
        }
    }
    //delete item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <div className="container p-4" style={{}}>
                <div className="row">
                    <div className="col-md-12">
                        <h1 className='text-center mt-4 fw-bold'>
                            Hello {auth?.token && auth?.user?.name}
                        </h1>
                        <h4 className='text-center'>
                            {cart?.length > 1 ? `You have ${cart.length} items in your cart. ${auth?.token ? "" : "Please login to Checkout. "}` : "Your cart is empty. "}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-7">
                        {
                            cart?.map(p => (
                                <div className="row card d-flex flex-row mt-2 mb-2">
                                    <div className="col-md-7">
                                        <img
                                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top mt-4 mb-4 mx-2"
                                            alt={p.name}
                                            style={{ height: "250px", width: "23rem" }}
                                            key={p._id}
                                        />
                                    </div>
                                    <div className="col-md-5 mt-3" style={{ paddingTop: "15px" }}>
                                        <p className='mt-1 mb-3 mx-2' style={{ fontWeight: "bold" }}>{p.name} by {p.author}</p>
                                        <p className='mt-1 mb-3 mx-2'>Genre: {p.category?.name}</p>
                                        <p className='mt-1 mb-3 mx-2'>{p.description.substring(0, 40)}...</p>
                                        <p className='mt-1 mt-4 mb-3 mx-2' style={{ paddingTop: "35px", fontWeight: "bold" }}>Price: ₹{p.price}</p>
                                        <button className='btn btn-sm delBtn mx-2' onClick={() => removeCartItem(p._id)}>remove</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {cart?.length >= 1 &&
                        <div className="col-md-5" style={{ paddingLeft: "25px" }}>
                            <h4>Cart Summary</h4>
                            <hr />
                            <h5>Total: {totalPrice()}</h5>
                        </div>
                    }
                </div>
            </div>
        </Layout>
    )
}

export default CartPage