import React, { useState } from 'react'
import './Gigs.scss'
import GigCard from '../../component/gigCard/GigCard'

function Gigs({ data }) {
	const [sort, setSort] = useState('sales')
	const [open, setOpen] = useState(false)

	const reSort = (type) => {
		setSort(type)
		setOpen(false)
	}

	return (
		<div className='gigs'>
			<div className='container'>
				<h1>Explore</h1>
				<p>
					Explore the boundaries of art and technology with Liverr's AI artists
				</p>
				<div className='menu'>
					<div className='right'>
						<span className='sortBy'>Sort by</span>
						<span className='sortType'>
							{sort === 'sales' ? 'Best Selling' : 'Newest'}
						</span>
						<img
							src='./img/down.png'
							alt=''
							onClick={() => setOpen(!open)}
						/>
						{open && (
							<div className='rightMenu'>
								{sort === 'sales' ? (
									<span onClick={() => reSort('createdAt')}>Newest</span>
								) : (
									<span onClick={() => reSort('sales')}>Best Selling</span>
								)}
								<span onClick={() => reSort('sales')}>Popular</span>
							</div>
						)}
					</div>
				</div>
				<div className='cards'>
					{Array.isArray(data) && data.length > 0 ? (
						data.map((gig) => (
							<GigCard
								key={gig._id}
								item={gig}
							/>
						))
					) : (
						<p>No gigs found.</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default Gigs
