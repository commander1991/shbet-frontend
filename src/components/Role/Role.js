import './Role.scss'
import { useState, useRef } from 'react'
import _ from 'lodash'
import { toast } from 'react-toastify'
import { createRoles } from '../../services/roleService'
import TableRole from '../Role/TableRole'
import Sidebar from "../sidebar/SideBar";
import Navbar from "../navbar/NavBar";

const Role = (props) => {

    const dataChildDefault = { url: '', description: '', isValidUrl: true }
    const childRef = useRef()

    const [listChilds, setListChilds] = useState({
        child1: dataChildDefault
    })
    const [defaultData, setDefaultData] = useState({
        child1: { url: '', description: '', isValidUrl: true }
    })

    const handleRefreshInput = async () => {
        setListChilds(defaultData)
    }

    const handleOnchangeInput = (name, value, key) => {
        let _listChilds = _.cloneDeep(listChilds)
        _listChilds[key][name] = value

        if (value && name === 'url') {
            _listChilds[key]['isValidUrl'] = true
        }
        setListChilds(_listChilds)
    }

    // const handleAddNewInput = () => {
    //     let _listChilds = _.cloneDeep(listChilds)
    //     _listChilds[`child-${uuidv4()}`] = dataChildDefault
    //     setListChilds(_listChilds)
    // }

    // const handleDeleteInput = (key) => {
    //     let _listChilds = _.cloneDeep(listChilds)
    //     delete _listChilds[key]
    //     setListChilds(_listChilds)
    // }

    const bildDataToPersist = () => {
        let _listChilds = _.cloneDeep(listChilds)
        let result = []
        Object.entries(_listChilds).map(([key, child], index) => {
            result.push({
                url: child.url,
                description: child.description
            })
        })
        return result
    }

    const handleSave = async () => {
        let invalidObj = Object.entries(listChilds).find(([key, child], index) => {
            return child && !child.url
        })
        console.log(invalidObj)
        if (!invalidObj) {
            //call api
            let data = bildDataToPersist()
            let res = await createRoles(data)
            if (res && +res.EC === 0) {
                toast.success(res.EM)
                childRef.current.fetListRolesAgain()
            }
            handleRefreshInput()
        } else {
            //error
            toast.error("Input URL must not be empty...")
            let _listChilds = _.cloneDeep(listChilds)
            const key = invalidObj[0]
            _listChilds[key]['isValidUrl'] = false
            setListChilds(_listChilds)
        }
    }

    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className='role-container'>
                    <div className='container'>
                        <div className='adding-roles mt-3'>
                            <div className='title-role'><h4>Add new role...</h4></div>
                            <div className='role-parent'>
                                {
                                    Object.entries(listChilds).map(([key, child], index) => {
                                        return (
                                            <div className='row role-child' key={`child-${key}`}>
                                                <div className={`col-5 from-group ${key}`}>
                                                    <label>URL:</label>
                                                    <input
                                                        type='text'
                                                        className={child.isValidUrl ? 'form-control' : 'form-control is-invalid'}
                                                        value={child.url}
                                                        onChange={(event) => handleOnchangeInput('url', event.target.value, key)}
                                                    />
                                                </div>
                                                <div className="col-5 from-group">
                                                    <label>Description:</label>
                                                    <input
                                                        type='text'
                                                        className='form-control'
                                                        value={child.description}
                                                        onChange={(event) => handleOnchangeInput('description', event.target.value, key)}
                                                    />
                                                </div>
                                                <div className='col-2 mt4 actions'>
                                                    <i className='fa fa-rotate-right add' onClick={() => handleRefreshInput()}></i>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div>
                                    <button className='btn btn-warning mt-3' onClick={() => handleSave()}>Save</button>
                                </div>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <h4>List current roles</h4>
                            <TableRole ref={childRef} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Role