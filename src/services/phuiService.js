import axios from '../setup/axios'

const createNewHUI = (huiData) => {
    return axios.post('/api/v1/phui/create', { ...huiData })
}

const fetchAllHUI = (page, limit) => {
    return axios.get(`/api/v1/phui/read?page=${page}&limit=${limit}`)
}

const deleteHUI = (hui) => {
    return axios.delete("/api/v1/phui/delete", { data: { id: hui } })
}

// const updateCurrentHUI = (huiData) => {
//     return axios.put('/api/v1/phui/update-hui', { ...huiData })

// }

export {
    createNewHUI, fetchAllHUI,
    deleteHUI
};