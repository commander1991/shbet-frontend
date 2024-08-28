import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { createNewHUI } from "../../src/services/phuiService";
import { toast } from "react-toastify";
import _ from "lodash";
import { UserContext } from '../../src/context/UserContext';
import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid'

const ModalCreateHUI = (props) => {

    const { action, dataModalHUI } = props
    const { user } = useContext(UserContext)


    const defaultHUIData = {
        huiName: '',
        huiType: '',
        huiValue: '',
        huiStartDate: '',
        huiMember: '',
        huiNum: '',
        huiDonate: '',
        huiBelongTo: ''
    }

    const validInputsDefault = {
        huiName: true,
        huiType: true,
        huiValue: true,
        huiStartDate: true,
        huiMember: true,
        huiNum: true,
        huiDonate: true,
        huiBelongTo: true
    }

    const [huiData, setHUIData] = useState(defaultHUIData);
    const [validInputs, setValidInputs] = useState(validInputsDefault)

    const handleOnchangeInput = (value, name) => {
        let _huiData = _.cloneDeep(huiData);
        _huiData[name] = value;
        setHUIData(_huiData);
    }

    const checkValidateInputs = () => {
        //create user
        if (action === "UPDATE") return true

        setValidInputs(validInputsDefault)
        let arr = ['huiName', 'huiType', 'huiValue', 'huiStartDate', 'huiMember', 'huiNum', 'huiDonate'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!huiData[arr[i]]) {
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false;
                setValidInputs(_validInputs);

                toast.error(`Empty input ${arr[i]}`);
                check = false;
                break;
            }
        }
        return check;
    }
    const handleConfirmHUI = async () => {

        //create hui
        let check = checkValidateInputs();
        if (check === true) {
            let res = await createNewHUI({
                huiId: uuidv4(),
                ...huiData,
                huiBelongTo: user.account.username
            })

            if (res && +res.EC === 0) {
                props.onHide();
                setHUIData({
                    ...defaultHUIData,
                })
            }
            if (res && +res.EC !== 0) {
                toast.error(res.EM);
                let _validInputs = _.cloneDeep(validInputsDefault)
                _validInputs[res.DT] = false;
                setValidInputs(_validInputs);
            }
        }
    }

    const handleCloseModalHUI = () => {
        props.onHide()
        setHUIData(defaultHUIData)
        setValidInputs(validInputsDefault)
    }

    return (
        <>
            <Modal size="med" show={props.show} className="modal-hui" onHide={() => handleCloseModalHUI()}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>Tạo khách hàng mới</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body">
                        <div className='col-12 col-sm-6 form-control'>
                            <label>HUI Name (<span className="red">*</span>):</label>
                            <input disabled={action === "CREATE" ? false : true}
                                placeholder=""
                                className={validInputs.huiName ? "form-control" : "form-control is-invalid"}
                                type="text" value={huiData.huiName}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'huiName')}
                            ></input>
                            <label>HUI Type (<span className="red">*</span>) :</label>
                            <input className={validInputs.huiType ? "form-control" : "form-control is-invalid"}
                                type="number" min={0} value={huiData.huiType}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'huiType')}
                            >
                            </input>
                            <label>HUI Value (<span className="red">*</span>) :</label>
                            <input className={validInputs.huiValue ? "form-control" : "form-control is-invalid"}
                                type="number" min={0} value={huiData.huiValue}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'huiValue')}
                            ></input>
                            <label>HUI Start Date (<span className="red">*</span>) :</label>
                            <input className={validInputs.huiStartDate ? "form-control" : "form-control is-invalid"}
                                type="date" value={huiData.huiStartDate}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'huiStartDate')}
                            ></input>
                            <label>HUI Member (<span className="red">*</span>) :</label>
                            <input className={validInputs.huiMember ? "form-control" : "form-control is-invalid"}
                                type="number" min={0} value={huiData.huiMember}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'huiMember')}
                            ></input>
                            <label>HUI Number (<span className="red">*</span>) :</label>
                            <input className={validInputs.huiNum ? "form-control" : "form-control is-invalid"}
                                type="number" min={0} value={huiData.huiNum}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'huiNum')}
                            ></input>
                            <label>HUI Donation (<span className="red">*</span>) :</label>
                            <input className={validInputs.huiDonate ? "form-control" : "form-control is-invalid"}
                                type="number" min={0} value={huiData.huiDonate}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'huiDonate')}
                            ></input>
                            <label>HUI Belong To: {user.account.username}</label>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleConfirmHUI()}>
                        {action === "CREATE" ? 'Confirm' : 'Save'}
                    </Button>
                    <Button variant="secondary" onClick={() => handleCloseModalHUI()}>Close</Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}

export default ModalCreateHUI