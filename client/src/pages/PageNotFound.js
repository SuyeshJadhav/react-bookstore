import React from 'react'
import Layout from '../components/Layout/Layout.js';
import { Link } from 'react-router-dom';

const PageNotFound = (props) => {
  return (
    <Layout>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops ! Page Not Found</h2>
        <Link to="/" className="pnf-btn">
          Go Back
        </Link>
      </div>
    </Layout>
  )
}

export default PageNotFound