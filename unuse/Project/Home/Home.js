import React, { useEffect, useState } from "react"
import './Home.scss'
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGem, faTableList, faChartLine, faClock, faClockRotateLeft, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { format } from 'date-fns';
import ModalPurchase2x from "./homeComponents/ModalPurchase2x"
import ModalPurchase3x from "./homeComponents/ModalPurchase3x"
import HLGame from "./homeComponents/HLGame"
import { Button } from "react-bootstrap";

const HomePage = (props) => {
    return (
        <div className="container">
            <div className="innerBar">
            </div>
            <HLGame />
            <div className="mb-5"></div>
        </div>
    )
}
export default HomePage