// axios
import axios from 'axios'
// axios.defaults.baseURL = 'https://matinvent.moozistudio.com/api/'
axios.defaults.baseURL = 'http://51.38.57.172:8002/api/'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
export default axios.create({})
