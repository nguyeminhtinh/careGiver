import React, { Component } from "react";
import login_logo from "../../public/images/login_logo.png";
import ico_id from "../../public/images/ico_id.png";
import ico_close from "../../public/images/ico_close2.png";
import ico_password from "../../public/images/ico_password.png";
import social_item from "../../public/images/social_item.png";
import Popup from "../common/popup";
import { observer, inject } from "mobx-react";
import { Redirect, withRouter, Link } from "react-router-dom";
import { LOCALSTORAGE_ACCESS_TOKEN } from "../../commons/constants";
import { toJS } from 'mobx';

@withRouter
@inject("rootStore")
@observer
class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dataLogin: {
				username: localStorage.username || "",
				password: localStorage.password || "",
				remember: localStorage.remember || false
			},
			dataSearch: [],
			modalOpen: "",
			errorPassword: "",
			errorUsername: "",
			messageError: "",
			isShow: true,
		};
	}

	async componentDidMount() {
		try {
			if (localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN)) {
				this.props.rootStore.userStore.autoLogin();
				this.props.rootStore.sessionStore.authenticate();
			}
		} catch (error) {
			console.log(error);
		}
	}


	handleChangeData = (username) => {
		this.setState({
			dataLogin: {
				...this.state.dataLogin,
				username
			},
			errorUsername: "",
			errorPassword: "",
			isShow: true
		}, () =>{
			this.handleListUserName();
		});
	}

	handleOnFocus = () => {
		this.setState({
			isShow: true
		}, () =>{
			if(this.isAddClass){
				this.isAddClass.classList.remove("d-none")
			}
		});
	}

	handleOnFocusBody = () => {
		if(this.isAddClass && !this.state.isShow){
			this.isAddClass.classList.add("d-none")
		}
	}

	handleOnFocusOut = () => {
		this.setState({
			isShow: false
		});
	}

	handleListUserName = () => {
		let dataSearch = toJS(this.props.rootStore.userStore.listUser);
		let { username } = this.state.dataLogin;
		if (username && username.trim().length > 0) {
			dataSearch = dataSearch.filter(item => item.indexOf(username.toLowerCase()) !== -1);
		} else {
			dataSearch = [];
		}
		this.setState({
			dataSearch,
		});
	}

	handleChangeDataLogin = data => {
		this.setState({
			dataLogin: {
				...this.state.dataLogin,
				...data
			},
			errorUsername: "",
			errorPassword: ""
		});
	};

	handleChange = data => {
		this.setState({
			...data
		});
	};

	renderError = message => {
		return (
			<span className="invalid-feedback" role="alert">
				<strong>{message}</strong>
			</span>
		);
	};

	renderClose = (value, data) => {
		if (value.trim().length !== 0) {
			return (
				<img src={ico_close} alt="" className="mr-0 ml-2" onClick={() => this.handleChangeDataLogin(data)} />
			)
		}
	}

	validSubmit = () => {
		const { username, password } = this.state.dataLogin;
		let isError = false;

		if (username.trim().length === 0) {
			this.setState({
				errorUsername: "아이디를 입력해주세요."
			});
			isError = true;
		}

		if (password.trim().length === 0) {
			this.setState({
				errorPassword: "비밀번호를 입력해주세요."
			});
			isError = true;
		}

		return isError;
	};

	handleSubmit = () => {
		const { sessionStore } = this.props.rootStore;
		if (this.validSubmit()) {
			return;
		}
		const { userStore } = this.props.rootStore;
		userStore.login(
			this.state.dataLogin.username,
			this.state.dataLogin.password,
			this.state.dataLogin.remember
		).then(data => {
			let response = data;
			 if(response.data.data && response.data.data.user.role !== "caregiver") {
				this.setState({
					modalOpen: "active",
					messageError: "로그인 권한이 없습니다.",
				});
				return;
			}
			
			if (response.data.data && response.data.data.user.role === "caregiver") {
				this.props.rootStore.userStore.addListAutoComplete(this.state.dataLogin.username);
				sessionStore.authenticate();
			}else{
				this.setState({
					modalOpen: "active",
					messageError: response.data.errors && response.data.errors.message.replace(/<br>/gi,"\n"),
				});
			}

		}).catch(error => {
			this.setState({
				modalOpen: "active",
				messageError: "회원 가입이 관리자에 의해 거절됐습니다. \n 정보를 다시 확인하고 가입 신청해주세요."
			})
		});
	};

	handleClickAutoComplete = (item) => {
		this.setState({
			dataLogin: {
				...this.state.dataLogin,
				username: item
			},
			dataSearch: []
		});
	}

	renderAutoComplete = () => {
		const { dataSearch } = this.state;
		if (dataSearch.length ) {
			return (
				<ul className="list-autocomplete" ref = {(input) => this.isAddClass = input}>
					{this.renderItem(dataSearch)}
				</ul>
			);
		}
	}

	renderItem = (dataSearch) => {
		let html = [];

		dataSearch.map((item, index) => {
			html.push(<li key={index} onClick={() => this.handleClickAutoComplete(item)}>{item}</li>);
			return item;
		});

		return html;
	}

	render() {
		const { username, password, remember } = this.state.dataLogin;
		const { errorUsername, errorPassword, modalOpen, messageError } = this.state;
		const { sessionStore } = this.props.rootStore;
		const { from } = this.props.location.state || { from: { pathname: "/" } };
		const redirectToReferrer = sessionStore.redirectToReferrer;

		if (redirectToReferrer) {
			return (
				<Redirect to={from} />
			);
		}

		return (
			<div className="wrapper">
				<div className="content-body" onClick={this.handleOnFocusBody} >
					<div className="main-Container pt-80">
						<div className="content-wrap login-wrap">
							<div className="login-content-wrap">
								<div className="logo-header">
									<img src={login_logo} alt="" />
								</div>
								<div className="LoginInput-wrap input-complete">
									<img src={ico_id} alt="" />
									<input
										type="text"
										placeholder="아이디를 입력하세요."
										value={username}
										onChange={e =>
											this.handleChangeData(e.target.value)
										}
										onFocus={this.handleOnFocus}
										onBlur={this.handleOnFocusOut}
									/>
									{this.renderAutoComplete()}
									{this.renderClose(username, { username: "" })}
								</div>
								{this.renderError(errorUsername)}
								<div className="LoginInput-wrap">
									<img src={ico_password} alt="" />
									<input
										type="password"
										placeholder="비밀번호를 입력하세요."
										value={password}
										onChange={e =>
											this.handleChangeDataLogin({ password: e.target.value })
										}
									/>
									{this.renderClose(password, { password: "" })}
								</div>
								{this.renderError(errorPassword)}
								<button className="btn-login" onClick={this.handleSubmit}>
									로그인
                				</button>
								<div className="checkbox-wrap">
									<input
										type="checkbox"
										id="remember"
										name="remember"
										defaultChecked={remember ? "checked" : ""}
										onChange={e =>
											this.handleChangeDataLogin({ remember: e.target.checked })
										}
									/>
									<label htmlFor="remember">
										<span className="checkbox-custom" />
										<span className="checkbox-label">자동 로그인</span>
									</label>
								</div>
								<div className="social-login-wrap">
									<ul className="social-FindInfo">
										<li>
											<Link to="/signup">회원가입</Link>
										</li>
										<li>
											<Link to="/findpassword?type=1">아이디 <br /> 찾기</Link>
										</li>
										<li>
											<Link to="/findpassword?type=2">비밀번호 <br /> 찾기</Link>
										</li>
									</ul>

									<div className="social-content-wrap mb-4">
										<div className="social-title-wrap">
											<div className="FakeLine FakeLineLeft" />
											<h2 className="social-title">상담하기</h2>
											<div className="FakeLine FakeLineRight" />
										</div>
										<ul className="social-btn social-btn-ver2">
											<li>
												<a href="https://pf.kakao.com/_Gqqfj">
													<img src={social_item} alt="" />
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Popup
					classPopup="pop-wrap"
					classActive={modalOpen}
					isClose={true}
					handleClose={() => this.handleChange({ modalOpen: "" })}
				>
					<div className="pop-head">
						<h2>알림</h2>
					</div>
					<div className="pop-content normal pre-line">
						<p>
							{messageError}
						</p>
					</div>
					<div className="pop-footer">
						<button
							className="agree"
							onClick={() => this.handleChange({ modalOpen: "" })}
						>
							확인
            			</button>
					</div>
				</Popup>
			</div>
		);
	}
}

export default Login;
