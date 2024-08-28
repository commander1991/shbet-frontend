import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModalDeleteHUI = (props) => {
    return (
        <>
            <Modal show = {props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete HUI</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete HUI: {props.dataModalhui.id} ?</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant='primary' onClick={props.confirmDeleteHUI}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default ModalDeleteHUI 