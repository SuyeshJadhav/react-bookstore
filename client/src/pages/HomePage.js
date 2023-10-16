import React from 'react'
import Layout from '../components/Layout/Layout.js';
import { useAuth } from '../context/auth.js';

const HomePage = (props) => {
  const [auth, setAuth] = useAuth();

  return (
    <Layout>
      <h1>HomePage</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  )
}

export default HomePage