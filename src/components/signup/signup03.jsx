import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import Popup from '../common/popup';
import { checkEmailSignUp } from '../../services/authSevice';
import { isHANGUL, checkPassword, checkEnglishNumber, checkSpace } from '../../commons/common';
const step2 ="SignUp2";
const step3 = "SignUp3";
const step4 ="SignUp4";
@inject('rootStore')
@observer

class SignUp02 extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: {
				username: this.props.dataInput.username || "",
				password: this.props.dataInput.password || "",
				password_confirmation: this.props.dataInput.password_confirmation || ""
			},
			addClass: "fail",
			addClassPass: "fail",
			addClassComfirmPass: "fail",
			modalIsOpen: "",
			messageError: '',
		}
	}

	componentDidMount() {
		var { username, password, password_confirmation } = this.props.dataInput;
		if(username && password && password_confirmation ){
			this.setState({
				addClass: "success",
				addClassPass: "success",
				addClassComfirmPass: "success",
			});
		}
	}

	handleChangeUserName = () => {
		const { username } = this.state.data;
		let addClass = "success";

		if (!isHANGUL(username)) {
			addClass = "fail";
		}

		if (username.trim().length < 4 || username.trim().length > 16 || !checkPassword(username)) {
			addClass = "fail";
		}

		if (!checkEnglishNumber(username)) {
			addClass = "fail";
		}

		this.setState({
			addClass
		});
	}

	handleChangePassword = () => {
		const { password } = this.state.data;
		let addClassPass = "success";
		if (password.trim().length < 4 || password.trim().length > 20) {
			addClassPass = "fail";	
		}
		
		this.setState({
			addClassPass
		});
	}

	handleChangeComfirmPassword = () => {
		const { password_confirmation, password } = this.state.data;
		let addClassComfirmPass = "success";

		if (!password_confirmation.trim()) {
			addClassComfirmPass = "fail";
		}

		if (password_confirmation !== password) {
			addClassComfirmPass = "fail";
		}

		this.setState({
			addClassComfirmPass
		});
	}

	handleChangeData = (data) => {
		if (data.password) {
			if (data.password.indexOf(' ') !== -1) {
				return;
			}
		}

		if (data.password_confirmation) {
			if (data.password_confirmation.indexOf(' ') !== -1) {
				return;
			}
		}

		this.setState({
			data: {
				...this.state.data,
				...data
			},
		}, () => {
			this.handleChangeUserName();
			this.handleChangePassword();
			this.handleChangeComfirmPassword();
			this.props.handleChangeStep({ step: step3, data: this.state.data });
		});
	}

	handleData = () => {
		var { username, password, password_confirmation } = this.state.data;
		this.setState({
			data: {
				username,
				password,
				password_confirmation
			}
		});

		if (this.state.data.username.length > 0 ) {
			this.handleCheckUserName();
		}
	}

	handleChange = (data) => {
		this.setState({
			...data
		});
	}

	handleCheckUserName = async () =>{
		var username = this.state.data.username;
		let checkUserName = await checkEmailSignUp(username);
		this.setState({
			isLoading: true
		});
		if (checkUserName.data) {
			this.setState({
				addClass : "fail"
			});
			this.handleChange({ modalIsOpen: 'active', messageError: checkUserName.message, isLoading: false });
			return;
		}
		
		this.props.handleChangeStep({ step: step4, data: this.state.data });
	}

	render() {
		const { username, password, password_confirmation } = this.state.data;
		const { addClass, addClassPass, addClassComfirmPass, modalIsOpen, messageError, } = this.state;
		const blockButton = (addClass === "success" && addClassPass === "success" && addClassComfirmPass === "success") ? "BottomBtn-wrap fixed " : "BottomBtn-wrap fixed off";
		const disabledButton = !(addClass === "success" && addClassPass === "success" && addClassComfirmPass === "success") ? true : false;
		return (
			<div>
				<div className="wrapper">
					<header>
						<div className="header-wrap">
							<div className="ico-back"
								onClick={() => this.props.backStep({ step: step2 })}>
								<Link to={"/signup"} />
							</div>
							<div className="SubPage-title ">
								<h2>회원가입</h2>
							</div>
						</div>
					</header>
					<div className="content-body">
						<div className="Sub-Container">
							<div className="SubContent-wrap paddingTop-wrap">
								<div className="input-wrap">
									<label className="input-title">
										아이디(ID)
									</label>
									<div className={"basic-input " + addClass}>
										<input
											value={username}
											type="text"
											placeholder="아이디를 입력하세요"
											onKeyPress={(e) => checkSpace(e)}
											onChange={(e) => this.handleChangeData({ username: e.target.value })}
										/>
										{addClass === "fail" && <i className="ressetValue" onClick={() => this.handleChangeData({ username: "" })}></i>}
									</div>
									<span className="alert-massage">영문(소) 또는 영문(소) + 숫자 조합 4자리 이상 16자 이하</span>
								</div>
								<div className="input-wrap">
									<label className="input-title">
										비밀번호
									</label>
									<div className={"basic-input " + addClassPass}>
										<input
											type="password"
											placeholder="비밀번호를 입력하세요"
											value={password}
											onChange={(e) => this.handleChangeData({ password: e.target.value })}
										/>
										{addClassPass === "fail" && <i className="ressetValue" onClick={() => this.handleChangeData({ password: "" })}></i>}
									</div>
									<span className="alert-massage">영문 또는 영문 + 숫자 조합 4자리 이상 20자 이하</span>
								</div>
								<div className="input-wrap">
									<label className="input-title">
										비밀번호 확인
									</label>
									<div className={"basic-input " + addClassComfirmPass}>
										<input
											type="password"
											placeholder="비밀번호를 다시 입력하세요"
											value={password_confirmation}
											onChange={(e) => this.handleChangeData({ password_confirmation: e.target.value })}
											onKeyPress={(e) => checkSpace(e)}
										/>
										{addClassComfirmPass === "fail" && <i className="ressetValue" onClick={() => this.handleChangeData({ password_confirmation: "" })}></i>}
									</div>
								</div>
								<div className={blockButton}>
									<button className="btn-bottom"
										disabled={disabledButton}
										onClick={this.handleData}
									>
										다음
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

export default SignUp02;