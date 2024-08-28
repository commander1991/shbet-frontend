import { useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { registerNewUser } from '../src/services/userService';
import { UserContext } from '../src/context/UserContext'
import { FaUser, FaKey, FaPhone } from "react-icons/fa6";

const Register = (props) => {
    const { user } = useContext(UserContext)

    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const defaultValidInput = {
        isValidUserName: true,
        isValidPhone: true,
        isValidPassword: true,
        IsValidConfirmPass: true
    }
    const [objCheckInput, setObjectCheckInput] = useState(defaultValidInput);

    let history = useHistory();
    const goToLogin = () => {
        history.push("/")
    }

    useEffect(() => {
        if (user && user.isAuthenticated) {
            history.push('/')
        }
    }, [])

    const isValidInputs = () => {

        setObjectCheckInput(defaultValidInput);

        if (!username) {
            toast.error("Chưa điền người dùng!")
            console.log("check before: ", { ...defaultValidInput })
            console.log("check after: ", { ...defaultValidInput, isValidUserName: false })
            setObjectCheckInput({ ...defaultValidInput, isValidUserName: false });
            return false;
        }
        if (!phone) {
            toast.error("Chưa điền điện thoại!")
            console.log("check before: ", { ...defaultValidInput })
            console.log("check after: ", { ...defaultValidInput, isValidPhone: false })
            setObjectCheckInput({ ...defaultValidInput, isValidPhone: false });
            return false;
        }
        if (!password) {
            toast.error("Chưa điền mật khẩu!")
            console.log("check before: ", { ...defaultValidInput })
            console.log("check after: ", { ...defaultValidInput, isValidPassword: false })
            setObjectCheckInput({ ...defaultValidInput, isValidPassword: false });
            return false;
        }
        if (password !== confirmPass) {
            toast.error("Mật khẩu không trùng nhau!")
            console.log("check before: ", { ...defaultValidInput })
            console.log("check after: ", { ...defaultValidInput, IsValidConfirmPass: false })
            setObjectCheckInput({ ...defaultValidInput, IsValidConfirmPass: false });
            return false;
        }
        return true
    }

    const handleRegister = async () => {

        let check = isValidInputs();
        if (check === true) {
            let serverData = await registerNewUser(username, phone, password)
            if (+serverData.EC === 0) {
                toast.success(serverData.EM);
                history.push("/")
            } else {
                toast.error(serverData.EM);
            }
        }
    }

    return (
        <div className='login-register-container'>
            <div className='wrapper active-popup'>
                <div className='form-box register'>
                    <h2>Đăng kí</h2>
                    <form action='#'>
                        <div className='input-box'>
                            <span className='icon'>
                                <FaUser />
                            </span>
                            <input type='text' required
                                value={username} onChange={(event) => setUsername(event.target.value)}
                            />
                            <label>Tên người dùng</label>
                        </div>
                        <div className='input-box'>
                            <span className='icon'>
                                <FaPhone />
                            </span>
                            <input type='text' required
                                value={phone} onChange={(event) => setPhone(event.target.value)}
                            />
                            <label>Điện thoại</label>
                        </div>
                        <div className='input-box'>
                            <span className='icon'>
                                <FaKey />
                            </span>
                            <input type='password' required
                                value={password} onChange={(event) => setPassword(event.target.value)}
                            />
                            <label>Mật khẩu</label>
                        </div>
                        <div className='input-box'>
                            <input type='password' required
                                value={confirmPass} onChange={(event) => setConfirmPass(event.target.value)}
                            />
                            <label>Xác nhận mật khẩu</label>
                        </div >
                        <div className="d-grid gap-2">
                            <button className='btn btn-lg btn-dark' onClick={() => handleRegister()} type='button'>
                                Đăng kí</button>
                        </div>
                        <div className='login-register'>
                            <a href='' onClick={() => goToLogin()}>
                                Đã có tài khoản! Đăng nhập</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;