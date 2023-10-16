import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import {toast} from 'react-toastify';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const handleLogoutClick = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    })
    localStorage.removeItem('auth');
    toast.success('Logout Successful')
  }

  return (
    <div style={{ position: 'sticky', width: '100%', top: '0', zIndex: '1', fontFamily: 'Poppins', boxShadow: '0 8px 6px -6px gray', }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" style={{ fontWeight: 'bold', fontFamily: 'Playfair Display', fontSize: '25px', lineHeight: '26px', textTransform: 'uppercase' }}>
            BookStore
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link custom-link" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link custom-link" to="/contact">Contact Us</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link custom-link" to="/about">About</NavLink>
              </li>

            </ul>
            <ul className="navbar-nav ms-auto d-flex align-items-start align-items-lg-center">
              {
                !auth.user ? (<>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      <button className='btn RegBtn border-none shadow-none' type="button">Register</button>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      <button className='btn LogBtn border-none shadow-none' type="button">Login</button>
                    </NavLink>
                  </li></>) : (<>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/login">
                        <button className='btn LogBtn border-none shadow-none' onClick={handleLogoutClick} type="button">Logout</button>
                      </NavLink>
                    </li>
                  </>)
              }
              <li className="nav-item">
                <NavLink className="nav-link align-middle custom-link" to="/cart">Cart(0)</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header;
