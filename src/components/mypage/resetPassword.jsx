import React, { Component } from 'react';
import Header from '../common/header';
import { checkLengthPassword } from '../../commons/common';
import Popup from '../common/popup';
import { inject, observer } from 'mobx-react';
import _ from "lodash";
import { Redirect } from 'react-router-dom';
import Loading from '../common/loading';

@inject('rootStore')
@observer

class ResetPassword extends Component {
	constructor(props) {
		super(props);
		this.rootStore = this.props.rootStore;
		this.state = {
			password: "",
			new_password: "",
			confirm_password: "",
			error_password: "",
			error_new_password: "",
			error_confirm_password: "",
			redirect: false,
			modalIsOpens: "",
			content: "",
			isLoading: false
		}
	}

	handleChange = (data) => {
		if (data.password) {
			if (data.password.indexOf(' ') !== -1) {
				return;
			}
		}

		if (data.new_password) {
			if (data.new_password.indexOf(' ') !== -1) {
				return;
			}
		}

		if (data.confirm_password) {
			if (data.confirm_password.indexOf(' ') !== -1) {
				return;
			}
		}

		this.setState({
			...data,
			error_password: "",
			error_new_password: "",
			error_confirm_password: ""
		});
	}

	validSubmit = () => {
		const { password, new_password, confirm_password } = this.state;
		let isError = true;

		if (password.length === 0) {
			this.setState({
				error_password: "암호 입력하세요."
			});
			isError = false;
		} else {
			if (!checkLengthPassword(password)) {
				this.setState({
					error_password: "비밀번호 다시 확인 입력하세요."
				});
				isError = false;
			}
		}

		if (new_password.length === 0) {
			this.setState({
				error_new_password: "새로운 암호 입력하세요."
			});
			isError = false;
		} else {
			if (!checkLengthPassword(new_password)) {
				this.setState({
					error_new_password: "형식에 맞지 않는 비밀번호 입니다."
				});
				isError = false;
			}
		}

		if (confirm_password.length === 0) {
			this.setState({
				error_confirm_password: "확인 비밀번호를 입력하세요."
			});
			isError = false;
		} else {
			if (new_password !== confirm_password) {
				this.setState({
					error_confirm_password: "비밀번호 확인이 일치하지 않습니다."
				});
				isError = false;
			}
		}
		return isError;
	}

	handleSubmit = async () => {
		if (this.validSubmit()) {
			this.setState({
				isLoading: true
			});
			let user_id = ''
			this.rootStore.userStore.getUser().then(user => {
				user_id = user.id;
				var { password, new_password, confirm_password } = this.state;
				var data = {
					old_password: password,
					new_password: new_password,
					new_password_confirmation: confirm_password
				}
				this.props.rootStore.userStore.resetPassword(user_id, data).then(response => {
					if (_.size(response.data)) {
						this.setState({
							redirect: true,
							isLoading: false
						});
					} else {
						this.setState({
							content: response.message,
							isLoading: false
						});
						this.handleChange({ modalIsOpens: 'active' });
					}
				}).catch(err => {
					this.setState({
						isLoading: false
					});
				});

			}).catch(err => {
				this.setState({
					isLoading: false
				});
			});

		}
	}

	renderLoading = () => {
		const { isLoading } = this.state;

		if (isLoading) {
			return (
				<Loading loading={this.state.isLoading} loadingOverlayDiv={true} />
			);
		}
	}

	render() {
		const {
			password,
			new_password,
			confirm_password,
			error_password,
			error_new_password,
			error_confirm_password,
			modalIsOpens,
			content,
			redirect,
			isLoading
		} = this.state;

		if (redirect) {
			return <Redirect to='/mypage' />
		}

		return (
			<div className="wrapper">
				<Loading loading={isLoading} />
				<Header
					title="비밀번호 수정하기"
					link="/mypage"
					isLink={true}
					classes=""
					classLink=""
					classHeader="header-wrap"
				/>
				<div className="content-body">
					<div className="main-Container">
						<div className="content-wrap paddingTop-wrap">
							<div className="input-wrap">
								<label className="input-title">
									현재 비밀번호
              					</label>
								<div className="basic-input">
									<input
										type="password"
										placeholder="현재 비밀번호를 입력하세요."
										value={password}
										onChange={(e) => this.handleChange({ password: e.target.value })}
									/>
									<div className="mt-2">
										<span className="text-danger-error" role="alert">{error_password}</span>
									</div>
								</div>
							</div>
							<div className="input-wrap">
								<label className="input-title">
									새 비밀번호
              					</label>
								<div className="basic-input">
									<input
										type="password"
										placeholder="새 비밀번호를 입력하세요."
										value={new_password}
										onChange={(e) => this.handleChange({ new_password: e.target.value })}
									/>
									<div className="mt-2">
										<span className="text-danger-error" role="alert">{error_new_password}</span>
									</div>
								</div>
							</div>
							<div className="input-wrap">
								<label className="input-title">
									새 비밀번호 확인
              					</label>
								<div className="basic-input">
									<input
										type="password"
										placeholder="새 비밀번호를 다시 입력하세요."
										value={confirm_password}
										onChange={(e) => this.handleChange({ confirm_password: e.target.value })}
									/>
									<div className="mt-2">
										<span className="text-danger-error" role="alert">{error_confirm_password}</span>
									</div>
								</div>
								<span className="alert-massage">※ 영문 또는 영문 + 숫자 조합 4자리 이상 20자 이하</span>
							</div>
							<div className="BottomBtn-wrap fixed">
								<button
									className="btn-bottom"
									onClick={this.handleSubmit}
								>
									수정하기
								</button>
							</div>
						</div>
					</div>
				</div>
				<Popup
					classPopup="pop-wrap"
					classActive={modalIsOpens}
					isClose={true}
					handleClose={() => this.handleChange({ modalIsOpens: "" })}
				>
					<div className="pop-head">
						<h2>알림</h2>
					</div>
					<div className="pop-content normal">
						<p>
							{content}
						</p>
					</div>
					<div className="pop-footer">
						<button
							className="agree"
							onClick={() => this.handleChange({ modalIsOpens: "" })}
						>확인</button>
					</div>
				</Popup>
			</div>
		)
	}
}

export default ResetPassword;