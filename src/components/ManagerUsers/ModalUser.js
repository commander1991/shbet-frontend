import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect, useContext } from "react";
import { fetchGroup, createNewUser, updateCurrentUser, getUserAccount } from "../../services/userService";
import { toast } from "react-toastify";
import _ from "lodash";
import './ModalUser.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faCoins, faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { loginUser } from '../../services/userService';
import { UserContext } from '../../context/UserContext';


const ModalUser = (props) => {

    const { user, loginContext } = useContext(UserContext)

    const { action, dataModalUser } = props

    const defaultUserData = {
        username: '',
        phone: '',
        password: '',
        group: '',
        point: '',
        pointLock: '',
    }

    const validInputsDefault = {
        username: true,
        phone: true,
        password: true,
        group: true,
        point: true,
        pointLock: true,
    }

    const defaultResult = {
        r1: 0,
        r2: 0
    }

    const [userData, setUserData] = useState(defaultUserData)
    const [validInputs, setValidInputs] = useState(validInputsDefault)
    const [userGroups, setUserGroups] = useState([])
    const [valueChange, setValueChange] = useState(0)
    const [result, setResult] = useState(defaultResult)
    const [active, setActive] = useState(true)

    useEffect(() => {
        getGroups();
    }, [])

    useEffect(() => {
        if (action === 'UPDATE') {
            setUserData({ ...dataModalUser, group: dataModalUser.Group ? dataModalUser.Group.id : '' })
        }
    }, [dataModalUser])

    useEffect(() => {
        if (action === "CREATE") {
            if (userGroups && userGroups.length > 0) {
                setUserData({ ...userData, group: userGroups[0].id })
            }
        }
    }, [action])

    const getGroups = async () => {
        let res = await fetchGroup()
        if (res && res.EC === 0) {
            setUserGroups(res.DT);
            if (res.DT && res.DT.length > 0) {
                let groups = res.DT;
                setUserData({ ...userData, group: groups[2].id })
            }
        } else {
            toast.error(res.EM);
        }
    }

    const handleOnchangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    }

    const checkValidateInputs = () => {
        //create user
        if (action === "UPDATE") return true

        setValidInputs(validInputsDefault)
        //let arr = ['username', 'phone', 'password', 'group', 'point', 'pointLock', 'status'];
        let arr = ['username', 'phone', 'password', 'group'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false;
                setValidInputs(_validInputs);

                toast.error(`Empty input ${arr[i]}`);
                check = false;
                break;
            }
        }
        return check;
    }

    const handleConfirmUser = async () => {
        //create user
        let check = checkValidateInputs();
        console.log(check)
        if (check === true) {
            let res = action === "CREATE"
                ? await createNewUser({
                    ...userData,
                    groupId: userData['group'],
                    point: 0,
                    pointLock: 0,
                    status: 1
                })
                : await updateCurrentUser({
                    ...userData,
                    groupId: userData['group'],
                    point: result.r1,
                    pointLock: result.r2,
                    status: active
                })
            if (res && res.EC === 0) {
                props.onHide();
                setUserData({
                    ...defaultUserData,
                    group: userGroups && userGroups > 0 ? userGroups[0].id : 4
                })
                let token = localStorage.getItem('jwt')
                let data = {
                    isAuthenticated: true,
                    token,
                    account: {
                        groupWithRoles: userData['group'],
                        username: userData['username'],
                        userId: user.account.userId,
                        point: result.r1,
                        pointLock: result.r2
                    }
                }
                loginContext(data)
            }
            if (res && res.EC !== 0) {
                toast.error(res.EM);
                let _validInputs = _.cloneDeep(validInputsDefault)
                _validInputs[res.DT] = false;
                setValidInputs(_validInputs);
            }
        }
    }

    const handleCloseModalUser = () => {
        props.onHide()
        setUserData(defaultUserData)
        setValidInputs(validInputsDefault)
        setValueChange(0)
        setResult(defaultResult)
        setActive(true)
    }

    const handleValueChange = (event) => {
        setValueChange(Number(event.target.value))
    }

    const handleCalculate = (option) => {
        let resultNum1 = +userData.point
        let resultNum2 = +userData.pointLock
        if (resultNum1 >= 0 && resultNum2 >= 0 && +valueChange >= 0) {
            switch (option) {
                case 1:
                    resultNum1 += +valueChange
                    break
                case 2:
                    resultNum1 -= +valueChange
                    resultNum2 += +valueChange
                    break
                case 3:
                    resultNum1 += +valueChange
                    resultNum2 -= +valueChange
                    break
                case 4:
                    resultNum1 -= +valueChange
                    break
                default:
                    return "Option is invalid!";
            }
            if (resultNum1 >= 0 && resultNum2 >= 0) {
                setResult({ r1: resultNum1, r2: resultNum2 })
            } else {
                setResult({ r1: userData.point, r2: userData.pointLock })
                toast.error("Not enough money!")
            }

        }
        else {
            return "All parameters must be greater than 0!";
        }
    }

    const handleActive = () => {
        if (active === 2) {
            toast.error("Account is disabled")
            console.log(2)
        }
        else {
            toast.success("Account is enabled")
            console.log(1)
        }
    }

    return (
        <>
            <Modal size="md" show={props.show} className="modal-user" onHide={() => handleCloseModalUser()}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>{props.action === 'CREATE' ? "Create new user" : "Edit user"}</span>
                        <div className="formSwitch" hidden={props.action === 'CREATE' ? true : false}>
                            <Form>
                                <Form.Check // prettier-ignore
                                    type="switch"
                                    id="custom-switch"
                                    label="Active"
                                    checked={active}
                                    onClick={() => setActive(!active)}
                                    onChange={() => handleActive()}
                                />
                            </Form>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body">
                        <div className='col-12 col-sm-6 form-control'>
                            <div hidden={action === "CREATE" ? true : false}>
                                <label>ID: <span>{userData.id}</span></label>
                                <br />
                                <label>User ID: {userData.userId}</label>
                                <br />
                                <label>Info:{userData.linkInfo}</label>
                                <br />
                                <label>IP:{userData.ip}</label>
                                <br />
                                <label>Device:{userData.device}</label>
                                <br />
                            </div>
                            <label>User Name (<span className="red">*</span>):</label>
                            <input disabled={action === "CREATE" ? false : true}
                                className={validInputs.username ? "form-control" : "form-control is-invalid"}
                                type="text" value={userData.username}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'username')}
                            ></input>

                            <label>Phone (<span className="red">*</span>) :</label>
                            <input className={validInputs.phone ? "form-control" : "form-control is-invalid"}
                                type="text" value={userData.phone}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'phone')}
                            ></input>
                            <div>
                                <label>Password (<span className="red">*</span>) :</label>
                                <input className={validInputs.password ? "form-control" : "form-control is-invalid"}
                                    type="password" value={userData.password}
                                    onChange={(event) => handleOnchangeInput(event.target.value, 'password')}
                                ></input>
                            </div>
                            <label>Group (<span className="red">*</span>) :</label>
                            <select
                                className={validInputs.group ? "form-select" : "form-select is-invalid"}
                                onChange={(event) => handleOnchangeInput(event.target.value, "group")}
                            >
                                <option value="">Select group</option>
                                {userGroups.length > 0 &&
                                    userGroups.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} value={+item.id}>{item.id} {item.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <div className="moneyTitle">
                                <label>Transfer (<span className="red">*</span>) :</label>
                            </div>
                            <div className="money">
                                <div className="transfer">
                                    <div className="mb-3">
                                        <input className={validInputs.phone ? "form-control" : "form-control is-invalid"}
                                            type="number"
                                            onChange={(event) => handleValueChange(event)}
                                        ></input>
                                        <Form>
                                            <div key='inline-1' className="mb-3">
                                                <Form.Check
                                                    inline
                                                    label="Wallet adding"
                                                    name="group1"
                                                    type='radio'
                                                    id="inline-1"
                                                    onChange={() => handleCalculate(1)}
                                                />
                                                <Form.Check
                                                    inline
                                                    label="Wallet to coins"
                                                    name="group1"
                                                    type='radio'
                                                    id="inline-2"
                                                    onChange={() => handleCalculate(2)}
                                                />
                                                <Form.Check
                                                    inline
                                                    label="Coins to wallet"
                                                    name="group1"
                                                    type='radio'
                                                    id="inline-3"
                                                    onChange={() => handleCalculate(3)}
                                                />
                                                <Form.Check
                                                    inline
                                                    label="Withdraw"
                                                    name="group1"
                                                    type='radio'
                                                    id="inline-3"
                                                    onChange={() => handleCalculate(4)}
                                                />
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                                <div className="exchange">
                                    <div className="moneyCurrent">
                                        <FontAwesomeIcon icon={faWallet} />
                                        <span className="current">{userData.point.toLocaleString()}</span>
                                        <span className="mx-5"><FontAwesomeIcon icon={faRightLeft} /></span>
                                        <span className="current">{result.r1}</span>
                                    </div>
                                    <div className="moneyCurrent">
                                        <FontAwesomeIcon icon={faCoins} />
                                        <span className="current">{userData.pointLock.toLocaleString()}</span>
                                        <span className="mx-5"><FontAwesomeIcon icon={faRightLeft} /></span>
                                        <span className="current">{result.r2}</span>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleConfirmUser()}>
                        {action === "CREATE" ? 'Confirm' : 'Save'}
                    </Button>
                    <Button variant="secondary" onClick={() => handleCloseModalUser()}>Close</Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}

export default ModalUser