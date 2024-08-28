import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../src/services/userService';
import { UserContext } from '../src/context/UserContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser, faEye, faKey
} from "@fortawesome/free-solid-svg-icons";

const Login = (props) => {
    const { user, loginContext } = useContext(UserContext)
    let history = useHistory();

    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        if (!valueLogin) {
            toast.error("Please enter user")
            return false;
        }
        if (!password) {
            toast.error("Please enter password")
            return false;
        }
        let response = await loginUser(valueLogin, password);
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

    const handlePressEnter = (event) => {
        if (event.charCode === 13 && event.code === "Enter") {
            handleLogin();
        }
    }

    useEffect(() => {
        if (user && user.isAuthenticated) {
            history.push('/home')
        }
    }, [])
    const goToRegister = () => {
        history.push("/register")
    }

    const terms = () => {
        return (
            alert(
                "Bằng cách đăng ký, bạn đồng ý với Điều khoản, Chính sách dữ liệu và Chính sách cookie của chúng tôi."
            )
        )
    }

    const showPassword = () => {
        let x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    return (
        <div className='login-register-container'>
            <div className='wrapper active-popup'>
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
                        <label>Tên người dùng</label>

                    </div>
                    <div className='input-box'>
                        <span className='icon'>
                            <div className='key'>
                                <FontAwesomeIcon icon={faKey} />
                            </div>
                        </span>
                        <input type='password' required id='password'
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
                            onKeyPress={(event) => handlePressEnter(event)}
                        />
                        <label>Mật khẩu</label>
                    </div>
                    <div className='showPass'>
                        <input type='checkbox' onClick={() => showPassword()} />
                        <span className='ms-2'>Hiển thị mật khẩu</span>
                    </div>
                    <div className='remember-forgot my-3'>
                        <a href='/forget-password'>Quên mật khẩu</a>
                    </div>
                    <div className='remember-forgot my-3'>
                        <a href='' onClick={() => terms()}>Điều khoản sử dụng</a>
                    </div>
                    <div className="d-grid gap-2 login-register">
                        <button className='btn btn-lg btn-dark' onClick={() => handleLogin()} type='submit'>Đăng nhập</button>
                    </div>
                    <div className='login-register '>
                        <a href='' onClick={() => goToRegister()}>
                            Đăng ký</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;