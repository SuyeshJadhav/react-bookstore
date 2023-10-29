import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-toastify';
import axios from 'axios';
import CategoryFrom from '../../components/Form/CategoryFrom';
import { Modal } from 'antd'

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    //handle from
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${[process.env.REACT_APP_API]}/api/v1/category/create-category`, { name })
            if (data?.success) {
                toast.success(`${name} category is created`);
                getAllCategory();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('something went wrong in input form')
        }
    }

    //handle update
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, {name: updatedName})
            if(data.success){
                toast.success(`${updatedName} is updated`)
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            // console.log(error);
            toast.error('Something went wrong')
        }
    }

    //handle delete
    const handleDelete = async (pid) => {
        try {
            const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pid}`)
            if(data.success){
                toast.success(`category is deleted`)
                getAllCategory();
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            // console.log(error);
            toast.error('Something went wrong')
        }
    }

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in getting category')
        }
    }

    useEffect(() => {
        getAllCategory();
    }, [])

    return (

        <Layout title={"Dashboard │ Create Category"}>
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Manage Category</h1>
                        <div className="p-3 w-50">
                            <CategoryFrom handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <div className='w-75'>
                            <table className="table" style={{backgroundColor: "#545b61", color: "white"}}>
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map(c => (
                                        <>
                                            <tr className='tableCategory'>
                                                <td key={c._id} style={{paddingRight: "100px"}}>{c.name}</td>
                                                <td>
                                                    <button className='btn btn-sm editBtn ms-2 shadow-none' onClick={() => {setVisible(true); setUpdatedName(c.name); setSelected(c)}}>Edit</button>
                                                    <button className='btn btn-sm delBtn ms-2 shadow-none' onClick={() => {handleDelete(c._id)}}>Delete</button>
                                                </td>
                                            </tr >
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal onCancel={() => setVisible(false)} footer={null} visible={visible} style={{paddingTop: "50px"}}>
                            <div className='modalTable'>
                                <CategoryFrom value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory