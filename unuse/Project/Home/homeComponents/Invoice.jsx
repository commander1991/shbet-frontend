// InvoiceModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const handleSendData = () => {
    alert("Gửi thành công")
}

const InvoiceModal = ({ invoiceData, handleClose }) => {
    return (
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Invoice</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='my-4'>Quyên góp: {invoiceData.gem}</div>
                <div className='my-4'>Mã số viên đá: {invoiceData.boxes}</div>
                <div className='my-4'>Vùng miền: {invoiceData.region}</div>
                <div className='my-4'>Tỉnh: {invoiceData.area}</div>
                <div className='my-4'>Donate: {invoiceData.donateAmount}</div>
                <div className='my-4'>Tổng: {invoiceData.total}</div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Huỷ
                </Button>
                <Button variant="primary" onClick={handleSendData}>
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default InvoiceModal;
