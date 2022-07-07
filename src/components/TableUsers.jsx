import React from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { fetchAllUsers } from '../services/UserService'
import ReactPaginate from 'react-paginate';
// import axios from 'axios';
import { useEffect, useState } from 'react'
import ModalAddNew from './ModalAddNew';

const TableUsers = () => {

    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const getUsers = async (page) => {
        let res = await fetchAllUsers(page);

        if (res && res.data) {
            setListUsers(res.data)
            setTotalUsers(res.total)
            setTotalPages(res.total_pages)
            console.log(res)
        }

    }
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const handleClose = () => {
        setIsShowModalAddNew(false);
    }

    const handleUpdateTable = (user)=>{
        setListUsers([user,...listUsers]);
    }
    useEffect(() => {
        //call APIs
        getUsers(1);
    }, [])

    const handlePageClick = (event) => {
        // getUsers(1);
        getUsers(event.selected + 1);
    }
    return (
        <Container>
            <div className="my-3 add-new" >
                <span><b>Table Users:</b></span>
                <button className="btn btn-success"
                    onClick={() => setIsShowModalAddNew(true)}
                >Add new user</button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
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
        </Container>
    );
};

export default TableUsers;