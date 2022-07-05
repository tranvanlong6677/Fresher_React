import React from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { fetchAllUsers } from '../services/UserService'
import ReactPaginate from 'react-paginate';
// import axios from 'axios';
import { useEffect, useState } from 'react'
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
        </Container>
    );
};

export default TableUsers;