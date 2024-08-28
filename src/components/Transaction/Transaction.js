import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Sidebar from "../sidebar/SideBar";
import Navbar from "../navbar/NavBar";
import "./Transaction.scss";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { toast } from 'react-toastify';

const Transaction = () => {
    const now = new Date();
    const formattedDate = now.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Ho_Chi_Minh'
    });
    const defaultDepositData = {
        bankName: '',
        stk: '',
        stkName: '',
        amount: '',
        content: '',
        time: formattedDate,
    }
    const defaultWithdrawData = {
        stk: '',
        bankName: '',
        stkName: '',
        amount: '',
        sdt5: '',
    }

    const defaultValidateDataDeposite = {
        stk: false,
        amount: false
    }

    const defaultValidateDataWithdraw = {
        stk: false,
        bankName: false,
        stkName: false,
        amount: false,
        sdt5: false
    }
    const { user } = useContext(UserContext)
    const [showDeposit, setShowDeposit] = useState(false);
    const [showWithdraw, setShowWithdraw] = useState(false);
    const [selectedBankIndex, setSelectedBankIndex] = useState(null);
    const [depositData, setDepositData] = useState(defaultDepositData)
    const [validateDataDeposite, setValidateDataDeposite] = useState(defaultValidateDataDeposite)
    const [validateDataWithdraw, setValidateDataWithdraw] = useState(defaultValidateDataWithdraw)
    const [withdrawData, setWithdrawData] = useState(defaultWithdrawData)

    const bankList = [
        {
            id: 0,
            bankName: 'Chọn ngân hàng',
            stk: '',
            stkName: ''
        },
        {
            id: 1,
            bankName: 'acb',
            stk: '123456789',
            stkName: 'Nguyen Van A'
        },
        {
            id: 2,
            bankName: 'bidv',
            stk: '111111111',
            stkName: 'Nguyen Van b'
        },
        {
            id: 3,
            bankName: 'vietcombank',
            stk: '22222222',
            stkName: 'Nguyen Van c'
        }
    ]

    const deposit = () => {
        console.log('User: ', user.account.username, 'deposit')
        setShowDeposit(true)
        setShowWithdraw(false)
    }
    const withdraw = () => {
        console.log('User: ', user.account.username, 'withdraw')
        setShowDeposit(false)
        setShowWithdraw(true)
    }

    const checkValidateDeposite = () => {
        let isValid = {
            stk: false,
            amount: false
        };

        if (depositData.stk !== '') {
            isValid.stk = true;
        }

        if (depositData.amount !== '') {
            if (!isNaN(depositData.amount) && depositData.amount > 0) {
                isValid.amount = true;
            }
        }       

        setValidateDataDeposite(isValid);
        return isValid;
    }

    const checkValidateWithdraw = () => {
        let isValid = {
            stk: false,
            bankName: false,
            stkName: false,
            amount: false,
            sdt5: false
        };

        if (withdrawData.stk !== '') {
            isValid.stk = true;
        }

        if (withdrawData.bankName !== '') {
            isValid.bankName = true;
        }

        if (withdrawData.stkName !== '') {
            isValid.stkName = true;
        }

        if (withdrawData.amount !== '') {
            if (!isNaN(withdrawData.amount) && withdrawData.amount > 0) {
                isValid.amount = true;
            }
        }

        if (withdrawData.sdt5 !== '') {
            if (!isNaN(withdrawData.sdt5) && withdrawData.sdt5.length === 5) {
                isValid.sdt5 = true;
            } else {
                toast.error('Số điện thoại không hợp lệ')
            }
        }

        setValidateDataWithdraw(isValid);
        return isValid;
    }

    const handleBankSelection = () => {
        const validationResults = checkValidateDeposite();
        if (validationResults.stk && validationResults.amount) {
            console.log('dữ liệu hợp lệ', depositData)
            alert('Gửi thành công')
            window.location.reload()
        } else {
            toast.error('Dữ liệu không hợp lệ')
        }

    }
    const handleWithdraw = () => {
        const validationResults = checkValidateWithdraw();
        if (validationResults.stk && validationResults.bankName && validationResults.stkName && validationResults.amount && validationResults.sdt5) {
            console.log('dữ liệu hợp lệ', withdrawData)
            alert('Gửi thành công')
            window.location.reload()
        } else {
            toast.error('Dữ liệu không hợp lệ')
        }
    }

    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">                
                <Navbar />
                <div className="charts">
                    <button className='btn btn-lg btn-primary' onClick={() => deposit()}>
                        Nạp</button>
                    <button className='btn btn-lg btn-primary' onClick={() => withdraw()}>
                        Rút</button>
                </div>
                {showDeposit && (
                    <div className="listContainer">
                        <div className="listTitle">
                            <h1>Thông tin Nạp:</h1>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    Ngân hàng:
                                </InputGroup.Text>
                                <Form.Select aria-label="Default select example"
                                    onChange={(e) => {
                                        const selectBankId = e.target.value
                                        setSelectedBankIndex(selectBankId)
                                        const selectedBank = bankList.find(bank => bank.id === parseInt(selectBankId))
                                        if (selectedBank) {
                                            setDepositData({
                                                ...depositData,
                                                bankName: selectedBank.bankName,
                                                stk: selectedBank.stk,
                                                stkName: selectedBank.stkName,
                                                content: user.account.userId.substring(0, 8)
                                            })
                                        }

                                    }
                                    }
                                >
                                    {bankList && bankList.map((bank, index) => {
                                        return (
                                            <option key={index} value={bank.id}>{bank.bankName}</option>
                                        )
                                    }
                                    )}
                                </Form.Select>

                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    STK nhận:
                                </InputGroup.Text>
                                <InputGroup.Text>
                                    {selectedBankIndex !== null && bankList[selectedBankIndex].stk}
                                </InputGroup.Text>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    Tên TK:
                                </InputGroup.Text>
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    {selectedBankIndex !== null && bankList[selectedBankIndex].stkName}
                                </InputGroup.Text>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    Nội dung chuyển khoản:
                                </InputGroup.Text>
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    {user.account.userId.substring(0, 8)}
                                </InputGroup.Text>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    Số tiền(k):
                                </InputGroup.Text>
                                <Form.Control
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                    value={depositData.amount}
                                    onChange={(e) => setDepositData({ ...depositData, amount: e.target.value })}
                                />
                                <InputGroup.Text>
                                    .000
                                </InputGroup.Text>
                            </InputGroup>
                        </div>
                        <button className='btn btn-lg btn-primary' onClick={() => handleBankSelection()}>
                            Gửi</button>
                    </div>)}
                {showWithdraw && (
                    <div className="listContainer">
                        <div className="listTitle">
                            <h1>Thông tin Rút:</h1>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    Rút về stk:
                                </InputGroup.Text>
                                <Form.Control
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                    onChange={(e) => setWithdrawData({ ...withdrawData, stk: e.target.value })}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    Ngân hàng:
                                </InputGroup.Text>
                                <Form.Control
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                    onChange={(e) => setWithdrawData({ ...withdrawData, bankName: e.target.value })}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    Tên người nhận:
                                </InputGroup.Text>
                                <Form.Control
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                    onChange={(e) => setWithdrawData({ ...withdrawData, stkName: e.target.value })}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    Số tiền(k):
                                </InputGroup.Text>
                                <Form.Control
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                    onChange={(e) => setWithdrawData({ ...withdrawData, amount: e.target.value })}
                                />
                                <InputGroup.Text>
                                    .000
                                </InputGroup.Text>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    Xác nhận 5 số cuối số đt:
                                </InputGroup.Text>
                                <Form.Control
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                    onChange={(e) => setWithdrawData({ ...withdrawData, sdt5: e.target.value })}
                                />
                            </InputGroup>
                        </div>
                        <button className='btn btn-lg btn-primary'
                        onClick={()=>handleWithdraw()}>
                            Gửi</button>
                    </div>)}
            </div>
        </div >
    )
}
export default Transaction
