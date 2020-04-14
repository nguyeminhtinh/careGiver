import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

	render() {
		const { title, link, classHeader, isLink, classes, classLink } = this.props;

		return (
			<header>
				<div className={classHeader}>
					{
						isLink &&
						<div className={"ico-back " + classLink}>
							<Link to={link || "/"} />
						</div>
					}
					<div className={"SubPage-title " + classes}>
						<h2>{title}</h2>
					</div>
				</div>
			</header>
		);
	}
};

export default Header;