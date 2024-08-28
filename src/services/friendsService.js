import axios from '../setup/axios'

const fetchAllFriends = () => {
    return axios.get(`/api/v1/friends/read?page=${page}&limit=${limit}`)
}

const addNewFriends = () => {
    return axios.post('/api/v1/friends/add', { ...friendsData })
}

const deleteFriends = () => {
    return axios.delete("/api/v1/friends/delete", { data: { id: friendsId } })
}

export {
    fetchAllFriends,
    addNewFriends,
    deleteFriends
}