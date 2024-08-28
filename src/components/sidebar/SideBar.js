import React, { useContext, useState } from 'react';
import './SideBar.scss';
import { useLocation, Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';
import { logoutUser } from '../../services/userService';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBell, faCircleDollarToSlot,
    faMoneyBill, faListCheck, faScroll,
    faBuilding, faLock, faList,
    faRightFromBracket, faUserClock,
    faChartLine, faUsersGear, faMoneyBillTransfer
} from "@fortawesome/free-solid-svg-icons";
import ModalChangePassword from '../ModalChangePassword/ModalChangePassword';

const NavHeader = (props) => {
    const { user, logoutContext, loginContext } = useContext(UserContext)
    const history = useHistory()

    //modal ChangePassword
    const [isShowModalChangePassword, setIsShowModalChangePassword] = useState(false)
    const [dataModal, setDataModal] = useState('')

    //show modal transfer
    const [isShowModalTrans, setIsShowModalTrans] = useState(false)
    const [dataModalTrans, setDataModalTrans] = useState('')

    const handleChangePasswordUser = () => {
        setDataModal(user.account.username);
        setIsShowModalChangePassword(true);
    }

    const handleClose = () => {
        setIsShowModalChangePassword(false)
        setDataModal('')
    }

    const handleLogout = async () => {
        let data = await logoutUser() // clear cookies
        localStorage.removeItem('jwt') // clear local storage
        logoutContext() // clear user in context

        if (data && +data.EC === 0) {
            toast.success("Log out succeeds...")
            handleClose()
            history.push('/')
        } else {
            toast.error(data.EM)
        }
    }

    if ((user && user.isAuthenticated) === true && user.account.groupWithRoles.id === 1) {
        return (
            <div className='sidebar'>
                <div className='top'>
                    <img
                        src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt=""
                        className="avatar"
                    />
                    <div className='logo'>
                        <span className='name'>Welcome {user.account.username}</span>
                        <span className='desc'>{user.account.groupWithRoles.description}</span>
                        <div className='walletIcon'>
                            <FontAwesomeIcon icon={faMoneyBill} className='iconSide' />
                            <span className='topNumber ms-2'>{user.account.point}</span>

                            <FontAwesomeIcon icon={faCircleDollarToSlot} className='iconSide mx-2' />
                            <span className='topNumber'>{user.account.pointLock}</span>
                        </div>
                    </div>
                </div>
                <div className='center'>
                    <ul>
                        <p className="title">Admin Dashboard</p>
                        <li>
                            <Link to="/home" className="sidebarLink">
                                <FontAwesomeIcon icon={faBuilding} className='iconSide' />
                                <span>Chính</span>
                            </Link>
                        </li>
                        <p className="title">Manage</p>
                        {/* <li >
                            <Link to="/hui" className="sidebarLink">
                                <FontAwesomeIcon icon={faList} className='iconSide' />
                                <span>Hụi</span>
                            </Link>
                        </li> */}
                        <li >
                            <Link to="/transaction" className="sidebarLink">
                                <FontAwesomeIcon icon={faMoneyBillTransfer} className='iconSide' />
                                <span>Quyên góp</span>
                            </Link>
                        </li>
                        <li >
                            <Link to="/users" className="sidebarLink">
                                <FontAwesomeIcon icon={faUsersGear} className='iconSide' />
                                <span>Người dùng</span>
                            </Link>
                        </li>
                        <li >
                            <Link to="/roles" className="sidebarLink">
                                <FontAwesomeIcon icon={faListCheck} className='iconSide' />
                                <span>Phân quyền link</span>
                            </Link>
                        </li>
                        <li >
                            <Link to="/group-role" className="sidebarLink">
                                <FontAwesomeIcon icon={faScroll} className='iconSide' />
                                <span>Phân quyền nhóm</span>
                            </Link>
                        </li>
                        <p className="title">Useful</p>
                        <li>
                            <FontAwesomeIcon icon={faChartLine} className='iconSide' />
                            <span>Số liệu thống kê</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faBell} className='iconSide' />
                            <span>Thông báo</span>
                        </li>

                        <p className="title">Service</p>
                        <li>
                            <FontAwesomeIcon icon={faUserClock} className='iconSide' />
                            <span>Lịch sử hoạt động</span>
                        </li>
                        <p className="title">User</p>
                        <li>
                            <FontAwesomeIcon icon={faRightFromBracket} className='iconSide' />
                            <span onClick={() => handleLogout()}>Đăng xuất</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    } else {
        return (
            <div className='sidebar'>
                <div className='top'>
                    <img
                        src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt=""
                        className="avatar"                        
                    />
                    <div className='logo'>
                        <span className='name'>Welcome {user.account.username}</span>
                        <span className='desc'>{user.account.groupWithRoles.description}</span>
                        <div className='walletIcon'>
                            <FontAwesomeIcon icon={faMoneyBill} className='iconSide'/>
                            <span className='topNumber ms-2'>{user.account.point}</span>
                            <FontAwesomeIcon icon={faCircleDollarToSlot} className='iconSide mx-2' />
                            <span className='topNumber'>{user.account.pointLock}</span>
                        </div>
                    </div>
                </div>
                <div className='center'>
                    <ul>
                        <p className="title">Main</p>
                        <li>
                            <Link to="/home" className="sidebarLink">
                                <FontAwesomeIcon icon={faBuilding} className='iconSide' />
                                <span>Trang chủ</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/hui" className="sidebarLink">
                                <FontAwesomeIcon icon={faList} className='iconSide' />
                                <span>Quản lý hụi</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/transaction" className="sidebarLink">
                                <FontAwesomeIcon icon={faMoneyBillTransfer} className='iconSide' />
                                <span>Quyên góp</span>
                            </Link>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faChartLine} className='iconSide' />
                            <span>Số liệu thống kê</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faUserClock} className='iconSide' />
                            <span>Lịch sử hoạt động</span>
                        </li>
                        <p className="title">User</p>
                        <li>
                            <FontAwesomeIcon icon={faLock} className='iconSide' />
                            <span onClick={() => handleChangePasswordUser()}>Đổi mật khẩu</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faRightFromBracket} className='iconSide' />
                            <span onClick={() => handleLogout()}>Đăng xuất</span>
                        </li>
                    </ul>
                </div>
                <ModalChangePassword
                    show={isShowModalChangePassword}
                    handleClose={handleClose}
                    dataModal={dataModal}
                />
            </div>
        )
    }
}
export default NavHeader;
