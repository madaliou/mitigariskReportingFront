// axios
import axios from 'axios'
axios.defaults.baseURL = 'https://matinvent.moozistudio.com/api/'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
export default axios.create({})
