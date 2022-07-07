import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { postCreateUser, putUpdateUser } from '../services/UserService'
import { toast } from 'react-toastify';

const ModalEditUser = (props) => {
    const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");
    const handleEditUser = async () => {
        let res = await putUpdateUser(name, job);
        if (res && res.updatedAt) {
            //Success
            handleEditUserFromModal({
                first_name: name,
                id: dataUserEdit.id
            })
            handleClose();
        }
        toast.success("Updated User");
    }



    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name)
        }
    }, [dataUserEdit])
    // console.log("Check dataUserEdit: ", dataUserEdit);
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
                <Button variant="primary" onClick={() => handleEditUser()}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalEditUser;

