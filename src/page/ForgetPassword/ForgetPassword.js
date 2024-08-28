import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPhone
} from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const ForgetPassword = () => {
    const [sdt, setSdt] = useState("");
    let history = useHistory();

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

    return (
        <>
            <div className='login-register-container'>
                <div className='wrapper active-popup'>
                    <div className='form-box login'>
                        <h2>Quên mật khẩu</h2>
                        <h6>Lưu ý: Mật khẩu mới sẽ được gửi về số điện thoại đã đăng ký</h6>
                        <div className='input-box'>
                        <span className='icon'>
                        <FontAwesomeIcon icon={faPhone}/>
                        </span>
                        <input type='text' required
                            value={sdt}
                            onChange={(event) => { setSdt(event.target.value) }}
                        />
                        <label>Số điện thoại</label>
                    </div>
                    <div className="d-grid gap-2 login-register">
                        <button className='btn btn-lg btn-info' onClick={() => checkSdt()} type='submit'>Xác nhận</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgetPassword;