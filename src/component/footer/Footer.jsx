import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.scss'

function Footer() {
	return (
		<footer>
			<div className='footer-top'>
				<div className='footer-logo'>
					<img
						src='path-to-your-logo.png'
						alt='Your logo'
					/>
				</div>
				<div className='footer-nav'>
					<ul>
						<li>
							<Link to='/'>HOME</Link>
						</li>
						<li>
							<Link to='/info'>INFO</Link>
						</li>
						<li>
							<Link to='/media'>MEDIA</Link>
						</li>
						<li>
							<Link to='/community'>COMMUNITY</Link>
						</li>
						<li>
							<Link to='/support'>SUPPORT</Link>
						</li>
					</ul>
				</div>
				<div className='footer-social'>
					<ul>
						<li>
							<Link>
								<i className='fab fa-facebook-f'></i>
							</Link>
						</li>
						<li>
							<Link>
								<i className='fab fa-twitter'></i>
							</Link>
						</li>
						<li>
							<Link>
								<i className='fab fa-youtube'></i>
							</Link>
						</li>
						<li>
							<Link>
								<i className='fab fa-twitch'></i>
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className='footer-bottom'>
				<p>©2023 TECHKU CORP. ALL RIGHTS RESERVED.</p>
			</div>
		</footer>
	)
}

export default Footer
