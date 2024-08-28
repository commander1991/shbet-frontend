import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../../context/UserContext';
import './Users.scss';
import { fetchAllUser, deleteUser, getUserAccount } from "../../services/userService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
import ModalChangePassword from "./ModalChangePass";
import Sidebar from "../sidebar/SideBar";
import Navbar from "../navbar/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPen, faArrowsRotate
} from "@fortawesome/free-solid-svg-icons";

const Users = (props) => {
    const { userAmin } = useContext(UserContext)

    const [listUsers, setListUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(10)
    const [totalPages, setTotalPages] = useState(0)

    //modal change password user
    const [isShowModalChangePassword, setIsShowModalChangePassword] = useState(false)

    //modal delete
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [dataModal, setDataModal] = useState({})

    //modal update/create user
    const [isShowModalUser, setIsShowModalUser] = useState(false)
    const [actionModalUser, setActionModalUser] = useState("CREATE")
    const [dataModalUser, setDataModalUser] = useState({})

    useEffect(() => {
        fetchUsers();
    }, [currentPage])

    const fetchUsers = async () => {
        let response = await fetchAllUser(currentPage, currentLimit);
        if (response && +response.EC === 0) {
            setTotalPages(response.DT.totalPages);
            setListUsers(response.DT.users);
        }
    }

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    }

    const handleDeleteUser = async (userId) => {
        setDataModal(userId);
        setIsShowModalDelete(true);
    }

    const handleClose = () => {
        setIsShowModalDelete(false);
        setDataModal({});
    }

    const confirmDeleteUser = async () => {
        let response = await deleteUser(dataModal);
        if (response && +response.EC === 0) {
            toast.success(response.EM);
            await fetchUsers();
            setIsShowModalDelete(false);
        } else {
            toast.error(response.EM)
        }
    }

    const onHideModalUser = async () => {
        setIsShowModalUser(false)
        setDataModal({})
        await fetchUsers()
    }

    const onHideModalChangePassword = async () => {
        setIsShowModalChangePassword(false)
        setDataModal({})
        await fetchUsers()
    }

    const handleEditUser = (user) => {
        setActionModalUser("UPDATE")
        setDataModalUser(user);
        setIsShowModalUser(true);
    }

    const handleChangePasswordUser = (user) => {
        setActionModalUser("CHANGE_PASSWORD")
        setDataModalUser(user);
        setIsShowModalChangePassword(true);
    }

    const handleRefresh = async () => {
        alert("Refresh data")
        await fetchUsers()
    }
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="container">
                    <div className="manager-users-container">
                        <div className="user-header">
                            <div className="title mt-3">
                                <h3>Manage Users: <FontAwesomeIcon icon={faArrowsRotate} onClick={() => handleRefresh()} className="fa"/>
                                </h3>
                            </div>
                            <button className="btn btn-warning"
                                onClick={() => handleChangePasswordUser(userAmin)}
                            ><FontAwesomeIcon icon={faPen} /> Change password Admin</button>
                            <div className="actions my-3">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <button className="btn btn-primary"
                                            onClick={() => {
                                                setIsShowModalUser(true)
                                                setActionModalUser("CREATE")
                                            }}><i className="fa fa-plus-circle"></i> Add new user</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="user-body">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">ID</th>
                                        <th scope="col">Group ID</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Actions</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listUsers && listUsers.length > 0 ?
                                        <>
                                            {listUsers.map((item, index) => {
                                                return (
                                                    <tr key={`row-${index}`}>
                                                        <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                        <td>{item.id}</td>
                                                        <td>{item.Group.name}</td>
                                                        <td>{item.username}</td>
                                                        <td>
                                                            <button className="btn btn-warning mx-3"
                                                                onClick={() => handleEditUser(item)}
                                                            ><i className="fa fa-pencil"></i> Edit</button>

                                                            <button className="btn btn-danger mx-3"
                                                                onClick={() => handleDeleteUser(item)}
                                                            ><i className="fa fa-trash-o"></i> Delete</button>
                                                        </td>
                                                        <td onClick={() => console.log(item.status)}>{item.status === 1 ? "Available" : "Disable"}</td>
                                                    </tr>
                                                )
                                            })}
                                        </>
                                        :
                                        <>
                                            <tr>
                                                <td>Not found user</td>
                                            </tr>
                                        </>
                                    }
                                </tbody>
                            </table>
                        </div>
                        {totalPages > 0 &&
                            <div className="user-footer">
                                <ReactPaginate
                                    nextLabel="next >"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={4}
                                    pageCount={totalPages}
                                    previousLable="< Previous"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakLabel="..."
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    containerClassName="pagination"
                                    activeClassName="active"
                                    renderOnZeroPageCount={null}
                                />
                            </div>
                        }
                    </div>
                </div >

                <ModalDelete
                    show={isShowModalDelete}
                    handleClose={handleClose}
                    confirmDeleteUser={confirmDeleteUser}
                    dataModal={dataModal}
                />
                <ModalUser
                    onHide={onHideModalUser}
                    show={isShowModalUser}
                    action={actionModalUser}
                    dataModalUser={dataModalUser}
                />
                <ModalChangePassword
                    handleClose={onHideModalChangePassword}
                    show={isShowModalChangePassword}
                    action={actionModalUser}
                    dataModalChangePassword={dataModalUser}
                />
            </div>
        </div>
    )
}

export default Users;