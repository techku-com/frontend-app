import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/users/'

const authenticate = async (email, password) => {
	try {
		const res = await axios.post(`${API_BASE_URL}authenticate`, {
			email,
			password,
		})
		return res.data
	} catch (err) {
		console.log(err)
	}
}

const register = async (username, email, password, created_at) => {
	try {
		const res = await axios.post(`${API_BASE_URL}register`, {
			username,
			email,
			password,
			created_at,
		})
		return res.data
	} catch (err) {
		console.log(err)
	}
}

const login = async (email, password) => {
	try {
		const res = await axios.post(`${API_BASE_URL}login`, {
			email,
			password,
		})
		return res.data
	} catch (err) {
		console.log(err)
	}
}

export { authenticate, register, login }
