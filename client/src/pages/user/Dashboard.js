import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'

const Dashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout title={'Dashboard | Bookstore'}>
            <div className="constainer-fluid p-3 mx-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card w-75 p-3">
                            <h4 className='text fw-normal'>Name: {auth?.user?.name}</h4>
                            <h4 className='text fw-normal'>Email: {auth?.user?.email}</h4>
                            <h4 className='text fw-normal'>Address: {auth?.user?.address}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard