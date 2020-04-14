import React, { Component } from 'react';
import Header from '../../common/header';
import Popup from '../../common/popup';
import { Redirect } from 'react-router-dom';
class PayDetail extends Component {

	constructor(props) {
		super(props);

		this.state = {
			modalIsOpen: "",
			money: "",
			redirect: false,
		}
	}

	handlePopup = (data) => {
		this.setState({
			...data,
		});
	}

	handleChange = (data) => {
		this.setState({
			...data
		});
	}

	handleSaveData = () => {
		const { money } = this.state;
		var data = {
			money: money,
		}
		console.log(data)
	}

	handleSubmit = () => {
		this.handlePopup({ modalIsOpen: "active" })
	}

	submitForm = async () => {
		await this.handleSaveData();
		this.handlePopup({ modalIsOpen: "", redirect: true })
	}

	render() {
		const { modalIsOpen, redirect } = this.state;
		if (redirect) {
			return <Redirect to='/passbook' />
		}
		return (
			<div className="wrapper">
				<Header
					title="이체하기"
					link="/passbook/pay"
					isLink={true}
					classes=""
					classLink=""
					classHeader="header-wrap"
				/>
				<div className="content-body">
					<div className="main-Container">
						<div className="content-wrap">
							<div className="pass-content last-content">
								<div className="content-title">
									<h2>안내</h2>
								</div>
								<div className="white-box">
									<table border={0}>
										<tbody>
											<tr>
												<th>이체금액</th>
												<td><span>800,000</span></td>
											</tr>
											<tr>
												<th>수수료</th>
												<td className="red-color"><span>1,200</span></td>
											</tr>
											<tr>
												<th>이체일</th>
												<td><span>2018</span>-<span>06</span>-<span>24</span></td>
											</tr>
											<tr>
												<th>입금은행</th>
												<td className="red-color"><span>우리은행</span></td>
											</tr>
											<tr>
												<th>입금계좌번호</th>
												<td className="red-color"><span>1002-667-123546</span></td>
											</tr>
											<tr>
												<th>받는 분</th>
												<td><span>홍길순</span></td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<div className="BottomBtn-wrap fixed">
								<button
									className="btn-bottom"
									onClick={this.handleSubmit}
								>
									확인
								</button>
							</div>
						</div>
					</div>
				</div>
				<Popup
					classPopup="pop-wrap"
					classActive={modalIsOpen}
					isClose={true}
					handleClose={() => this.handlePopup({ modalIsOpen: "" })}
				>
					<div className="pop-head">
						<h2>알림</h2>
					</div>
					<div className="pop-content normal">
						<p>이체가 완료되었습니다.</p>
					</div>
					<div className="pop-footer">
						<button
							className="agree"
							onClick={this.submitForm}
						>확인</button>
					</div>
				</Popup>
			</div>
		)
	}
}

export default PayDetail;