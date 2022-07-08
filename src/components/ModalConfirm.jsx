import React from 'react';
import { Modal, Button,Form } from 'react-bootstrap'

const ModalConfirm = (props) => {
    const { show, handleClose,dataUserDelete } = props;
    const confirmDelete = ()=>{

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
                                <br/>
                                Are you sure to delete this user,
                                <br/>
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

