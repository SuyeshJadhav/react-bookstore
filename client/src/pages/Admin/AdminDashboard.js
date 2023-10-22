import React from 'react'
import Layout from "../../components/Layout/Layout"
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard"}>
      <div className="container-fluid p-3 mx-3">
        <div className="row">
          <div className="col-md-3"><AdminMenu/></div>
          <div className="col-md-9">
            <div className="card p-2">
              <h4 className='text fw-normal'>Admin Name: {auth?.user?.name}</h4>
              <h4 className='text fw-normal'>Admin Email: {auth?.user?.email}</h4>
              <h4 className='text fw-normal'>Admin Phone: {auth?.user?.phone}</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard