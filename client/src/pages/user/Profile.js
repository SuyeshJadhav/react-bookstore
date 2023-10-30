import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/auth.js';
// import validator from 'validator';
import '../index.css'

const Profile = () => {
    //context
    const [auth, setAuth] = useAuth();

    //state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    //get user data
    useEffect(() => {
        const {name, email, phone, address} = auth?.user;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setAddress(address);
    }, [auth?.user])

    const handleProClick = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`, { name, email, password, phone, address });
            if(data?.error){
                toast.error(data?.error)
            }else{
                setAuth({...auth, user: data?.updatedUser})
                let ls = localStorage.getItem("auth")
                ls = JSON.parse(ls)
                ls.user = data.updatedUser
                localStorage.setItem('auth', JSON.stringify(ls));
                toast.success('Profile updated successfully')
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong!');
        }
    }

    return (
        <Layout title='User Profile │ BookStore'>
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "78vh", flexDirection: "column", }}><span style={{ fontFamily: 'Roboto', fontSize: '25px', fontWeight: 'bolder' }}>User Profile</span>
                <form className='container mt-3 col-lg-3'>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" id='name' value={name} onChange={(e) => { setName(e.target.value) }} autoComplete='off' className="form-control shadow-none"   placeholder='Enter Name' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" id='email' value={email} onChange={(e) => { setEmail(e.target.value) }} autoComplete='off' className="form-control shadow-none"   placeholder='Enter Email' disabled />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Password</label>
                        <input type="text" id='name' value={password} onChange={(e) => { setPassword(e.target.value) }} autoComplete='off' className="form-control shadow-none"   placeholder='New Password' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input type="number" id='phone' value={phone} onChange={(e) => { setPhone(e.target.value) }} autoComplete='off' className="form-control shadow-none"   placeholder='Enter Phone' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" id='address' value={address} onChange={(e) => { setAddress(e.target.value) }} autoComplete='off' className="form-control shadow-none"   placeholder='Enter Address' />
                    </div>
                    <button type="button" onClick={handleProClick} className="btn shadow-none">Update</button>
                </form>
            </div>
        </Layout>
    )
}

export default Profile