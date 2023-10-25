import { React, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/auth';
import '../index.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogClick = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password });
            if (res && res.data.message === "Login Successful") {
                toast.success("Login Successfully");
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(location.state ||'/');
            }
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error('Something went wrong!');
        }
    }

    return (
        <Layout title='Login │ BookStore'>
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "77vh", flexDirection: "column", }}><span style={{ fontFamily: 'Roboto', fontSize: '25px', fontWeight: 'bolder' }}>Login</span>
                <form className='container mt-3 col-lg-3'>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" id='email' value={email} onChange={(e) => { setEmail(e.target.value) }} autoComplete='off' className="form-control shadow-none" required placeholder='Enter Email' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pass" className="form-label">Password</label>
                        <input type="password" id='pass' value={password} onChange={(e) => { setPassword(e.target.value) }} autoComplete='off' className="form-control shadow-none" required placeholder='Enter Password' />
                    </div>
                    <button type="button" onClick={handleLogClick} className="btn shadow-none">Login</button>
                </form>
            </div>
        </Layout>
    )
}

export default Login