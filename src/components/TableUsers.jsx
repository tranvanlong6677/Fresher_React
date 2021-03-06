import React from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { fetchAllUsers } from '../services/UserService';
import ReactPaginate from 'react-paginate';
// import axios from 'axios';
import { useEffect, useState } from 'react';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm';
import _ from 'lodash';
import './TableUser.scss'
import {debounce} from "lodash"

const TableUsers = () => {

    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);

    const [dataUserEdit, setDataUserEdit] = useState({});
    const [dataUserDelete, setDataUserDelete] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);

    const [sortBy,setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id")

    const getUsers = async (page) => {
        let res = await fetchAllUsers(page);

        if (res && res.data) {
            setListUsers(res.data)
            setTotalUsers(res.total)
            setTotalPages(res.total_pages)
            // console.log(res)
        }

    }

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }

    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers]);
    }

    const handleEditUser = (user) => {
        // console.log(user);
        setDataUserEdit(user);
        setIsShowModalEdit(true);

    }

    const handleEditUserFromModal = (user) => {
        let index = listUsers.findIndex(item => item.id === user.id);
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers[index].first_name = user.first_name;
        setListUsers(cloneListUsers);

        // console.log("listUSers:",listUsers)
        // console.log("clone: ",cloneListUsers)
        // console.log("user:",user)
        // console.log("index: ",index);

    }

    const handleDeleteUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = cloneListUsers.filter(item => item.id !== user.id)
        setListUsers(cloneListUsers);
        console.log(cloneListUsers);
    }

    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true);
        setDataUserDelete(user);
        console.log(user)
    }

    const handleSort =(sortBy,sortField)=> {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = _.orderBy(cloneListUsers,[sortField],[sortBy])
        // console.log(cloneListUsers);
        setListUsers(cloneListUsers);
    }

    useEffect(() => {
        //call APIs
        setListUsers()
        getUsers(1);
    }, [])

    const handlePageClick = (event) => {
        // getUsers(1);
        getUsers(event.selected + 1);
    }

    const handleSearch = debounce((event) => {
        console.log(event.target.value);
        let data = event.target.value;
        if(data){
            let cloneListUsers = _.cloneDeep(listUsers);
            cloneListUsers = cloneListUsers.filter(item=>item.email.includes(data))
            // cloneListUsers = _.includes(cloneListUsers,[sortField],[sortBy])
            setListUsers(cloneListUsers);
        }else{
            getUsers(1);
        }
    },1500)
    return (
        <Container>
            <div className="my-3 add-new" >
                <span><b>Table Users:</b></span>
                <button className="btn btn-success"
                    onClick={() => setIsShowModalAddNew(true)}
                >Add new user</button>
            </div>

            <div className="col-4 mb-3">
                <input 
                    className="form-control" 
                    placeholder="Search user by email..." 
                    onChange={(event)=>handleSearch(event)}
                >
                </input>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            <div className="sort-header">
                                <span>ID</span>
                                <span>
                                    <i 
                                        className="fa-solid fa-arrow-down-long"
                                        onClick={()=>handleSort("desc","id")}
                                    >

                                    </i>
                                    <i 
                                        className="fa-solid fa-arrow-up-long"
                                        onClick={()=>handleSort("asc","id")}
                                    ></i>
                                </span>
                            </div>
                        </th>
                        <th>
                            <div className="sort-header">
                                <span>First Name</span>
                                <span>
                                    <i 
                                        className="fa-solid fa-arrow-down-long"
                                        onClick={()=>handleSort("desc","first_name")}
                                    >

                                    </i>
                                    <i 
                                        className="fa-solid fa-arrow-up-long"
                                        onClick={()=>handleSort("asc","first_name")}
                                    ></i>
                                </span>
                            </div>
                        </th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`#${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning mx-3"
                                            onClick={() => handleEditUser(item)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger "
                                            onClick={() => handleDeleteUser(item)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
                
            </Table>
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />

            <ModalAddNew
                show={isShowModalAddNew}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
            />

            <ModalEditUser
                dataUserEdit={dataUserEdit}
                show={isShowModalEdit}
                handleEditUser={handleEditUser}
                handleClose={handleClose}
                handleEditUserFromModal={handleEditUserFromModal}
            />
            <ModalConfirm
                show={isShowModalDelete}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
            />

        </Container>
    );
};

export default TableUsers;