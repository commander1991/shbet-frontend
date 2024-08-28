import "./ModalPuchase2x.scss"
import React, { useContext, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { UserContext } from '../../../../context/UserContext'
import { useHistory } from 'react-router-dom'
import InvoiceModal from './Invoice';

const ModalPuchase2x = () => {
    const [inputValue, setInputValue] = useState('');
    const [boxes, setBoxes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState([]);
    const [selectedArea, setSelectedArea] = useState([]);
    const [donateAmount, setDonateAmount] = useState('');
    const [confirmTradeWithJadeite, setConfirmTradeWithJadeite] = useState(1)
    const values = Array.from({ length: 100 }, (_, i) => i < 10 ? `0${i}` : `${i}`);
    const [showModalInvoice, setShowModalInvoice] = useState(false);
    const [invoiceData, setInvoiceData] = useState(null);

    const { user, logoutContext } = useContext(UserContext)
    const history = useHistory()

    const handleConfirmTradeWithJade = (event) => {
        const { checked } = event.target;
        setConfirmTradeWithJadeite(checked ? 1 : 0)
    }

    const handleChange = (event) => {
        const { value } = event.target;
        if (!isNaN(value) && value.length === 2) {
            if (boxes.length >= 10) {
                toast.error("Không được chọn quá 10 viên đá");
            } else if (boxes.includes(value)) {
                toast.error("Viên đá này đã được chọn");
            } else {
                setBoxes([...boxes, value]);
            }
            setInputValue('');
        } else {
            setInputValue(value);
        }
    }

    const handleBoxClick = (index) => {
        const removedBox = boxes[index];
        const updatedBoxes = boxes.filter((box, i) => i !== index);
        setBoxes(updatedBoxes);
        toast.success(`Đã xoá viên đá số ${removedBox}`);
    }

    const handleModalClose = () => {
        setBoxes([])
        setShowModal(false)
        setDonateAmount('')
        setSelectedRegion([])
        setSelectedArea([])
        setShowModalInvoice(false);
        setInvoiceData(null);
    }

    const handleRegion = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            setSelectedRegion([...selectedRegion, value]);
        } else {
            const updatedRegion = selectedRegion.filter((region) => region !== value);
            setSelectedRegion(updatedRegion);
        }
    }

    const handleArea = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedArea([...selectedArea, value])
        } else {
            const updatedArea = selectedArea.filter((area) => area !== value)
            setSelectedArea(updatedArea)
        }
    }

    const handleDonateAmountChange = (event) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value)) {
            setDonateAmount(value);
        } else {
            setDonateAmount('');
        }

    }

    const calculateTotalDonation = () => {
        const totalBoxes = boxes.length;
        const donationPerArea = parseInt(donateAmount)
        const totalSelectedRegion = selectedRegion.length
        const totalSelectedAreas = selectedArea.length; // Sửa thành selectedArea.length
        return totalBoxes * donationPerArea * totalSelectedRegion * totalSelectedAreas;
    }

    const checkValidateInput = () => {
        if (boxes.length < 1 || selectedRegion.length < 1 || selectedArea < 1 || donateAmount < 15) {
            return false;
        }
        return true;
    }

    const handleCellClick = (value) => {
        setBoxes([...boxes, value]);
        setShowModal(true);
    }

    const handleConfirmPurchase = () => {
        
            setShowModalInvoice(true);
            const data = {
                gem: confirmTradeWithJadeite,
                boxes: boxes,
                region: selectedRegion,
                area: selectedArea,
                donateAmount: donateAmount,
                total: calculateTotalDonation()
            };
            setInvoiceData(data);
        
        console.log("ok")
    }

    return (
        <div>
            <div>Chọn nhiều viên đá bấm vào đây: </div>
            <input type="text" value={inputValue} onChange={handleChange} />
            <div className="boxes">
                {boxes.map((box, index) => (
                    <div key={index} className="box me-3" onClick={() => handleBoxClick(index)}>
                        {box}
                    </div>
                ))}
            </div>
            <Button onClick={() => setShowModal(true)}>Mua đá 2x</Button>
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin quyên góp đỗ thạch</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Check
                            inline
                            label="Xác nhận giao dịch có đỗ thạch"
                            name="confirmTradeWithJade"
                            type="checkbox"
                            id="confirmJade"
                            checked={confirmTradeWithJadeite === 1}
                            value="1"
                            onChange={handleConfirmTradeWithJade}
                        />
                    </Form>
                    <div>Danh sách các viên đá đã chọn:</div>
                    <div className="boxes">
                        {boxes.map((box, index) => (
                            <div key={index} className="box me-3">
                                {box}
                            </div>
                        ))}
                    </div>
                    <div>Chọn vùng miền:</div>
                    <Form>
                        <Form.Check
                            inline
                            label="Miền Nam"
                            name="region"
                            type="checkbox"
                            id="region-south"
                            value="south"
                            onChange={handleRegion}
                        />
                        <Form.Check
                            inline
                            label="Miền Trung"
                            name="region"
                            type="checkbox"
                            id="region-central"
                            value="central"
                            onChange={handleRegion}
                        />
                        <Form.Check
                            inline
                            label="Miền Bắc"
                            name="region"
                            type="checkbox"
                            id="region-north"
                            value="north"
                            onChange={handleRegion}
                        />
                    </Form>
                    <div>Chọn khu vực:</div>
                    <Form>
                        <Form.Check
                            inline
                            label="A"
                            name="area"
                            type="checkbox"
                            id="area-a"
                            value="a"
                            onChange={handleArea}
                        />
                        <Form.Check
                            inline
                            label="B"
                            name="area"
                            type="checkbox"
                            id="area-b"
                            value="b"
                            onChange={handleArea}
                        />
                        <Form.Check
                            inline
                            label="C"
                            name="area"
                            type="checkbox"
                            id="area-c"
                            value="c"
                            onChange={handleArea}
                        />
                        <Form.Check
                            inline
                            label="D"
                            name="area"
                            type="checkbox"
                            id="area-d"
                            value="d"
                            onChange={handleArea}
                        />
                    </Form>
                    <div>Quyên góp(xây dựng cộng đồng Jadeite):</div>
                    <div>(Tối thiểu 15)</div>
                    <input type="text" value={donateAmount} onChange={handleDonateAmountChange} />                    
                    <div>Tổng số tiền quyên góp: {calculateTotalDonation()}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleConfirmPurchase}>
                        Xác nhận quyên góp
                    </Button>
                    {invoiceData && <InvoiceModal invoiceData={invoiceData} handleClose={handleModalClose} />}
                </Modal.Footer>
            </Modal>

            <table className="table table-bordered table-hover">
                <tbody>
                    {Array.from({ length: 10 }, (_, rowIndex) => (
                        <tr key={rowIndex}>
                            {Array.from({ length: 10 }, (_, colIndex) => (
                                <td key={colIndex} onClick={() => handleCellClick(values[rowIndex * 10 + colIndex])}>
                                    <span className='box'>{values[rowIndex * 10 + colIndex]}</span>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ModalPuchase2x;