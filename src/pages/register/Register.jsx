import React, { useState } from 'react'
import './Register.scss'
import newRequest from '../../utils/newRequest'
import { useNavigate } from 'react-router-dom'

function Register() {
	const [user, setUser] = useState({
		username: '',
		email: '',
		password: '',
		isSeller: false,
		phone: '',
		desc: '',
	})
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	const handleChange = (e) => {
		setUser((prev) => {
			return { ...prev, [e.target.name]: e.target.value }
		})
	}

	const handleSeller = (e) => {
		setUser((prev) => {
			return { ...prev, isSeller: e.target.checked }
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await newRequest.post('/register', {
				username: user.username,
				email: user.email,
				password: user.password,
				isSeller: user.isSeller,
				phone: user.phone,
				desc: user.desc,
				created_at: new Date().toISOString(),
			})
			navigate('/')
		} catch (err) {
			setError(err.response.data.message)
		}
	}

	return (
		<div className='register'>
			<form onSubmit={handleSubmit}>
				<div className='left'>
					<h1>Create a new account</h1>
					<label htmlFor=''>Username</label>
					<input
						name='username'
						type='text'
						placeholder='Input Username'
						onChange={handleChange}
					/>
					<label htmlFor=''>Email</label>
					<input
						name='email'
						type='email'
						placeholder='Input email'
						onChange={handleChange}
					/>
					<label htmlFor=''>Password</label>
					<input
						name='password'
						type='password'
						onChange={handleChange}
					/>
					<button type='submit'>Register</button>
					{error && <p className='error'>{error}</p>}
				</div>
				<div className='right'>
					<h1>I want to become a seller</h1>
					<div className='toggle'>
						<label htmlFor=''>Activate the seller account</label>
						<label className='switch'>
							<input
								type='checkbox'
								onChange={handleSeller}
							/>
							<span className='slider round'></span>
						</label>
					</div>
					<label htmlFor=''>Phone Number</label>
					<input
						name='phone'
						type='text'
						placeholder='+62'
						onChange={handleChange}
					/>
					<label htmlFor=''>Description</label>
					<textarea
						placeholder='A short description of yourself'
						name='desc'
						id=''
						cols='30'
						rows='10'
						onChange={handleChange}></textarea>
				</div>
			</form>
		</div>
	)
}

export default Register
