import React from 'react'
import Header from './Header.js'
import Footer from './Footer.js'

const Layout = (props) => {
  return (
    <div>
        <Header/>
        {props.children}
        <Footer/>
    </div>
  )
}

export default Layout