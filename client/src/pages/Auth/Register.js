import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import validator from 'validator';
import '../index.css'

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpass, setCPass] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    const handleRegClick = async () => {
        if (password === cpass && password.length >= 8) {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, { name, email, password, phone, address });
                if (res && res.data.message === "User Registered Succesfully") {
                    toast.success("Registered Successfully Please Login");
                    navigate('/login');
                }
                else if (res && res.data.message === "Already Registered please Login") {
                    toast.success("User already registered Please Login");
                }
                // else if(!validator.isEmail(email)){
                //     toast.error("Enter valid email");
                // }
                else {
                    toast.error(res.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error('Something went wrong!');
            }
        }
        else if (password.length !== 8) return toast.error('Password Size must be more than 8');
        else return toast.error('Password don\'t match');
    }

    return (
        <Layout title='Register │ BookStore'>
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "78vh", flexDirection: "column", }}><span style={{ fontFamily: 'Roboto', fontSize: '25px', fontWeight: 'bolder' }}>Register</span>
                <form className='container mt-3 col-lg-3'>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" id='name' value={name} onChange={(e) => { setName(e.target.value) }} autoComplete='off' className="form-control shadow-none" required placeholder='Enter Name' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" id='email' value={email} onChange={(e) => { setEmail(e.target.value) }} autoComplete='off' className="form-control shadow-none" required placeholder='Enter Email' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pass" className="form-label">Password</label>
                        <input type="password" id='pass' value={password} onChange={(e) => { setPassword(e.target.value) }} autoComplete='off' className="form-control shadow-none" required placeholder='Enter Password' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpass" className="form-label">Confirm Password</label>
                        <input type="password" id='cpass' value={cpass} onChange={(e) => { setCPass(e.target.value) }} autoComplete='off' className="form-control shadow-none" required placeholder='Confirm Password' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input type="number" id='phone' value={phone} onChange={(e) => { setPhone(e.target.value) }} autoComplete='off' className="form-control shadow-none" required placeholder='Enter Phone' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" id='address' value={address} onChange={(e) => { setAddress(e.target.value) }} autoComplete='off' className="form-control shadow-none" required placeholder='Enter Address' />
                    </div>
                    <button type="button" onClick={handleRegClick} className="btn shadow-none">Register</button>
                </form>
            </div>
        </Layout>
    )
}

export default Register