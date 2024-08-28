import "./HuiTable.scss";
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../context/UserContext';
import { fetchAllHUI } from "../../services/phuiService";

const HuiTable = (props) => {
    const { user } = useContext(UserContext)

    const [listHuis, setListHuis] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(10)
    const [totalPages, setTotalPages] = useState(0)

    //modal show info hui
    const [isShowModalInfoHui, setIsShowModalInfoHui] = useState(false)

    useEffect(() => {
        fetchHuis();
    }, [currentPage])

    const fetchHuis = async () => {
        let response = await fetchAllHUI(currentPage, currentLimit);
        if (response && +response.EC === 0) {
            setTotalPages(response.DT.totalPages);
            setListHuis(response.DT.huis);
        }
    }

    const handleJoinHui = (huiId) => {
        console.log('Hụi viên: ',user.account.username,'đăng kí tham gia dây hụi có id là : ',huiId);
    }

    return (
        <div className="featured">
            <div className="top">
                <div className="huiTitle">
                    <h1 className="title">Các dây hụi đã tham gia</h1>
                </div>
                <br />
                <div className="huiTable">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Tên dây</th>
                                <th scope="col">Loại</th>
                                <th scope="col">Số tiền</th>
                                <th scope="col">Ngày mở</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Hành động</th>
                                <th scope="col">Chủ hụi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listHuis.map((hui, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{hui.huiName}</td>
                                    <td>{hui.huiType}</td>
                                    <td>{hui.huiValue}</td>                                    
                                    <td>{new Date(hui.huiStartDate).toLocaleDateString('en-GB')}</td>
                                    <td>5/30</td>
                                    <td>
                                        <button className="btn btn-info" onClick={() => handleJoinHui(hui.id)}>Đăng ký tham gia</button>
                                    </td>
                                    <td>{hui.huiBelongTo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HuiTable;
