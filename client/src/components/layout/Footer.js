import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className='footer'>
      <h4 className='text-light text-center'>BookStore</h4>
      <p className="text-center mt-3">
        <Link to='/'>Home</Link>
        <span className='text-light'> | </span>
        <Link to='/contact'>Contact Us</Link>
        <span className='text-light'> | </span>
        <Link to='/about'>About Us</Link>
      </p>
    </div>
  )
}

export default Footer