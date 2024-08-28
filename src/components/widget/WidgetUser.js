import "./Widget.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleArrowUp, faUser, faWallet,
    faCartShopping, faFilterCircleDollar,
    faCircleArrowDown
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const Widget = ({ type }) => {
    let data;
    //temporary

    const [oders, setOrders] = useState(0);
    const [earnings, setEarnings] = useState(0);
    const [balance, setBalance] = useState(0);

    const [odersPercent, setOrdersPercent] = useState(0);
    const [earningsPercent, setEarningsPercent] = useState(0);
    const [balancePercent, setBalancePercent] = useState(0);

    const diff = 20;

    switch (type) {
        case "order":
            data = {
                title: "ORDERS",
                isMoney: false,
                link: "View all orders",
                icon: (
                    <FontAwesomeIcon icon={faCartShopping}
                        className="icon"
                        style={{
                            backgroundColor: "rgba(218, 165, 32, 0.2)",
                            color: "goldenrod",
                        }}
                    />
                ),
            };
            break;
        case "earning":
            data = {
                title: "EARNINGS",
                isMoney: true,
                link: "View net earnings",
                icon: (
                    <FontAwesomeIcon icon={faFilterCircleDollar}
                        className="icon"
                        style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
                    />
                ),
            };
            break;
        case "balance":
            data = {
                title: "BALANCE",
                isMoney: true,
                link: "See details",
                icon: (
                    <FontAwesomeIcon icon={faWallet}
                        className="icon"
                        style={{
                            backgroundColor: "rgba(128, 0, 128, 0.2)",
                            color: "purple",
                        }}
                    />
                ),
            };
            break;
        default:
            break;
    }

    return (
        <div className="widget">
            <div className="left">
                <span className="title">
                    {data.title === "ORDERS"
                        ? 'Dây hụi đã tham gia'
                        : data.title === "EARNINGS"
                            ? 'Thu nhập'
                            : data.title === "BALANCE"
                                ? 'Số dư'
                                : ""}
                </span>
                {data.title === "ORDERS"
                    ?
                    <>
                        <span>{data.isMoney && "$"} {oders}
                        </span>
                        <a href="link">{data.link}</a>
                    </>
                    : data.title === "EARNINGS"
                        ?
                        <>
                            <span>{data.isMoney && "$"} {earnings}
                            </span>
                            <a href="link">{data.link}</a>
                        </>
                        :
                        <>
                            <span>{data.isMoney && "$"} {balance}
                            </span>
                            <a href="link">{data.link}</a>
                        </>
                }
            </div>
            <div className="right">
                {data.title === "ORDERS"
                    ?
                    <>
                        <div className="percentage negative">
                            <FontAwesomeIcon icon={faCircleArrowDown} />{diff} % - 7 ngày
                        </div>
                        <div className="icon" onClick={() => console.log(2)}>{data.icon}</div>
                    </>
                    : data.title === "EARNINGS"
                        ?
                        <>
                            <div className="percentage positive">
                                <FontAwesomeIcon icon={faCircleArrowUp} />{diff} % - 7 ngày
                            </div>
                            <div className="icon" onClick={() => console.log(3)}>{data.icon}</div>
                        </>
                        :
                        <>
                            <div className="percentage negative">
                                <FontAwesomeIcon icon={faCircleArrowDown} />{diff} % - 7 ngày
                            </div>
                            <div className="icon" onClick={() => console.log(4)}>{data.icon}</div>
                        </>
                }
            </div>
        </div >
    );
};

export default Widget;