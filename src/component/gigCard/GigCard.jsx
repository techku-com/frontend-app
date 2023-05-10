import React from 'react'
import './GigCard.scss'
import { Link } from 'react-router-dom'

const GigCard = ({ item }) => {
	return (
		<Link
			to={`/gig/${item._id}`}
			className='link'>
			<div className='gigCard'>
				<img
					src={item.cover}
					alt=''
				/>
				<div className='info'>
					<p>{item.desc}</p>
				</div>
				<hr />
				<div className='detail'>
					<div className='price'>
						<span>STARTING AT</span>
						<h2>$ {item.price}</h2>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default GigCard
