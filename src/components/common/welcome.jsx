import React, { Component } from 'react';
import Logo from '../../public/images/login_logo.png';

class Welcome extends Component {

	render() {
		return (
			<div className="wrapper">
				<div className="d-flex align-items-center welcome">
					<img src={Logo} alt="" />
				</div>
			</div>
		)
	}
}

export default Welcome;