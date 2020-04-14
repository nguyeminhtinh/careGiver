import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { withRouter } from 'react-router-dom';
import pay_fail from '../../../public/images/pay_error.png';

@withRouter
@inject('rootStore')
@observer
class FailPayment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isSuccess: true, 
			isRender: true
		}
	}

	handlePaymentFail() {
		this.props.history.push('/');
	}

	render() {

		let title = "결제 실패";

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
									<img src={pay_fail} alt="Success" /> 
								<p>송금이 취소 되었습니다.</p>
							</div>
						</div>
					</div>

					<div className="BottomBtn-wrap fixed top-30">
						<button className="btn-bottom"
							onClick={() => this.handlePaymentFail()}>메인페이지 이동</button>
					</div>
				</div>
			</div>
		)
	}
}

export default FailPayment;