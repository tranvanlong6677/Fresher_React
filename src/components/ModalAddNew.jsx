import React from 'react';
import { Modal, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { postCreateUser } from '../services/UserService'
import { toast } from 'react-toastify';

const ModalAddNew = (props) => {
    const { show, handleClose,handleUpdateTable } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");
    const handleSaveUser = async (name, job) => {
        let res = await postCreateUser(name, job);
        console.log(res);
        if (res && res.id) {
            //success
            setName("");
            setJob("");
            toast.success('Success', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            handleUpdateTable({first_name:name,id:res.id});
            handleClose();

        } else {
            //error
            toast.error("Error");
        }
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
                <Button variant="primary" onClick={() => handleSaveUser(name, job)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAddNew;

