import "./ModalChangePassword.scss";
import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { changePassword } from '../../services/userService';
import { UserContext } from '../../context/UserContext';
import { logoutUser } from '../../services/userService';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModalChangePassword = (props) => {
    const { user, logoutContext } = useContext(UserContext)
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    let history = useHistory();

    const handleChangePassword = async () => {
        if (checkNewPassword()) {
            let userData = {
                username: user.account.username,
                newPass
            }
            await changePassword(userData)
            alert("Đổi mật khẩu thành công, vui lòng đăng nhập lại");
            handleLogout();
        }
    }

    const handleLogout = async () => {
        let data = await logoutUser() // clear cookies
        localStorage.removeItem('jwt') // clear local storage
        logoutContext() // clear user in context

        if (data && +data.EC === 0) {
            toast.success("Log out succeeds...")
            history.push('/')
        } else {
            toast.error(data.EM)
        }
    }

    const checkNewPassword = () => {
        if (newPass === '') {
            toast.error("Vui lòng nhập mật khẩu mới");
            return false;
        }
        if (newPass.length < 6) {
            toast.error("Mật khẩu phải chứa ít nhất 6 ký tự");
            return false;
        }
        if (newPass !== confirmPass) {
            toast.error("Mật khẩu xác nhận không khớp");
            return false;
        }
        return true;
    }

    const showPassword = () => {
        let x = document.getElementById("password1");
        let y = document.getElementById("password2");
        if (x.type === "password") {
            x.type = "text";
            y.type = "text";
        } else {
            x.type = "password";
            y.type = "password";
        }
    }

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Đổi mật khẩu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-input">
                        <p>Tài khoản: {user.account.username}</p>
                        <label>Mật khẩu mới</label>
                        <input type="password"
                            id="password1"
                            className="form-control"
                            placeholder="New Password"
                            value={newPass}
                            onChange={(event) => { setNewPass(event.target.value) }} />
                    </div>
                    <div className="form-input">
                        <label>Xác nhận mật khẩu mới</label>
                        <input type="password"
                            id="password2"
                            className="form-control"
                            placeholder="Confirm Password"
                            value={confirmPass}
                            onChange={(event) => { setConfirmPass(event.target.value) }} />
                    </div>
                    <div className='showPass'>
                        <input type='checkbox' onClick={() => showPassword()} />
                        <span className='ms-2'>Hiển thị mật khẩu</span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={() => handleChangePassword()}>
                        Xác nhận đổi mật khẩu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalChangePassword