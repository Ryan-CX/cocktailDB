import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
	return (
		<section className='section error-page'>
			<div className='error-container'>
				<h1>Oops! The page you're looking for is not found.</h1>
				<Link to='/' className='btn btn-primary'>
					Go Back
				</Link>
			</div>
		</section>
	);
};

export default Error;
