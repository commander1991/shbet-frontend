import React, { useState, useEffect } from "react";
import { fetchAllHUI, deleteHUI } from "../../../services/phuiService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDeleteHUI from "./ModalDeleteHUI";
import ModalCreateHUI from "./ModalCreateHUI";
import ModalManageHUI from "./ModalManageHUI"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBuilding, faTrashCan, faCirclePlus, faUserPlus
} from "@fortawesome/free-solid-svg-icons";

const Phui_Prop = (props) => {
    const [listHUIs, setListHUIs] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(9)
    const [totalPages, setTotalPages] = useState(0)

    //modal delete
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [dataModalhui, setDataModalhui] = useState({})

    //modal update/create hui
    const [isShowModalHUI, setIsShowModalHUI] = useState(false)
    const [actionModalHUI, setActionModalHUI] = useState("CREATE")
    const [dataModalHUI, setDataModalHUI] = useState({})

    //modal manage hui
    const [isShowModalManageHUI, setIsShowModalManageHUI] = useState(false)
    const [actionModalManageHUI, setActionModalManageHUI] = useState("MANAGE")
    const [dataModalManageHUI, setDataModalManageHUI] = useState({})

    useEffect(() => {
        fetchHUIs();
    }, [currentPage])

    const fetchHUIs = async () => {
        let response = await fetchAllHUI(currentPage, currentLimit);
        if (response && +response.EC === 0) {
            setTotalPages(response.DT.totalPages);
            setListHUIs(response.DT.huis);
        }
    }

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    }

    const handleManageHUI = async (event) => {
        setIsShowModalManageHUI(true)
        setActionModalManageHUI("MANAGE")
    }

    const onHideModalManageHUI = async () => {
        setIsShowModalManageHUI(false)
        setDataModalManageHUI({})
        await fetchHUIs()
    }

    const handleDeleteHUI = async (huiId) => {
        setDataModalhui(huiId);
        setIsShowModalDelete(true);
    }

    const handleClose = () => {
        setIsShowModalDelete(false);
        setDataModalHUI({});
    }

    const confirmDeleteHUI = async () => {
        let response = await deleteHUI(dataModalhui);
        if (response && +response.EC === 0) {
            toast.success(response.EM);
            await fetchHUIs();
            setIsShowModalDelete(false);
        } else {
            toast.error(response.EM)
        }
    }

    const onHideModalHUI = async () => {
        setIsShowModalHUI(false)
        setDataModalhui({})
        await fetchHUIs()
    }

    const handleRefresh = async () => {
        await fetchHUIs()
    }
    return (
        <>
            <div className="container">
                <div className="manager-hui-container">
                    <div className="hui-header">
                        <div className="title mt-3">
                            <h3>Quản lý hụi: <i className="fa fa-refresh refresh"
                                onClick={() => handleRefresh()}></i></h3>
                        </div>
                        <div className="actions my-3">
                            <div className="row">
                                <div className="col-sm-3">
                                    <button className="btn btn-primary"
                                        onClick={() => {
                                            setIsShowModalHUI(true)
                                            setActionModalHUI("CREATE")
                                        }}><FontAwesomeIcon icon={faCirclePlus} /> Thêm mới dây hụi</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hui-body">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Tên dây hụi</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listHUIs && listHUIs.length > 0 ?
                                    <>
                                        {listHUIs.map((item, index) => {
                                            return (
                                                <tr key={`row-${index}`}>
                                                    <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                    <td>{item.huiName}</td>
                                                    <td>
                                                        <button className="btn btn-success mx-3"
                                                            onClick={() => handleManageHUI()}
                                                        ><FontAwesomeIcon icon={faBuilding} /> Class</button>
                                                        <button className="btn btn-warning mx-3"
                                                            onClick={() => handleManageHUI()}
                                                        ><FontAwesomeIcon icon={faUserPlus} /> Member</button>
                                                        <button className="btn btn-danger mx-3"
                                                            onClick={() => handleDeleteHUI(item.huiId)}
                                                        ><FontAwesomeIcon icon={faTrashCan} /> Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                    :
                                    <>
                                        <tr>
                                            <td>You have not created HUI yet!!!</td>
                                        </tr>
                                    </>
                                }
                            </tbody>
                        </table>
                    </div>
                    {totalPages > 0 &&
                        <div className="hui-footer">
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
            <ModalDeleteHUI
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteHUI={confirmDeleteHUI}
                dataModalhui={dataModalhui}
            />
            <ModalCreateHUI
                onHide={onHideModalHUI}
                show={isShowModalHUI}
                action={actionModalHUI}
                dataModalHUI={dataModalHUI}
            />
            <ModalManageHUI
                onHide={onHideModalManageHUI}
                show={isShowModalManageHUI}
                action={actionModalManageHUI}
                dataModalManageHUI={dataModalManageHUI}
            />
        </>
    )
}

export default Phui_Prop;