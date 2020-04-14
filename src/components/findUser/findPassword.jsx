import React, { Component } from 'react';
import { isHANGUL, checkPassword } from '../../commons/common';
import Cleave from 'cleave.js/react';
import CountDown from '../common/countDown';
import { sendSmsCode, checkSmsCode } from '../../services/authSevice';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { isIOS } from "react-device-detect";


@withRouter
@inject('rootStore')
@observer
class FindPassword extends Component {
	rootStore;
	constructor(props) {
		super(props);

		this.rootStore = this.props.rootStore;
		this.state = {
			isErrorUserName: "",
			isError: false,
		}
	}

	handleChange = (data) => {
		this.setState({
			isError: false,
			isErrorUserName: ""
		}, () => {
			this.props.handleChangeData(data);
		});
	}

	renderButton = () => {
		const { time, phone, isVerify } = this.props.dataFindPassword;
		if (isVerify) {
			return null;
		}

		if (time <= 0) {
			return (
				<button
					className={`btn-accept ${phone.length !== 13 ? 'btn-certification' : ''} ${isVerify ? 'btn-certification' : ''}`}
					disabled={phone.length !== 13 ? true : isVerify ? true : false}
					onClick={this.handleSendSmsCode}
				>인증번호 발송</button>
			);
		}

		return (
			<CountDown
				time={time}
				handleChange={this.props.handleChangeData}
			/>
		);
	}

	handleSendSmsCode = async () => {
		const { phone } = this.props.dataFindPassword;
		this.props.handleChangeData({isSendPassword: false});
		if (this.props.isSendPassword) {
			try {
				let response = await sendSmsCode(phone);
				if (response.data && response.data.error_cnt === 0) {
					this.props.handleChangeData({ time: 180000 });
				} else {
					this.props.handleChange({
						modalSmS: 'active',
						message: response.message,
					});
					this.props.handleChangeData({isSendPassword: true});
				}

			} catch (error) {
				console.log(error);
			}
		}
	}

	handleSubmitCode = async () => {
		const { phone, code } = this.props.dataFindPassword;

		if (phone.length !== 13) {
			this.setState({
				isError: true
			});
			return;
		}

		this.setState({
			isError: false
		});

		try {
			let response = await checkSmsCode(phone, code);
			if (response.status === 200) {
				this.props.handleChangeData({ isVerify: true, time: 0 });
			} else {
				this.props.handleChange({
					modalSmS: 'active',
					message: response.data.message
				});
				this.props.handleChangeData({isSendPassword: true});
			}
		} catch (error) {
			console.log(error);
		}
	}

	renderError = (isError, message) => {
		if (isError) {
			return (
				<div className="text-danger-error mt-2" role="alert">{message}</div>
			);
		}
	}

	validSubmit = () => {
		const { username, isVerify } = this.props.dataFindPassword;

		if (username.trim().length === 0) {
			this.setState({
				isErrorUserName: "사용자 이름 입력해주세요."
			});
			return false;
		}

		if (!isHANGUL(username)) {
			this.setState({
				isErrorUserName: "잘못된 형식."
			});
			return false;
		}

		if (username.trim().length < 4 || username.trim().length > 16 || !checkPassword(username)) {
			this.setState({
				isErrorUserName: "영문 또는 영문 숫자 조합 최소 4자리 이상 16자리 이하."
			});
			return false;
		}

		if (!isVerify) {
			this.setState({
				isError: true
			});
			return false;
		}

		return true;
	}

	handleSubmitFindPassword = () => {
		const { username, code, phone } = this.props.dataFindPassword;

		if (!this.validSubmit()) {
			return;
		}

		try {
			this.rootStore.userStore.findPassword(username, phone, code).then(response => {
				if (response.data.length !== 0) {
					this.props.handleChange({ modalOpen: 'active', isTrue: true, newPassword: response.data.new_password });
				} else {
					this.props.handleChangeData({ modalOpen: 'active', isTrue: false, isVerify: false, time: 0});
				}
			});
		} catch (error) {
			console.log(error);
		}
	}

	renderButtonSubmit = () => {
		const { code, isVerify, time } = this.props.dataFindPassword;

		if (isVerify) {
			return (
				<p className="text-success">인증완료</p>
			);
		}

		return (
			<button
				className={`btn-accept ${code.trim().length === 0 ? 'btn-certification' : ''} ${isVerify ? 'btn-certification' : ''}`}
				disabled={code.trim().length === 0 ? true : isVerify ? true : false || time === 0 ? true : false}
				onClick={this.handleSubmitCode}
			>인증받기</button>
		);
	}

	render() {
		const { username, phone, code, isVerify, time } = this.props.dataFindPassword;
		const { isErrorUserName, isError } = this.state;

		return (
			<div>
				<label className="input-title">
					아이디
				</label>
				<div className="basic-input phone-wrap">
					<input
						type="text"
						placeholder="아이디를 입력하세요"
						value={username}
						onChange={(e) => this.handleChange({ username: e.target.value })}
					/>
					<div className="mt-2">
						<span className="text-danger-error" role="alert">
							{isErrorUserName}
						</span>
					</div>
				</div>
				<label className="input-title">
					휴대전화 번호
				</label>
				<div className="basic-input phone-wrap phone-input">
					<Cleave
						placeholder="휴대전화번호를 입력하세요"
						options={{
							numericOnly: true,
							delimiters: ['-', '-'],
							blocks: [3, 4, 4]
						}}
						pattern="[0-9]*"
						inputMode={isIOS ? "" : "numeric"}
						value={phone}
						onChange={(e) => this.handleChange({ phone: e.target.value })}
						disabled={isVerify ? true : time === 0 ? false : true}
					/>
					{this.renderButton()}
				</div>
				<div className="input-wrap">
					<div className="basic-input phone-input">
						<input
							type="text"
							placeholder="인증번호를 입력하세요"
							disabled={phone.trim().length === 0 ? true : isVerify ? true : false || time === 0 ? true : false}
							value={code}
							onChange={(e) => this.handleChange({ code: e.target.value })}
						/>
						{this.renderButtonSubmit()}
					</div>
					{this.renderError(isError, '정보를 다시 확인해보세요.')}
				</div>
				<div className="BottomBtn-wrap fixed">
					<button
						className="btn-bottom"
						onClick={this.handleSubmitFindPassword}
					>
						확인
					</button>
				</div>
			</div>
		);
	}
}

export default FindPassword;