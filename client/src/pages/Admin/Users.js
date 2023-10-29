import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

const Users = () => {
    return (
        <Layout title={"Dashboard │ All Users"}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 mt-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Users</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Users