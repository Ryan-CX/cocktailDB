import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../generated.svg';

const Navbar = () => {
	return (
		<nav className='navbar'>
			<div className='nav-center'>
				<Link to='/'>
					<img src={logo} alt='logo' className='logo'></img>
				</Link>
			</div>
			<ul className='nav-links'>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/about'>About</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
