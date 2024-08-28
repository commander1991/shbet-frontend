import React, { useEffect, useState } from "react"
import './Home.scss'
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGem, faTableList, faChartLine, faClock, faClockRotateLeft, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { format } from 'date-fns';
import ModalPurchase2x from "./homeComponents/ModalPurchase2x"
import ModalPurchase3x from "./homeComponents/ModalPurchase3x"

const HomePage = (props) => {
    let time = new Date().toLocaleTimeString()
    let date = new Date().toLocaleDateString()
    const [currentTime, setCurrentTime] = useState(time)
    const [currentDate, setCurrentDate] = useState(date)
    const updateTime = () => {
        let time = new Date().toLocaleTimeString()
        setCurrentTime(time)
        setTimeout(updateTime, 1000)
    }
    const updateDate = () => {
        let currentDate = new Date();
        let remainingMilliseconds = 24 * 60 * 60 * 1000 - (currentDate.getTime() % (24 * 60 * 60 * 1000));
        setTimeout(updateDate, remainingMilliseconds); // Gọi lại updateDate vào thời điểm cuối cùng của ngày
        setCurrentDate(currentDate.toLocaleDateString());
    };
    useEffect(() => {
        updateTime(); // Bắt đầu cập nhật thời gian
        updateDate(); // Bắt đầu cập nhật ngày
    }, [])
    return (
        <div className="container">
            <div className="innerBar">
                <span className="me-5">
                    <FontAwesomeIcon icon={faGem} />
                    Jadeite
                </span>
                <span className="me-5">
                    <FontAwesomeIcon icon={faTableList} />
                    Kết quả
                </span>
                <span className="me-5">
                    <FontAwesomeIcon icon={faChartLine} />
                    Thống kê
                </span>
                <span className="me-5">
                    <FontAwesomeIcon icon={faClockRotateLeft} />
                    Lịch sử
                </span>
            </div>
            <div className="dateTime">
                <FontAwesomeIcon icon={faCalendarDays} />
                <span className="clock me-5">{format(currentDate, "dd/MM/yyyy")}</span>
                <FontAwesomeIcon icon={faClock} />
                <span className="clock">{currentTime}</span>
            </div>
            <ModalPurchase3x />
            <ModalPurchase2x />            

            <div className="mb-5"></div>
        </div>
    )
}
export default HomePage