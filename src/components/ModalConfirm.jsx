import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap'
import { deleteUser } from '../services/UserService'
import { toast } from 'react-toastify'

const ModalConfirm = (props) => {
    const { show, handleClose, dataUserDelete, handleDeleteUserFromModal } = props;
    const confirmDelete = async () => {
        let res = await deleteUser(dataUserDelete.id);
        console.log("check res: ", res);
        if (res && +res.statusCode === 204) {
            toast.success("Delete user successfully!");
            handleDeleteUserFromModal(dataUserDelete);
            handleClose();
        } else {
            toast.error("Error delete user");
        }
    }
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete This User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='body-add-new'>
                    <div>
                        <Form>
                            <span>
                                This action can't be undone!
                                <br />
                                Are you sure to delete this user,
                                <br />
                                <b>email={dataUserDelete.email} ?</b>
                            </span>



                        </Form>
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose()}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => confirmDelete()}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalConfirm;

