import { useEffect, useState, forwardRef, useImperativeHandle } from "react"
import { fetchAllRoles, deleteRole } from '../../services/roleService'
import { toast } from "react-toastify"

const TableRole = forwardRef((props, ref) => {
    const [listRoles, setListRoles] = useState([])
    
    useEffect(() => {
        getAllRoles()
    }, [])

    useImperativeHandle(ref, () => ({
        fetListRolesAgain() {
            getAllRoles()
        }
    }))

    const getAllRoles = async () => {
        let data = await fetchAllRoles()
        if (data && +data.EC === 0) {
            setListRoles(data.DT)
        }
    }
    const handleDeleteRole = async (role) => {
        let data = await deleteRole(role)
        if (data && +data.EC === 0) {
            toast.success(data.EM)
            await getAllRoles()
        }
    }
    return (<>
        <table className="table table-bordered table-hover">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">URL</th>
                    <th scope="col">Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {listRoles && listRoles.length > 0 ?
                    <>
                        {listRoles.map((item, index) => {
                            return (
                                <tr key={`row-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.url}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <button className="btn btn-danger mx-3"
                                            onClick={() => handleDeleteRole(item)}
                                        ><i className="fa fa-trash-o"></i></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </>
                    :
                    <>
                        <tr>
                            <td colSpan={4}>Not found role</td>
                        </tr>
                    </>
                }
            </tbody>
        </table>
    </>
    )
})

export default TableRole