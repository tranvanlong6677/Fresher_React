import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { postCreateUser } from '../services/UserService'
import { toast } from 'react-toastify';

const ModalEditUser = (props) => {
    const { show, handleClose, handleUpdateTable,dataUserEdit,setDataUserEdit } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");
    const handleEditUser = () => {
        
    }

    useEffect(()=>{
        if(show){
            setName(dataUserEdit.first_name)
        }
    },[dataUserEdit])
    console.log("Check data: " ,dataUserEdit);
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit A User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='body-add-new'>
                    <div>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Job</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Job"
                                    value={job}
                                    onChange={(event) => setJob(event.target.value)}
                                />
                            </Form.Group>

                        </Form>
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose()}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleEditUser(name, job)}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalEditUser;

