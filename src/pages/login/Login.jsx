import React, { useState } from 'react'
import './Login.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import GoogleLogin from 'react-google-login'

function Login() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const res = await axios.post('http://localhost:3000/users/login', {
				email: username,
				password: password,
			})
			localStorage.setItem('currentUser', JSON.stringify(res.data))
			navigate('/')
		} catch (err) {
			setError(err.response.data.message)
		}
	}

	const handleGoogleLoginSuccess = (response) => {
		console.log(response)
		navigate('/')
	}

	const handleGoogleLoginFailure = (response) => {
		console.log(response)
	}

	return (
		<div className='login'>
			<form onSubmit={handleSubmit}>
				<h1>Sign in</h1>
				<label htmlFor=''></label>
				Username
				<input
					name='username'
					type='text'
					placeholder='Input Username'
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label htmlFor=''></label>
				Password
				<input
					name='password'
					type='password'
					placeholder='Input Password'
					onChange={(e) => setPassword(e.target.value)}
				/>
				<div className='button-container'>
					<button type='submit'>Login</button>
					<br />
					<GoogleLogin
						clientId='908448360716-fk3f0spgnst2slj70lehjfmpacncvltd.apps.googleusercontent.com'
						buttonText='Login with Google'
						onSuccess={handleGoogleLoginSuccess}
						onFailure={handleGoogleLoginFailure}
						cookiePolicy='single_host_origin'
					/>
				</div>
				{error && <span>{error}</span>}
			</form>
		</div>
	)
}

export default Login
