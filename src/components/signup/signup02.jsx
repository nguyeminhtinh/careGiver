import React, { Component } from 'react';
import CountDown from '../common/countDown';
import Cleave from 'cleave.js/react';
import { Link } from 'react-router-dom';
import Popup from '../common/popup';
import { checkPhoneNumber } from '../../services/authSevice';
import { sendSmsCode, checkSmsCode } from '../../services/authSevice';
import { Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { isIOS } from "react-device-detect";
const step1 = "SignUp1";
const step2 = "SignUp2";
const step3 = "SignUp3";
@inject('rootStore')
@observer

class SignUp04 extends Component {

	rootStore;
	constructor(props) {
		super(props);
		this.rootStore = this.props.rootStore;
		this.state = {
			data: {
				phone: this.props.dataInput.phone || "",
				sms_code: this.props.dataInput.sms_code || "",
				time: this.props.dataInput.time || 0,
				isVerify: this.props.dataInput.isVerify || false
			},
			addClassPhone: this.props.dataInput.addClassPhone || "fail",
			modalIsOpen: "",
			messageError: '',
			isLoading: false, 
			isSend: true
		}
	}

	componentDidMount() {
		var { phone } = this.props.dataInput;
		if (phone.length === 13) {
			this.setState({
				addClassPhone: "success",
			});
		}
	}

	handleChangePhone = () => {
		const { phone } = this.state.data;
		let addClassPhone = "success";

		if (phone.length !== 13) {
			addClassPhone = "fail";
		}

		this.setState({
			addClassPhone
		});
	}

	handleSendSmsCode = async () => {
		const { phone } = this.state.data;
		this.setState({isSend: false});
		if (this.state.isSend) {
			let checkPhone = await checkPhoneNumber(phone);
		
			if (checkPhone.data) {
				this.setState({isSend: true});
				this.handleChange({ modalIsOpen: 'active', messageError: checkPhone.message });
				return;
			}
	
			try {
				let response = await sendSmsCode(phone);
	
				if (response.data && response.data.error_cnt === 0) {
					this.handleChangeData({
						time: 180000
					});
				} else {
					this.setState({
						modalIsOpen: 'active',
						title: '알림',
						messageError: response.message,
						isSend: true
					});
				}
			} catch (error) {
				console.log(error);
			}
		}
		
	}

	renderButtonPhone = () => {
		const { phone, time, isVerify } = this.state.data;
		let second = ('0' + Math.floor((time / 1000) % 60)).slice(-2);
		let minute = ('0' + Math.floor((time / 1000 / 60) % 60)).slice(-2);
		if (isVerify) {
			return null;
		}

		if (time <= 0) {
			return (
				<button
					className={`btn-accept  ${phone.length !== 13 ? 'btn-certification' : ''} ${isVerify ? 'btn-certification' : ''}`}
					disabled={phone.length !== 13 ? true : isVerify ? true : false}
					onClick={this.handleSendSmsCode}
				>인증번호 발송</button>
			);
		}

		return (
			<CountDown
				time={time}
				second={second}
				minute={minute}
				handleChange={this.handleChangeData}
			/>
		);
	}

	handleChange = (data) => {
		this.setState({
			...data
		});
	}

	renderButtonSubmit = () => {
		const { sms_code, isVerify, time } = this.state.data;

		if (isVerify) {
			return (
				<p className="text-success">인증완료</p>
			);
		}

		return (
			<button
				className={`btn-accept  ${sms_code.trim().length === 0 ? 'btn-certification' : ''} ${isVerify ? 'btn-certification' : ''}`}
				disabled={sms_code.trim().length === 0 ? true : false || time===0? true: false }
				onClick={this.handleSubmitCode}
			>확인</button>
		);
	}

	handleSubmitCode = async () => {
		const { phone, sms_code } = this.state.data;

		try {
			let response = await checkSmsCode(phone, sms_code);
			if (response.status === 200) {
				this.handleChangeData({ isVerify: true, time: 0 });
			} else {
				this.handleChange({
					modalIsOpen: 'active',
					messageError: response.data.message
				});
			}
		} catch (error) {
			console.log(error);
		}
	}

	handleChangeData = (data) => {
		this.setState({
			data: {
				...this.state.data,
				...data
			},
		}, () => {
			if (data.time === 0) {
				this.setState({isSend: true});
			}
			this.props.handleChangeStep({ step: step2, data: this.state.data });
			this.handleChangePhone();
		});
	}

	handleData = () => {
		var { phone, sms_code }  = this.state.data;
			this.setState({
				data:{
					phone,
					sms_code,
					time: 0,
					isVerify: true,
					addClassPhone: "success"
				}
			});
		this.props.handleChangeStep({ step: step3, data: this.state.data });
	}

	render() {
		const { phone, sms_code, isVerify, time } = this.state.data;
		const {  addClassPhone } = this.state;
		const { modalIsOpen, messageError, redirect } = this.state;

		if (redirect) {
			return <Redirect to='/signup/success' />
		}

		return (
			<div>

				<div className="wrapper">
					<header>
						<div className="header-wrap">
							<div className="ico-back"
								onClick={() => this.props.backStep({ step: step1 })}>
							<Link to={"/signup"} />
							</div>
							<div className="SubPage-title ">
								<h2>회원가입</h2>
							</div>
						</div>
					</header>
					<div className="content-body singUp">
						<div className="Sub-Container">
							<div className="SubContent-wrap paddingTop-wrap">
								<div className="input-wrap phone-wrap">
									<label className="input-title">
										휴대전화 번호
									</label>
									<div className={"phone-wrap phone-input basic-input " + addClassPhone}>
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
											onChange={(e) => this.handleChangeData({ phone: e.target.value })}
											disabled={isVerify ? true : time === 0 ? false : true}
										/>
										{addClassPhone === "fail" && <i className="ressetValue" onClick={() => this.handleChangeData({ phone: "" })}></i>}
										{this.renderButtonPhone()}
									</div>
								</div>
								<div className="input-wrap">
									<div className="basic-input phone-input">
										<input
											type="text"
											placeholder="인증번호를 입력하세요"
											disabled={phone.trim().length === 0 ? true : isVerify ? true : false || time === 0 ? true : false}
											value={sms_code}
											onChange={(e) => this.handleChangeData({ sms_code: e.target.value })}
										/>
										{this.renderButtonSubmit()}
									</div>
								</div>
								<div className={isVerify ? "BottomBtn-wrap fixed": "BottomBtn-wrap fixed off"}>
									<button className="btn-bottom"
										onClick = {this.handleData}
										disabled ={!isVerify ? true: false }
									>
										회원가입 완료
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Popup
					classPopup="pop-wrap"
					classActive={modalIsOpen}
					isClose={true}
					handleClose={() => this.handleChange({ modalIsOpen: "" })}
				>
					<div className="pop-head">
						<h2>알림</h2>
					</div>
					<div className="pop-content normal">
						<p>
							{messageError}
						</p>
					</div>
					<div className="pop-footer">
						<button
							className="agree"
							onClick={() => this.handleChange({ modalIsOpen: "" })}
						>확인</button>
					</div>
				</Popup>
			</div>
		)
	}
}

export default SignUp04;