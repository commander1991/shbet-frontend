import './AuthenUser.scss'
import { useState, useContext, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser, faKey, faClose,
    faPhone, faEye, faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userService';
import { UserContext } from '../../context/UserContext';
import { useHistory } from 'react-router-dom';
import { registerNewUser } from '../../services/userService';

const AuthenUser = (props) => {
    const { user, loginContext } = useContext(UserContext)
    let history = useHistory();
    const controlEnterRef = useRef(null);
    const [sdt, setSdt] = useState("");

    // set login value

    const [valueLogin, setValueLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");

    //set register value
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const [isActivePopup, setIsActivePopup] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isForgot, setIsForgot] = useState(false);
    const [ishandleEye, setHandleEye] = useState(false);

    // set menu menuOpen
    const [menuOpen, setMenuOpen] = useState(false);

    // check input register 
    const defaultValidInput = {
        isValidUserName: true,
        isValidPhone: true,
        isValidPassword: true,
        IsValidConfirmPass: true
    }

    //check phonePattern
    const checkSdt = () => {
        let phonePattern = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        console.log(sdt)
        if (sdt === "" || !phonePattern.test(sdt)) {
            toast.error("Vui lòng nhập đúng số điện thoại")
        } else {
            alert("Yêu cầu đã được gửi đến bộ phận xử lý\nQuay lại trang chủ")
            history.push('/')
        }
    }

    const [objCheckInput, setObjectCheckInput] = useState(defaultValidInput);

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


    const handleActive = () => {
        setIsActive(!isActive);
        setIsForgot(false);
    }

    const handleForgot = () => {
        setIsForgot(!isForgot);
        setIsActive(false);
    }

    const handleForgotPass = () => {
        setIsForgot(!isForgot);
        setIsActive(false);
    }

    const handleEye = () => {
        setHandleEye(!ishandleEye);
    }

    const handleLogin = async () => {

        if (!valueLogin) {
            toast.error("Please enter user")
            return false;
        }
        if (!passwordLogin) {
            toast.error("Please enter password")
            return false;
        }
        let response = await loginUser(valueLogin, passwordLogin);
        if (response && +response.EC === 0) {
            //success
            let groupWithRoles = response.DT.groupWithRoles
            let username = response.DT.username
            let userId = response.DT.userId
            let token = response.DT.access_token
            let point = response.DT.point
            let pointLock = response.DT.pointLock
            let data = {
                isAuthenticated: true,
                token,
                account: { groupWithRoles, username, userId, point, pointLock }
            }

            localStorage.setItem('jwt', token)
            loginContext(data)
            history.push('/home')
        }
        if (response && +response.EC !== 0) {
            //error
            toast.error(response.EM)
        }
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


    const terms = () => {
        return (
            alert(
                "Bằng cách đăng ký, bạn đồng ý với Điều khoản, Chính sách dữ liệu và Chính sách cookie của chúng tôi."
            )
        )
    }

    useEffect(() => {
        if (user && user.isAuthenticated) {
            history.push('/home')
        }
    }, [])

    return (
        <div className='response'>
            <div className='body'>
                <div className={`header ${menuOpen ? "activeTopbar" :""}`}>
                    <h2 className='logo'>Welcome to 1024</h2>
                    <nav className='navigation'>
                        <a href='/'>Portfolio</a>
                    </nav>                 
                </div>
                <div className={`wrapper active-popup ${isActive ? 'active' : ''} ${isForgot ? 'forgotPass' : ''}`}
                    id='controlEnter'
                    ref={controlEnterRef}>

                    <div className='form-box forgot'>
                        <h2>Quên mật khẩu</h2>
                        <p>Lưu ý: Mật khẩu mới sẽ được gửi về số điện thoại đã đăng ký</p>
                        <div className='input-box'>
                            <span className='icon'>
                                <FontAwesomeIcon icon={faPhone} />
                            </span>
                            <input type='text' required
                                value={sdt}
                                onChange={(event) => { setSdt(event.target.value) }}
                            />
                            <label>Số điện thoại</label>
                        </div>
                        <button type='submit' className='button' onClick={() => checkSdt()}>Xác nhận</button>
                        <p className='spanLink' onClick={() => handleForgotPass()}>Quay về đăng nhập</p>
                    </div>

                    <div className='form-box login'>
                        <h2>Đăng nhập</h2>

                        <div className='input-box'>
                            <span className='icon'>
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                            <input type='text' required
                                value={valueLogin}
                                onChange={(event) => { setValueLogin(event.target.value) }}
                            />
                            <label>Tên đăng nhập</label>
                        </div>
                        <div className='input-box'>
                            <span className='icon'>
                                <div className='key'>
                                    <FontAwesomeIcon icon={faKey} />
                                </div>
                            </span>
                            <input type='password' required
                                value={passwordLogin}
                                onChange={(event) => { setPasswordLogin(event.target.value) }}
                            />
                            <label>Mật khẩu</label>
                        </div>
                        <div className='remember-forgot'>
                            <label><input type='checkbox' />Ghi nhớ mật khẩu</label>
                            <span className='forgotLink' onClick={() => handleForgot()}>Quên mật khẩu</span>
                        </div>
                        <button type='submit' className='button'
                            onClick={() => handleLogin()}
                        >Đăng nhập</button>
                        <div className='login-register'>
                            <span>Chưa có tài khoản? </span><span className='spanLink' onClick={() => handleActive()}>Đăng kí</span>
                        </div>
                    </div>

                    <div className='form-box register'>
                        <h2>Đăng kí</h2>
                        <div className='input-box'>
                            <span className='icon'>
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                            <input type='text' required
                                value={username}
                                onChange={(event) => setUsername(event.target.value)} />
                            <label>Tên tài khoản</label>
                        </div>
                        <div className='input-box'>
                            <span className='icon'>
                                <FontAwesomeIcon icon={faPhone} />
                            </span>
                            <input type='text' required
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)} />
                            <label>Số đt</label>
                        </div>
                        <div className='input-box'>
                            <span className='icon' onClick={() => handleEye()}>
                                <div className='eye' >
                                    <FontAwesomeIcon icon={ishandleEye ? faEyeSlash : faEye} />
                                </div>
                            </span>
                            <input type={`${ishandleEye ? 'text' : 'password'}`} className='passinput' required
                                value={password}
                                onChange={(event) => setPassword(event.target.value)} />
                            <label>Mật khẩu</label>
                        </div>
                        <div className='input-box'>
                            <input type={`${ishandleEye ? 'text' : 'password'}`} className='passinput-confirm' required
                                value={confirmPass}
                                onChange={(event) => setConfirmPass(event.target.value)} />
                            <label>Nhập lại mật khẩu</label>
                        </div>
                        <div className='remember-forgot'>
                            <label><input type='checkbox' />
                                <span className='spanLink' onClick={() => terms()}>Tôi đồng ý điều khoản</span>
                            </label>
                        </div>
                        <button type='submit'
                            className='button'
                            onClick={() => handleRegister()}
                        >Xác nhận đăng kí</button>
                        <div className='login-register'>
                            <p>Đã có tài khoảng? <span className='spanLink' onClick={() => handleActive()}>Đăng nhập</span></p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AuthenUser
