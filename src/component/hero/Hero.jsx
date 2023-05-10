import React from 'react'
import './Hero.scss'
import { Link } from 'react-router-dom'

const Hero = () => {
	return (
		<div className='hero'>
			<div className='container'>
				<div className='left'>
					<h3>Butuh Bantuan?</h3>
					<h1>kami mengutamakan kejujuran!</h1>
					<Link to='/gigs'>
						<button>Explore</button>
					</Link>
				</div>
				<div className='right'>
					<img
						src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
						alt=''
					/>
				</div>
			</div>
		</div>
	)
}

export default Hero
