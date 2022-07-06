import React from 'react';
import { Modal, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
const ModalAddNew = (props) => {
    const { show, handleClose } = props;
    const [name,setName] = useState("");
    const [job,setJob] = useState("");
    const handleSaveUser = ()=>{
        console.log(name,job)
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New User</Modal.Title>
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
                                    onChange={(event)=>setName(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Job</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Job" 
                                    value={job}
                                    onChange={(event)=>setJob(event.target.value)}
                                />
                            </Form.Group>
                            
                        </Form>
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=>handleSaveUser()}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAddNew;

