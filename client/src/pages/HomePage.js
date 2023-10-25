import React from 'react'
import Layout from '../components/Layout/Layout.js';
import { useAuth } from '../context/auth.js';

const HomePage = (props) => {
  const [auth] = useAuth();

  return (
    <Layout title={"Home │ BookStore"}>
      <h1>HomePage</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  )
}

export default HomePage