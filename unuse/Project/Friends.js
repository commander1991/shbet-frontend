import { useState, useEffect } from "react"
import { fetchGroup } from "../../services/userService";
import { toast } from "react-toastify";
import { fetchAllRoles, fetchRolesByGroup, assignRolesToGroup } from "../../services/roleService";
import _ from 'lodash'
import { FaMagnifyingGlass } from "react-icons/fa6"

const GroupRole = () => {
    const [userGroups, setUserGroups] = useState([])
    const [listRoles, setListRoles] = useState([])
    const [selectGroup, setSelectGroup] = useState('')
    const [assignRolesByGroup, setAssignRolesByGroup] = useState([])

    useEffect(() => {
        getGroups()
        getAllRoles()
    }, [])

    const getGroups = async () => {
        let res = await fetchGroup()
        if (res && +res.EC === 0) {
            setUserGroups(res.DT);
        } else {
            toast.error(res.EM);
        }
    }

    const getAllRoles = async () => {
        let data = await fetchAllRoles()
        if (data && +data.EC === 0) {
            setListRoles(data.DT)
        }
    }

    const handleOnchangeGroup = async (value) => {
        setSelectGroup(value)
        if (value) {
            let data = await fetchRolesByGroup(value)
            if (data && +data.EC === 0) {
                let result = bildDataRolesbyGroup(data.DT.Roles, listRoles)
                setAssignRolesByGroup(result)
            }
        }
    }

    const bildDataRolesbyGroup = (groupRoles, allRoles) => {
        let result = []
        if (allRoles && allRoles.length > 0) {
            allRoles.map(role => {
                let object = {}
                object.url = role.url
                object.id = role.id
                object.description = role.description
                object.isAssigned = false
                if (groupRoles && groupRoles.length > 0) {
                    object.isAssigned = groupRoles.some(item => item.url === object.url)
                }
                result.push(object)
            })
        }
        return result
    }

    const handleSelectRole = (value) => {
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup)
        let foundIndex = _assignRolesByGroup.findIndex(item => +item.id === +value)
        if (foundIndex > -1) {
            _assignRolesByGroup[foundIndex].isAssigned = !_assignRolesByGroup[foundIndex].isAssigned
        }
        setAssignRolesByGroup(_assignRolesByGroup)
    }

    const buildDataToSave = () => {
        let result = {}
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup)
        result.groupId = selectGroup
        let groupRolesFilter = _assignRolesByGroup.filter(item => item.isAssigned === true)
        let finalGroupRoles = groupRolesFilter.map(item => {
            let data = { groupId: +selectGroup, roleId: +item.id }
            return data
        })
        result.groupRoles = finalGroupRoles
        return result
    }

    const handleSave = async () => {
        let data = buildDataToSave()
        let res = await (data)
        if (res && res.EC === 0) {
            toast.success(res.EM)
        }
    }
    return (
        <div className="friends-container" >
            <div className="container">
                <div className="container mt-3">
                    <div className='my-3 d-flex justify-content-between mb-3'>
                        <form className="d-flex" role="search">
                            <h4 className="me-4">Friends</h4>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-success" type="submit"><FaMagnifyingGlass /></button>
                        </form>
                    </div>
                    <div className="list-friends">
                        <hr />
                        <div className="row">
                            <div className="col border border-primary rounded">
                                akjdakllksd
                            </div>
                            <div className="col"></div>
                        </div>
                        {selectGroup &&
                            <div className="roles">
                                <h5>Assign Roles:</h5>
                                {
                                    assignRolesByGroup && assignRolesByGroup.length > 0
                                    && assignRolesByGroup.map((item, index) => {
                                        return (
                                            <div className="form-check" key={`list-role-${index}`}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value={item.id}
                                                    id={`list-role-${index}`}
                                                    checked={item.isAssigned}
                                                    onChange={(event) => handleSelectRole(event.target.value)}
                                                />
                                                <label className="form-check-label" htmlFor={`list-role-${index}`}>
                                                    {item.url}
                                                </label>
                                            </div>
                                        )
                                    })
                                }
                                <div className="mt-3">
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => handleSave()}>Save</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupRole