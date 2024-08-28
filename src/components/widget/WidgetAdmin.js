import "./Widget.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleArrowUp, faUser, faWallet,
    faCartShopping, faFilterCircleDollar,
    faCircleArrowDown
} from "@fortawesome/free-solid-svg-icons";
import { countUsers } from "../../services/userService";
import { useEffect, useState } from "react";

const Widget = ({ type }) => {
    let data;
    //temporary

    const [amount, setAmount] = useState(0);
    const [oders, setOrders] = useState(0);
    const [earnings, setEarnings] = useState(0);
    const [balance, setBalance] = useState(0);

    const [amountPercent, setAmountPercent] = useState(0);
    const [odersPercent, setOrdersPercent] = useState(0);
    const [earningsPercent, setEarningsPercent] = useState(0);
    const [balancePercent, setBalancePercent] = useState(0);

    const countUser = async () => {
        let response = await countUsers();
        if (response && +response.EC === 0) {
            setAmount(response.DT);
        }
    }
    const diff = 20;

    switch (type) {
        case "user":
            data = {
                title: "USERS",
                isMoney: false,
                link: "See all users",
                icon: (
                    <FontAwesomeIcon icon={faUser}
                        className="icon"
                        style={{
                            color: "crimson",
                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                        }}
                    />
                ),
            };
            break;
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
                <span className="title">{data.title}</span>
                {data.title === "USERS"
                    ?
                    <>
                        <span className="counter">
                            {data.isMoney && "$"} {amount}
                        </span>
                        <a href="/users">{data.link}</a>
                    </>
                    : data.title === "ORDERS"
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
                {data.title === "USERS"
                    ?
                    <>
                        <div className="percentage positive">
                            <FontAwesomeIcon icon={faCircleArrowUp} />{diff} % - 7 days
                        </div>
                        <div className="icon" onClick={() => countUser()}>{data.icon}</div>
                    </>
                    : data.title === "ORDERS"
                        ?
                        <>
                            <div className="percentage negative">
                                <FontAwesomeIcon icon={faCircleArrowDown} />{diff} % - 7 days
                            </div>
                            <div className="icon" onClick={() => console.log(2)}>{data.icon}</div>
                        </>
                        : data.title === "EARNINGS"
                            ?
                            <>
                                <div className="percentage positive">
                                    <FontAwesomeIcon icon={faCircleArrowUp} />{diff} % - 7 days
                                </div>
                                <div className="icon" onClick={() => console.log(3)}>{data.icon}</div>
                            </>
                            :
                            <>
                                <div className="percentage negative">
                                    <FontAwesomeIcon icon={faCircleArrowDown} />{diff} % - 7 days
                                </div>
                                <div className="icon" onClick={() => console.log(4)}>{data.icon}</div>
                            </>
                }
            </div>
        </div >
    );
};

export default Widget;