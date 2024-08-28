import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import { UserContext } from '../../../context/UserContext';
import React, { useContext } from 'react';
import { fetchAllHUI } from "../../../services/phuiService";
import { toast } from 'react-toastify';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { fetchAllUser } from "../../../services/userService";

const ModalManageHui = (props) => {

    const { user } = useContext(UserContext)
    const [huiGroups, setHuiGroups] = useState([])

    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(text);
    }

    return (
        <>
            <Modal size="lg" show={props.show} className="modal-manage-hui" onHide={() => props.onHide()}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>{props.action === 'MANAGE' ? "Manage class" : "Error"}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body">
                        <div className='col-12 col-sm-6 form-control'>
                            <span>Select member to this class:</span>
                            <div className='my-3'>
                                <form className="d-flex" role="search" onSubmit={handleSubmit}>
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={text} onChange={handleChange}/>
                                    <button className="btn btn-success" type="submit"><FaMagnifyingGlass /></button>
                                </form>                                
                            </div>
                            <button className="btn btn-warning mb-3" type="submit">Add</button>

                            <div className='add-member'>
                                <table className='table table-bordered table-hover'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>Friend list</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <>
                                            <tr>
                                                <td>Not found user</td>
                                            </tr>
                                        </>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <label>Class Belong To: {user.account.username}</label>
                </Modal.Footer>
            </Modal >
        </>
    )
}
export default ModalManageHui 