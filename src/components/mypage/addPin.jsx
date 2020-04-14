import React, { Component } from 'react';
import Header from '../common/header';
import { inject, observer } from 'mobx-react';
import { addPinNumber } from '../../services/authSevice';
import { isIOS } from "react-device-detect";
import Popup from '../common/popup';
import { Redirect } from 'react-router-dom';
import Cleave from 'cleave.js/react';
import Loading from '../common/loading';
import pin_number from '../../public/images/pin_lock.png';
import { withRouter } from 'react-router';
import { toJS } from 'mobx';
@withRouter
@inject('rootStore')
@observer
class AddPin extends Component {
	rootStore;
	constructor(props) {
		super(props);
		this.rootStore = this.props.rootStore;
		this.state = {
			data: {
				number1: "",
				number2: "",
				number3: "",
				number4: "",
				number5: "",
				number6: "",
				number7: "",
				number8: ""
			},
			idUser: "",
			modalIsOpens: "",
			messageError: "",
			modalIsOpens2: "",
			isLoading: false,
			step: false,
			redirect: false,
			redirectEdit: false,
			isStar1: false,
			isStar2: false,
			isStar3: false,
			isStar4: false,
		}
	}

	async componentWillMount() {
		let user = toJS(this.rootStore.userStore.user);
		if (user.pin !== null) {
			this.setState({
				redirectEdit: true
			});
		}
		this.setState({
			idUser: user.id
		});
	}

	handleFocus1 = () => {
		if (this.getInput1.value !== '') {
			setTimeout(() => {
				this.setState({
					isStar1: true
				});
			}, 100);

			this.getInput2.focus();
		} else {
			this.setState({
				isStar1: false
			});
		}

		if (this.getInput2.value !== '') {
			setTimeout(() => {
				this.setState({
					isStar2: true
				});
			}, 100);
			this.getInput3.focus();
		} else {
			this.setState({
				isStar2: false
			});
		}

		if (this.getInput3.value !== '') {
			setTimeout(() => {
				this.setState({
					isStar3: true
				});
			}, 100);
			this.getInput4.focus();
		} else {
			this.setState({
				isStar3: false
			});
		}

		if (this.getInput4.value !== '') {
			setTimeout(() => {
				this.setState({
					isStar4: true
				});
			}, 100);
			this.getInput4.blur();
		} else {
			this.setState({
				isStar4: false
			});
		}

		if (this.getInput1.value && this.getInput2.value && this.getInput3.value && this.getInput4.value) {
			this.setState({
				isLoading: true
			});
		}
	}

	handleChangePinNumber = () => {
		var { number1, number2, number3, number4 } = this.state.data;
		var checkNumber = number1 && number2 && number3 && number4;

		if (checkNumber) {
			setTimeout(() => {
				this.setState({
					step: true,
					isLoading: false,
					isStar1: false,
					isStar2: false,
					isStar3: false,
					isStar4: false,
				});
				this.getInput1.focus();
			}, 200);
		}
	}

	handleChangePinNumberRetype = async () => {
		const { number1, number2, number3, number4, number5, number6, number7, number8 } = this.state.data;
		var numberFirst = number1 + number2 + number3 + number4,
			checkNumber = number5 && number6 && number7 && number8;
		if (checkNumber) {
			if (numberFirst !== (number5 + number6 + number7 + number8)) {
				setTimeout(() => {
					this.handleChange({ modalIsOpens: 'active', messageError: '핀 번호가 일치 하지 않습니다. \n다시 한번 확인해주세요.', isLoading: false });
				}, 100);
				return;
			}
			try {
				let response = await addPinNumber(this.state.idUser, numberFirst);
				this.setState({
					isLoading: true
				});
				if (response.status === 200) {
					this.props.rootStore.userStore.getUser().then(response => {
						this.props.rootStore.userStore.setUser(response);
						this.setState({
							isLoading: false
						});
						this.handleChange({
							modalIsOpens2: 'active',
						});
					}).catch(err => {
						this.setState({
							isLoading: false
						});
					});

				} else {
					this.handleChange({
						modalIsOpen: 'active',
						messageError: response.data.data.message,
						isLoading: false,
					});
				}
			} catch (error) {
				console.log(error);
				this.setState({
					isLoading: false
				});
			}
		}
	}

	handleChangePrev = () => {
		this.setState({
			data: {
				number1: "",
				number2: "",
				number3: "",
				number4: "",
				number5: "",
				number6: "",
				number7: "",
				number8: ""
			},
			isStar1: false,
			isStar2: false,
			isStar3: false,
			isStar4: false,
			step: false
		});

		this.handleChange({
			modalIsOpens: ''
		});
	}

	handleChangeSucess = () => {
		this.setState({
			redirect: true
		});
	}

	handleChangeData = (data) => {
		this.setState({
			data: {
				...this.state.data,
				...data
			},
		}, () => {
			this.handleChangePinNumber();
		});
		this.handleFocus1();
	}

	handleChangeDataRetype = (data) => {
		this.setState({
			data: {
				...this.state.data,
				...data
			},
		}, () => {
			this.handleChangePinNumberRetype();
		});
		this.handleFocus1();
	}

	handleChange = (data) => {
		this.setState({
			...data,
		});
	}

	renderPageNew = () => {
		const { number1, number2, number3, number4 } = this.state.data;
		const { isStar1, isStar2, isStar3, isStar4 } = this.state;
		if (this.state.redirectEdit) {
			return <Redirect to='/mypage/editpin' />
		}
		return (
			<div className="wrapper">
				<Loading loading={this.state.isLoading} />
				<Header
					title="통장 비밀번호 등록/수정"
					link="/mypage"
					isLink={true}
					classes=""
					classLink=""
					classHeader="header-wrap"
				/>
				<div className="content-body">
					<div className="main-Container">
						<div className="content-wrap">
							<div className="pin-content-wrap">
								<div className="main-item">
									<img src={pin_number} alt="pin" />
									<p>통장 비밀번호를 입력해주세요.</p>
								</div>
								<div className="input-box">
									<div className="input-box-wrap">
										<Cleave
											id="input1"
											className={isStar1 ? "color-fff" : ""}
											placeholder="*"
											options={{
												numericOnly: true,
												blocks: [1]
											}}
											autoComplete="off"
											htmlRef={input => this.getInput1 = input}
											pattern="[0-9]*"
											inputMode={isIOS ? "" : "numeric"}
											value={number1}
											autoFocus={true}
											onChange={(e) => this.handleChangeData({ number1: e.target.value })}
										/>
										{isStar1 && <span className="star-1">★</span>}
										<Cleave
											id="input2"
											className={isStar2 ? "color-fff" : ""}
											placeholder="*"
											options={{
												numericOnly: true,
												blocks: [1]
											}}
											autoComplete="off"
											htmlRef={input => this.getInput2 = input}
											pattern="[0-9]*"
											inputMode={isIOS ? "" : "numeric"}
											value={number2}
											onChange={(e) => this.handleChangeData({ number2: e.target.value })}
										/>
										{isStar2 && <span className="star-2">★</span>}
										<Cleave
											id="input3"
											className={isStar3 ? "color-fff" : ""}
											placeholder="*"
											options={{
												numericOnly: true,
												blocks: [1]
											}}
											pattern="[0-9]*"
											inputMode={isIOS ? "" : "numeric"}
											autoComplete="off"
											htmlRef={input => this.getInput3 = input}
											value={number3}
											onChange={(e) => this.handleChangeData({ number3: e.target.value })}
										/>
										{isStar3 && <span className="star-3">★</span>}
										<Cleave
											id="input4"
											className={isStar4 ? "color-fff" : ""}
											placeholder="*"
											options={{
												numericOnly: true,
												blocks: [1]
											}}
											pattern="[0-9]*"
											autoComplete="off"
											htmlRef={input => this.getInput4 = input}
											inputMode={isIOS ? "" : "numeric"}
											value={number4}
											onChange={(e) => this.handleChangeData({ number4: e.target.value })}
										/>
										{isStar4 && <span className="star-4">★</span>}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	renderPageRetype = () => {
		const { modalIsOpens, isLoading, redirect, modalIsOpens2 } = this.state;
		const { number5, number6, number7, number8 } = this.state.data;
		const { isStar1, isStar2, isStar3, isStar4 } = this.state;
		if (redirect) {
			return <Redirect to='/mypage' />
		}
		return (
			<div className="wrapper">
				<Loading loading={isLoading} />
				<Header
					title="통장 비밀번호 등록/수정"
					link="/mypage"
					isLink={true}
					classes=""
					classLink=""
					classHeader="header-wrap"
				/>
				<div className="content-body">
					<div className="main-Container">
						<div className="content-wrap">
							<div className="pin-content-wrap">
								<div className="main-item">
									<img src={pin_number} alt="pin" />
									<p>핀 넘버를 다시 입력해주세요.</p>
								</div>
								<div className="input-box">
									<div className="input-box-wrap">
										<Cleave
											id="input5"
											className={isStar1 ? "color-fff" : ""}
											placeholder="*"
											options={{
												numericOnly: true,
												blocks: [1]
											}}
											pattern="[0-9]*"
											inputMode={isIOS ? "" : "numeric"}
											autoComplete="off"
											htmlRef={input => this.getInput1 = input}
											value={number5}
											autoFocus={true}
											onChange={(e) => this.handleChangeDataRetype({ number5: e.target.value })}
										/>
										{isStar1 && <span className="star-1">★</span>}
										<Cleave
											id="input6"
											className={isStar2 ? "color-fff" : ""}
											placeholder="*"
											options={{
												numericOnly: true,
												blocks: [1]
											}}
											pattern="[0-9]*"
											inputMode={isIOS ? "" : "numeric"}
											autoComplete="off"
											htmlRef={input => this.getInput2 = input}
											value={number6}
											onChange={(e) => this.handleChangeDataRetype({ number6: e.target.value })}
										/>
										{isStar2 && <span className="star-2">★</span>}
										<Cleave
											id="input7"
											className={isStar3 ? "color-fff" : ""}
											placeholder="*"
											options={{
												numericOnly: true,
												blocks: [1]
											}}
											pattern="[0-9]*"
											inputMode={isIOS ? "" : "numeric"}
											autoComplete="off"
											htmlRef={input => this.getInput3 = input}
											value={number7}
											onChange={(e) => this.handleChangeDataRetype({ number7: e.target.value })}
										/>
										{isStar3 && <span className="star-3">★</span>}
										<Cleave
											id="input8"
											className={isStar4 ? "color-fff" : ""}
											placeholder="*"
											options={{
												numericOnly: true,
												blocks: [1]
											}}
											autoComplete="off"
											htmlRef={input => this.getInput4 = input}
											pattern="[0-9]*"
											ref={(input) => this.getn8 = input}
											inputMode={isIOS ? "" : "numeric"}
											value={number8}
											onChange={(e) => this.handleChangeDataRetype({ number8: e.target.value })}
										/>
										{isStar4 && <span className="star-4">★</span>}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<Popup
					classPopup="pop-wrap"
					classActive={modalIsOpens}
					isClose={true}
					handleClose={this.handleChangePrev}
				>
					<div className="pop-head">
						<h2>알림</h2>
					</div>
					<div className="pop-content normal pre-line">
						<p>{this.state.messageError}</p>
					</div>
					<div className="pop-footer">
						<button
							className="agree"
							onClick={this.handleChangePrev}
						>확인</button>
					</div>
				</Popup>

				<Popup
					classPopup="pop-wrap"
					classActive={modalIsOpens2}
					isClose={true}
					handleClose={this.handleChangeSucess}
				>
					<div className="pop-head">
						<h2>알림</h2>
					</div>
					<div className="pop-content normal">
						<p>핀 번호 등록이 완료됐습니다.</p>
					</div>
					<div className="pop-footer">
						<button
							className="agree"
							onClick={this.handleChangeSucess}
						>확인</button>
					</div>
				</Popup>

			</div>
		)
	}

	render() {
		const { step } = this.state;
		if (step) {
			return (
				this.renderPageRetype()
			)
		}
		return (
			this.renderPageNew()
		)
	}
}

export default AddPin;