import axios from "../axios"


const handleLoginApi = (user) => {
    return axios.post("/identity/users/login", { username:user.username, password:user.password });
}

const handleGetUserByUserName = (username) =>{
    return axios.get(`identity/users/username/${username}`)
}
export {
    handleLoginApi,handleGetUserByUserName
}