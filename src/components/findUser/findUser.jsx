import React, { Component } from 'react';
import Header from '../common/header';
import FindPassword from './findPassword';
import FindId from './findId';
import Popup from '../common/popup';
import { Link, Redirect } from 'react-router-dom';

class FindUser extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isTab: true,
			modalOpen: '',
			newPassword: 'PmW3RhU2',
			isTrue: false,
			isRedirect: false,
			modalSmS: '',
			message: '',
			dataFindId: {
				phone: "",
				code: "",
				time: 0,
				isVerify: false
			},
			dataFindPassword: {
				username: "",
				phone: "",
				code: "",
				time: 0,
				isVerify: false
			},
			isSendFindId: true,
			isSendPassword: true,
		}
	}

	componentWillMount() {
		if (this.props.type === "2") {
			this.setState({
				isTab: false
			});
		}
	}

	handleChange = (data) => {
		this.setState({
			...data
		});
	}

	handleChangeDataFindId = (data) => {
		this.setState({
			...data,
			dataFindId: {
				...this.state.dataFindId,
				...data
			}
		}, () =>{
			if (data.time === 0) {
				this.setState({
					isSendFindId: true,
				});
			}
		});
	}

	handleChangeDataFindPassword = (data) => {
		this.setState({
			...data,
			dataFindPassword: {
				...this.state.dataFindPassword,
				...data
			}
		}, () =>{
			if (data.time === 0) {
				this.setState({
					isSendPassword: true,
				});
			}
		});
	}

	handleErrorFindId = () => {
		this.setState({
			modalOpenID: '',
			dataFindId: {
				...this.state.dataFindId,
				isVerify: false
			}
		});
	}

	handleErrorFindPassword = () => {
		let { isVerify } =this.state.dataFindPassword;
		this.setState({
			modalOpen: '',
			dataFindPassword: {
				...this.state.dataFindPassword,
				isVerify: isVerify
			}
		});
	}

	render() {
		const { isTab, dataFindId, dataFindPassword, modalOpen, newPassword, isRedirect, modalOpenID, isTrue, modalSmS, message, isSendFindId, isSendPassword } = this.state;
		if (isRedirect) {
			return (
				<Redirect to='/login' />
			);
		}

		return (
			<div className="wrap per">
				<Header
					title="아이디/비밀번호 찾기"
					link=""
					isLink={true}
					classHeader="header-wrap"
					classes=""
					classLink=""
				/>
				<div className="content-body singUp">
					<div className="main-Container">
						<div className="SubContent-tab" id="tabs">
							<ul>
								<li
									className={isTab ? "active" : ""}
									onClick={() => this.handleChange({ isTab: true })}
								>아이디 찾기</li>
								<li
									className={!isTab ? "active" : ""}
									onClick={() => this.handleChange({ isTab: false })}
								>비밀번호 찾기</li>
							</ul>
						</div>
						<div className="content-wrap">
							<div className="TabContent-wrap">
								<div className={`input-wrap tab-content ${isTab ? 'active' : ''}`}>
									<FindId
										dataFindId={dataFindId}
										handleChangeData={this.handleChangeDataFindId}
										handleChange={this.handleChange}
										isSendFindId ={isSendFindId}
									/>
								</div>
								<div className={`input-wrap tab-content ${!isTab ? 'active' : ''}`}>
									<FindPassword
										dataFindPassword={dataFindPassword}
										handleChangeData={this.handleChangeDataFindPassword}
										handleChange={this.handleChange}
										isSendPassword ={isSendPassword}
									/>
								</div>
							</div>
						</div>
					</div>
					<Popup
						classPopup="pop-wrap"
						classActive={modalOpen}
						isClose={true}
						handleClose={this.handleErrorFindPassword}
					>
						<div className="pop-head">
							<h2>알림</h2>
						</div>
						<div className="pop-content normal">
							{
								isTrue ?
									<p>
										회원님의 임시 비밀번호는 [<strong>{newPassword}</strong>] 입니다.
									</p> :
									<p>
										아이디, 휴대전화번호 일치하는 회원 정보가 없습니다.<br />
										다시 한번 확인해주세요.
									</p>
							}
						</div>
						<div className="pop-footer">
							{
								isTrue ?
									<button className="agree button-link">
										<Link to="/login">
											확인
										</Link>
									</button> :
									<button
										className="agree"
										onClick={this.handleErrorFindPassword}
									>
										확인
									</button>
							}

						</div>
					</Popup>
					<Popup
						classPopup="pop-wrap"
						classActive={modalOpenID}
						isClose={true}
						handleClose={this.handleErrorFindId}
					>
						<div className="pop-head">
							<h2>알림</h2>
						</div>
						<div className="pop-content normal">
							<p>
								시스템에서 당신의아이디를 잦지 못 합니다.
							</p>
						</div>
						<div className="pop-footer">
							<button
								className="agree"
								onClick={this.handleErrorFindId}
							>
								확인
							</button>
						</div>
					</Popup>
					<Popup
						classPopup="pop-wrap"
						classActive={modalSmS}
						isClose={true}
						handleClose={() => this.handleChange({ modalSmS: '' })}
					>
						<div className="pop-head">
							<h2>알림</h2>
						</div>
						<div className="pop-content normal">
							<p>
								{message}
							</p>
						</div>
						<div className="pop-footer">
							<button
								className="agree"
								onClick={() => this.handleChange({ modalSmS: '' })}
							>
								확인
							</button>
						</div>
					</Popup>
				</div>
			</div>
		);
	}
}

export default FindUser;