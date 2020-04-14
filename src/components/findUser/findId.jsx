import React, { Component } from 'react';
import CountDown from '../common/countDown';
import Cleave from 'cleave.js/react';
import { sendSmsCode, checkSmsCode } from '../../services/authSevice';
import { inject, observer } from 'mobx-react';
import { withRouter, Redirect } from 'react-router-dom';
import { isIOS } from "react-device-detect";

@withRouter
@inject('rootStore')
@observer
class FindId extends Component {
	rootStore;
	constructor(props) {
		super(props);

		this.rootStore = this.props.rootStore;
		this.state = {
			isError: false,
			isRedirect: false,
			ID: '',
		}
	}

	renderButton = () => {
		const { time, phone, isVerify } = this.props.dataFindId;

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

	handleChange = (data) => {
		this.setState({
			isError: false
		}, () => {
			this.props.handleChangeData(data);
		});
	}

	handleSendSmsCode = async () => {
		const { phone } = this.props.dataFindId;
		this.props.handleChangeData({isSendFindId: false});
			if (this.props.isSendFindId) {
			try {
				let response = await sendSmsCode(phone);
				
				if (response.data && response.data.error_cnt === 0) {
					this.props.handleChangeData({ time: 180000 });
				} else {
					this.props.handleChange({
						modalSmS: 'active',
						message: response.message
					});
					this.props.handleChangeData({isSendFindId: true});
				}
			} catch (error) {
				console.log(error);
			}
		}
	}

	handleSubmitCode = async () => {
		const { phone, code } = this.props.dataFindId;
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
				this.props.handleChangeData({isSendFindId: true});
			}
		} catch (error) {
			console.log(error);
		}
	}

	handleSubmitFindId = async () => {
		const { phone, code, isVerify } = this.props.dataFindId;

		if (!isVerify) {
			this.setState({
				isError: true
			});
			return;
		}

		try {
			this.rootStore.userStore.findId(phone, code).then(response => {
				if (response.data.length === 0) {
					this.props.handleChange({ modalOpenID: 'active' });
				} else {
					this.setState({
						isRedirect: true,
						ID: response.data.username
					});
				}
			});
		} catch (error) {
			console.log(error);
		}
	}

	renderError = () => {
		const { isError } = this.state;

		if (isError) {
			return (
				<div className="text-danger-error" role="alert">정보를 다시 확인해보세요</div>
			);
		}
	}

	renderButtonSubmit = () => {
		const { code, isVerify, time } = this.props.dataFindId;

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
		const { phone, code, isVerify, time } = this.props.dataFindId;
		const { isRedirect, ID } = this.state;
		if (isRedirect) {
			return (
				<Redirect to={`/idclear?ID=${ID}`} />
			);
		}
		return (
			<div>
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
				<div className="input-wrap mb-10">
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
				</div>
				{this.renderError()}
				<div className="BottomBtn-wrap fixed">
					<button
						className="btn-bottom"
						onClick={this.handleSubmitFindId}
					>
						확인
					</button>
				</div>
			</div>

		);
	}
}

export default FindId;