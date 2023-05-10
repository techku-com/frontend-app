import axios from 'axios'

const newRequest = axios.create({
	baseURL: 'http://localhost:3000/users/',
	withCredentials: true,
})

export default newRequest
