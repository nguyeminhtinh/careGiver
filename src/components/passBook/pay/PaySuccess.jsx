import React, { Component } from 'react';
import pay_success from '../../../public/images/login_success.png';
import { observer, inject } from "mobx-react";
import { withRouter } from 'react-router-dom';

@withRouter
@inject('rootStore')
@observer
class SuccessPayment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isSuccess: true, 
			isRender: true
		}
	}

	handlePaymentSuccess() {
		this.props.history.push('/');
	}

	render() {

		let title = "결제 완료";

		return (
			<div className="wrapper">
				<header>
					<div className="SubHeader-wrap">
						<div className="SubPage-title">
							<h2>{title}</h2>
						</div>
					</div>
				</header>
				<div className="content-body">
					<div className="main-Container">
						<div className="content-wrap">
							<div className="login-success">
									<img src={pay_success} alt="Success" /> 
								<p>송금이 완료 되었습니다.</p>
							</div>
						</div>
					</div>

					<div className="BottomBtn-wrap fixed top-30">
						<button className="btn-bottom"
							onClick={() => this.handlePaymentSuccess()}>메인페이지 이동</button>
					</div>
				</div>
			</div>
		)
	}
}

export default SuccessPayment;