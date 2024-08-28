import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModalAddFriend = (props) => {
    return (
        <>
            <Modal show = {props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Add Friend</Modal.Title>
                </Modal.Header>
                <Modal.Body>Add friend: {props.dataModal.userId} ?</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant='primary' onClick={props.confirmAddFriend}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default ModalAddFriend 