import React from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { fetchAllUsers } from '../services/UserService'
import axios from 'axios';
import { useEffect,useState } from 'react'
const TableUsers = () => {
    const [listUsers,setListUsers] = useState([]);
    useEffect(() => {
        //call APIs
        getUsers();
    }, [])

    const getUsers = async () => {
        let res = await fetchAllUsers();
        if(res&&res.data&&res.data.data){
            setListUsers(res.data.data)
        }
        console.log(res)
        
    }
    return (
        <Container>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        {/* <th>Username</th> */}
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item,index) => {
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
        </Container>
    );
};

export default TableUsers;