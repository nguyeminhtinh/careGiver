import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import home from '../../public/images/footer_main.png';
import homeActive from '../../public/images/footer_main_on.png';
import list from '../../public/images/footer_list.png';
import listActive from '../../public/images/footer_list_active.png';
import bank from '../../public/images/footer_pig.png';
import bankActive from '../../public/images/footer_pig_active.png';
import me from '../../public/images/footer_me.png';
import meActive from '../../public/images/footer_me_active.png';
import PopupAddress from './popupAddress';
import PopupSearch from './popupSearch';
import PopupPatient from './popupPatient';
import PopupPatientDetail from './popupPatientDetail';

class Root extends Component {

	renderFooter = (active, type, url, urlActive) => {
		if (active === type) {
			return (
				<img src={urlActive} alt="" />
			);
		}

		return (
			<img src={url} alt="" />
		);
	}

	renderContent = () => {
		const { active, isAddress, isSearch, isPatient, isPatientDetail } = this.props;

		if (isAddress) {
			return (
				<PopupAddress
					handleClose={this.props.handleClose}
					listAddress={this.props.listAddress}
					handleChange={this.props.handleChange}
					user_id={this.props.user_id}
				/>
			);
		}

		if (isSearch) {
			return (
				<PopupSearch
					handleClose={this.props.handleClose}
					hospitals={this.props.hospitals}
					user_id={this.props.user_id}
				/>
			);
		}

		if (isPatient) {
			return (
				<PopupPatient
					handleClose={this.props.handleClose}
					listPatient={this.props.listPatient}
				/>
			);
		}

		if (isPatientDetail) {
			return (
				<PopupPatientDetail
					handleClose={this.props.handleClose}
					dataPatient={this.props.dataPatient}
					listPatient={this.props.listPatient}
					user_id={this.props.user_id}
				/>
			);
		}

		return (
			<div className="wrapper">
				{this.props.children}
				<footer>
					<div className="footer-wrap">
						<ul>
							<li className={active === 1 ? 'active' : ''}>
								<Link to="/">
									{this.renderFooter(active, 1, home, homeActive)}
									<h2>메인</h2>
								</Link>
							</li>
							<li className={active === 2 ? 'active' : ''}>
								<Link to="/work">
									{this.renderFooter(active, 2, list, listActive)}
									<h2>리스트</h2>
								</Link>
							</li>
							<li className={active === 3 ? 'active' : ''}>
								<Link to="/passbook">
									{this.renderFooter(active, 3, bank, bankActive)}
									<h2>통장</h2>
								</Link>
							</li>
							<li className={active === 4 ? 'active' : ''}>
								<Link to="/mypage">
									{this.renderFooter(active, 4, me, meActive)}
									<h2>나</h2>
								</Link>
							</li>
						</ul>
					</div>
				</footer>
			</div>
		);
	}

	render() {
		return (
			<div>
				{this.renderContent()}
			</div>
		);
	}
}

export default Root;
