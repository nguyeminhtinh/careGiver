import React, { Component } from 'react';
import Header from '../../common/header';
import icon_arrow from '../../../public/images/ico_arrow.png';
import ListBank from '../../mypage/listBank.jsx';
import { Link } from 'react-router-dom';
import Cleave from 'cleave.js/react';
import { isIOS } from "react-device-detect";
import Popup from '../../common/popup';
import { Redirect } from 'react-router-dom';
import { observer, inject } from "mobx-react";
import { withRouter } from 'react-router-dom';
import { toJS } from 'mobx';
import Loading from '../../common/loading';
import pin_number from '../../../public/images/pin_lock.png';
import { CheckPinNumber } from '../../../services/authSevice';
import moment from "moment";
import _ from "lodash";
import { splitSpaceOrNewLine } from "../../../commons/common";
@withRouter
@inject('rootStore')
@observer
class Pay extends Component {
	user;
	constructor(props) {
		super(props);

		this.state = {
			modalIsOpen: "",
			errorNumberCard: "",
			errorMoney: "",
			errorBank: "",
			erroMoney: "",
			errorName: "",
			modalIsOpens: "",
			modalTranferBank: "",
			dataCard: {
				numberCard: "",
				bank: {},
				money: "",
			},
			dataPin: {
				nCheck1: "",
				nCheck2: "",
				nCheck3: "",
				nCheck4: ""
			},
			packetCodeTmp: "",
			statePage: 1,
			isLoading: true,
			redirectSuccess: false,
			redirectFail: false,
			redirectPayPin: false,
			closePopUpGoPin: "",
			step: false,
			idUser: "",
			modalIsOpensPin: "",
			listCard: [],
			amoutPay: 0,
			pagePay: true,
			isStar1: false,
			isStar2: false,
			isStar3: false,
			isStar4: false,
		}
	}

	async componentWillMount() {
		let user = await(this.props.rootStore.userStore.getUser())
		if (user && user.id) {
			this.setState({
				idUser: user.id,
				amoutPay: user.amount
			});
		}

		try {
			await this.props.rootStore.paymentStore.getListCardStore(user.id).then(response => {
				this.setState({
					listCard: response.data,
					isLoading: false
				});
			}).catch(error => {
				this.setState({
					isLoading: false
				});
			});
		} catch (error) {
			this.setState({
				isLoading: false
			});
		}
	}

	async componentDidMount() {
		let userStore = this.props.rootStore.userStore;
		this.user = userStore.user;
	}

	handleChange = (data) => {
		this.setState({
			...data
		});
	}

	handleChangeBank = (bank) => {
		this.setState({
			modalIsOpen: "",
			dataCard: {
				...this.state.dataCard,
				bank
			},
			errorBank: "",
		});
	}

	handleChangeData = (data) => {
		this.setState({
			dataCard: {
				...this.state.dataCard,
				...data
			},
			errorNumberCard: "",
			errorBank: "",
			errorMoney: "",
		});
	}

	validateForm = () => {
		const { money, bank, numberCard } = this.state.dataCard;
		let isError = true;
		const {amoutPay} = this.state;

		if (money.length === 0) {
			this.setState({
				errorMoney: "양도 할 금액을 입력하십시오."
			});
			isError = false;
		}

		if (money.toString().indexOf('.') !== -1) {
			this.setState({
				errorMoney: "이체금액을 확인 해주세요."
			});
			isError = false;
		}

		if (money.toString().indexOf('-') !== -1) {
			this.setState({
				errorMoney: "이체금액을 확인 해주세요."
			});
			isError = false;
		}

		if (money.replace(/,/g, "") > amoutPay) {
			this.setState({
				errorMoney: "이체금액을 확인 해주세요."
			});
			isError = false;
		}
		if (parseInt(money) === 0) {
			this.setState({
				errorMoney: "이체금액을 확인 해주세요."
			});
			isError = false;
		}

		if (numberCard.length === 0) {
			this.setState({
				errorNumberCard: "계좌 번호를 입력하십시오."
			});
			isError = false;
		}
		if (numberCard.trim().length < 10 || numberCard.trim().length > 14) {
			this.setState({
				errorNumberCard: "숫자만 입력가능, 최소 10자리~최대 14자리"
			});
			isError = false;
		}
		if (!bank.name) {
			this.setState({
				errorBank: "은행을 선택하십시오."
			});
			isError = false;
		}
		return isError;
	}

	handleSubmit = () => {
		if (this.validateForm()) {
			let { numberCard } = this.state.dataCard;
			var packetCodeTmp = Math.floor(100000 + Math.random() * 900000);
			var currentDate = moment(new Date()).format("MMDD");

			var paymentCheck = {
				"disc_code": "",
				"company_code": "HMCNET01",
				"packet_code": packetCodeTmp.toString(),
				"bank_code": this.state.dataCard.bank.code,
				"bank_date": currentDate.toString(),
				"bank_number": numberCard,
				"user_number": toJS(this.props.rootStore.userStore).user.birthdate.replace(/-/g, ""),
				"is_woori_bank": "N",
				"is_nh_bank": "N",
				"user_id": toJS(this.props.rootStore.userStore).user.id
			}

			this.setState({ isLoading: true, modalIsOpens: "" }, () => {
				this.props.rootStore.paymentStore.checkBankNumber(paymentCheck).then(data => {
					var message = data.message,
						result = message.result;
					var recv_msg = message.RECV_MSG;
					if (result && result.code === 200) {
						var bank_name = splitSpaceOrNewLine(recv_msg)[4];
						this.setState({ bank_name: bank_name });
						this.handlePopup({ modalIsOpens: "active" })
					} else {
						this.setState({ isLoading: false });
						this.handleBankNumberFail();
					}
				}).catch(err => {
					console.log(err)
					this.setState({
						isLoading: false
					})
				})
			})

		}
	}

	handlePopup = (data) => {
		this.setState({
			...data,
		});
	}

	handleBankNumberFail = () => {
		this.setState({
			modalTranferBank: "active"
		});
	}

	closePopUpBankFail = () => {
		this.setState({
			modalTranferBank: ""
		});
	}

	submitForm = async () => {
		this.setState({
			modalIsOpens: ""
		});
		this.setState({ statePage: 2, isLoading: false });
	}

	handleClickPrev = () => {
		this.setState({
			statePage: 2,
			isLoading: false,
			step: false,
			dataPin: {
				nCheck1: "",
				nCheck2: "",
				nCheck3: "",
				nCheck4: ""
			},
			isStar1: false,
			isStar2: false,
			isStar3: false,
			isStar4: false,
		});
	}

	handleClickPrevPage1 = () => {
		this.setState({
			statePage: 1,
			isLoading: false,
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
		}else{
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
		}else{
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
		}else{
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
		}else{
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

	handleChangeCheckPin = async () => {
		var { nCheck1, nCheck2, nCheck3, nCheck4 } = this.state.dataPin;
		var pinNew = nCheck1 + nCheck2 + nCheck3 + nCheck4,
			checkNumber = nCheck1 &&nCheck2 && nCheck3 && nCheck4;
		if (checkNumber) {

			try {
				let response = await CheckPinNumber(this.state.idUser, pinNew);
				this.setState({
					isLoading: true
				});
				if (_.size(response.data) !== 1) {
					this.setState({
						isLoading: true
					});
					this.handleSubmitTranferBank();
				} else {
					setTimeout(() => {
						this.handleChange({ modalIsOpensPin: 'active' });
					}, 100);
				}
			} catch (error) {
				console.log(error);
				this.setState({
					isLoading: false,
					dataPin: {
						nCheck1: "",
						nCheck2: "",
						nCheck3: "",
						nCheck4: ""
					},
					isStar1: false,
					isStar2: false,
					isStar3: false,
					isStar4: false,
				});
			}
		}
	}

	handleChangeDataPin = (data) => {
		this.setState({
			dataPin: {
				...this.state.dataPin,
				...data
			},
		}, () => {
			this.handleChangeCheckPin();
		});
		this.handleFocus1();
	}

	handleCheckPin = () => {
		let user = toJS(this.props.rootStore.userStore).user;
		if (user.pin !== null) {
			this.setState({
				step: true
			});
		} else {
			this.handlePopup({ modalOpenPin: "active" });
		}
	}

	closePopUpGoPin = () => {
		this.setState({
			redirectPayPin: true,
		});
	}
	handleChangeClose = () => {
		this.setState({
			dataPin: {
				nCheck1: "",
				nCheck2: "",
				nCheck3: "",
				nCheck4: "",
			},
			isLoading: false,
			isStar1: false,
			isStar2: false,
			isStar3: false,
			isStar4: false,
		});

		this.handleChange({
			modalIsOpensPin: ''
		});
	}

	handleSubmitTranferBank = () => {

		let amount = this.state.dataCard.money;
		amount = amount.replace(/,/g, '');
		var packetCodeSend = Math.floor(100000 + Math.random() * 900000);
		var numberCard = this.state.dataCard.numberCard;

		var paymentInfo = {
			"disc_code": "",
			"company_code": "HMCNET01",
			"packet_code": packetCodeSend.toString(),
			"bank_code": this.state.dataCard.bank.code,
			"bank_msg": "",
			"bank_number": numberCard,
			"amount": parseInt(amount),
			"user_id": toJS(this.props.rootStore.userStore).user.id,
			"receiver": this.state.bank_name
		}

		this.props.rootStore.paymentStore.tranfer(paymentInfo).then(data => {
			if (data.message.result.code === 200) {
				this.props.rootStore.userStore.getUser().then(response => {
					this.props.rootStore.userStore.setUser(response);
					this.setState({
						isLoading: false,
						redirectSuccess: true
					});
				})
			} else {
				this.setState({ redirectFail: true, isLoading: false });
			}
		}).catch(err => {
			console.log(err)
			this.setState({
				isLoading: false
			});
		});
	}

	renderErrorNumber = () => {
		const { errorMoney } = this.state;

		if (errorMoney.length !== 0) {
			return (
				<div className="w-100 my-2">
					<span className="text-danger-error" role="alert">
						{errorMoney}
					</span>
				</div>
			)
		}
	}

	handleChangeCard = (cardItem) => {
		this.setState({
			dataCard: {
				numberCard: cardItem.number,
				bank: cardItem.bank,
				money: this.state.dataCard.money || "",
			},
			errorNumberCard: "",
			errorBank: ""
		});
	}

	renderListCard = () => {
		const array = this.state.listCard;
		let html = [];
		try {
			if (_.size(array) === 0) {
				html.push(
					<div key={Math.random()} className="d-flex justify-content-center align-items-center result-none mt-5 pt-3 text-center">
						<p className="lineInner">등록된 계좌가 없습니다.<br />계좌번호 관리 페이지를 통하여 등록해주세요.</p>
					</div>
				)
				return html;
			}

			array.map((item, index) => {
				html.push(
					<li key={index} onClick={() => this.handleChangeCard(item)}>
						<p className="list-name">{item.full_name}</p>
						<p className="account-info">
							<span>{item.bank.name}</span>
							<span className="ml-2">{item.number}</span>
						</p>
					</li>
				);
				return item;
			});

			return html;
		} catch (error) {

		}
	}

	_renderMainPage = () => {
		const { errorNumberCard, errorBank, modalIsOpen, modalIsOpens, modalTranferBank , amoutPay} = this.state;
		const { numberCard, bank, money } = this.state.dataCard;
		
		return (
			<div>
				<Header
					title="이체하기"
					link="/passbook"
					isLink={true}
					classes=""
					classLink=""
					classHeader="header-wrap"
				/>
				<div className="content-body">
					<div className="Container main-Container" >
						<div className="my-money">
							<p>나의 잔액</p>
							<p className="mine"><span>{Number(amoutPay).toLocaleString('en')}</span>원</p>
						</div>
						<div className="content-wrap mb-4">
							<div className="pass-content">
								<div className="content-title">
									<h2>이체하기</h2>
									<p>이체시에는 세금, 수수료, 보험료가 제외된 금액이 입금됩니다.</p>
								</div>
								<div className="white-box">

									<div className="bank-wrap">
										<div
											className="bank-choice"
											onClick={() => this.handleChange({ modalIsOpen: 'active' })}
										>
											<input
												type="text"
												placeholder="은행선택"
												defaultValue={bank.name}
												className="p-0 w-100 border-0 bank ml-0"
												disabled
											/>
										</div>
										<div className="basic-input">
											<Cleave
												placeholder="계좌번호 입력"
												options={{
													numericOnly: true,
													blocks: [14]
												}}
												pattern="[0-9]*"
												inputMode={isIOS ? "" : "numeric"}
												value={numberCard}
												onChange={(e) => this.handleChangeData({ numberCard: e.target.value })}
											/>

										</div>
										<div className="d-flex custom-error mb-1">
											<div className="mt-2 erbank">
												<span className="text-danger-error" role="alert">
													{errorBank}
												</span>
											</div>
											<div className="mt-2 ername">
												<span className="text-danger-error" role="alert">
													{errorNumberCard}
												</span>
											</div>
										</div>
									</div>
									<div className="unit-relative">
										<Cleave
											placeholder="이체하실 금액을 입력해주세요."
											options={{
												numeral: true,
												numeralThousandsGroupStyle: 'thousand'
											}}
											pattern="[0-9]*"
											inputMode={isIOS ? "" : "numeric"}
											value={money}
											onChange={(e) => this.handleChangeData({ money: e.target.value })}
											className="btn-input mb-0"
										/>

										<div className="unit">원</div>
									</div>
									{this.renderErrorNumber()}

									<ul>
										<li className="first-list">국내 은행이체는 당일 처리 가능.</li>
										<li>국외 은행의 경우 해외송금이 몇 일 더 걸릴 수 있습니다.</li>
									</ul>
								</div>
							</div>

							<div className="account-list">
								<div className="input-wrap">
									<label className="input-title">
										등록된 계좌정보
									</label>
									<button>
										<Link to={{
											pathname: "/mypage/account",
											state: {
												...this.state
											}}}>
											계좌번호 관리<img src={icon_arrow} alt="" />
										</Link>
									</button>
								</div>
								<div className="list-content list-payment">
									<ul>
										{this.renderListCard()}
									</ul>
								</div>
							</div>
							<div className="positionBottom">
								<div className="BottomBtn-wrap">
									<button
										className="btn-bottom"
										onClick={this.handleSubmit}
									>
										이체하기</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<ListBank
					modalIsOpen={modalIsOpen}
					handleChange={this.handleChange}
					handleChangeBank={this.handleChangeBank}
				/>
				<Popup
					classPopup="pop-wrap v2"
					classActive={modalIsOpens}
					isClose={true}
					handleClose={() => this.handlePopup({ modalIsOpens: "", isLoading: false })}
				>
					<div className="pop-head">
						<h2>{this.state.bank_name}</h2>
						<p className="overflowHide"><span>{this.state.dataCard.bank.name}</span><span className="mx-1">|</span><span>{this.state.dataCard.numberCard}</span></p>
					</div>
					<div className="pop-content normal">
						<span className="graybar"></span>
						<p className="money">이체 금액 {(this.state.dataCard.money)}원</p>
						<p>받는 분의 이름, 계좌번호를 확인해주세요.</p>
					</div>
					<div className="pop-footer btn-2">
						<button
							className="agree"
							onClick={this.submitForm}
						>이체하기</button>
						<button
							className="cancel"
							onClick={() => this.handlePopup({ modalIsOpens: "", isLoading: false })}
						>취소</button>
					</div>
				</Popup>
				<Popup
					classPopup="pop-wrap"
					classActive={modalTranferBank}
					isClose={true}
					handleClose={() => this.handlePopup({ modalTranferBank: "", isLoading: false })}
				>
					<div className="pop-content normal">
						<p>계좌 조회를 실패했습니다</p>
						<p>계좌정보를 다시 확인해주세요</p>
					</div>
					<div className="pop-footer">
						<button
							className="agree"
							onClick={this.closePopUpBankFail}
						>확인</button>
					</div>
				</Popup>
			</div>
		)
	}

	_renderBankTranferPage = () => {
		return (
			<div>
				<header>
					<div className="header-wrap">
						<div className="ico-back ">
							<Link to="/passbook/pay" onClick={this.handleClickPrevPage1}></Link>
						</div>
						<div className="SubPage-title ">
							<h2>이체하기</h2>
						</div>
					</div>
				</header>

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
												<td><span>{this.state.dataCard.money}</span></td>
											</tr>
											<tr>
												<th>수수료</th>
												<td className="red-color"><span>0</span></td>
											</tr>
											<tr>
												<th>이체일</th>
												<td>{moment(new Date()).format("YYYY-MM-DD")}</td>
											</tr>
											<tr>
												<th>입금은행</th>
												<td className="red-color"><span>{this.state.dataCard.bank.name}</span></td>
											</tr>
											<tr>
												<th>입금계좌번호</th>
												<td className="red-color"><span>{this.state.dataCard.numberCard}</span></td>
											</tr>
											<tr>
												<th>받는 분</th>
												<td><span>{this.state.bank_name}</span></td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<div className="BottomBtn-wrap fixed">
								<button
									className="btn-bottom"
									onClick={this.handleCheckPin}
								>
									확인
							</button>
							</div>
						</div>
					</div>
				</div>
				{/* Go to page Pin */}
				<Popup
					classPopup="pop-wrap"
					classActive={this.state.modalOpenPin}
					isClose={true}
					handleClose={() => this.handlePopup({ modalOpenPin: "", isLoading: false })}
				>
					<div className="pop-head">
						<h2>알림</h2>
					</div>
					<div className="pop-content normal">
						<p>빈 번호를 등록하지 않았습니다.</p>
						<p>빈 번호를 등록 페이지로 이동하세요.</p>
					</div>
					<div className="pop-footer">
						<button
							className="agree"
							onClick={this.closePopUpGoPin}
						>확인</button>
					</div>
				</Popup>
			</div>
		)
	}

	renderPayMain = () => {
		const { isLoading } = this.state;
		return (
			<div className="wrapper">
				<Loading loading={isLoading} />

				{this.state.statePage === 1 && this._renderMainPage()}
				{this.state.statePage === 2 && this._renderBankTranferPage()}

			</div>
		)
	}

	renderAddPin = () => {
		const { nCheck1, nCheck2, nCheck3, nCheck4 } = this.state.dataPin;
		const { isStar1, isStar2, isStar3, isStar4 } = this.state;
		return (
			<div className="wrapper">
				<Loading loading={this.state.isLoading} />
				<header>
					<div className="header-wrap">
						<div className="ico-back ">
							<Link to="/passbook/pay"
								onClick={this.handleClickPrev}
							></Link>
						</div>
						<div className="SubPage-title ">
							<h2>핀 번호 입력</h2>
						</div>
					</div>
				</header>

				<div className="content-body">
					<div className="main-Container">
						<div className="content-wrap">
							<div className="pin-content-wrap">
								<div className="main-item">
									<img src={pin_number} alt="pin" />
									<p>핀 넘버를 입력해주세요.</p>
								</div>
								<div className="input-box">
								<div className="input-box-wrap">
									<Cleave
										id="input1"
										className={isStar1 ?"color-fff" : ""}
										placeholder="*"
										options={{
											numericOnly: true,
											blocks: [1]
										}}
										pattern="[0-9]*"
										inputMode={isIOS ? "" : "numeric"}
										autoComplete="off"
										htmlRef={input => this.getInput1 = input}
										value={nCheck1}
										autoFocus={true}
										onChange={(e) => this.handleChangeDataPin({ nCheck1: e.target.value })}
									/>
									{isStar1&&<span className="star-1">★</span>}
									<Cleave
										id="input2"
										className={isStar2 ?"color-fff" : ""}
										placeholder="*"
										options={{
											numericOnly: true,
											blocks: [1]
										}}
										pattern="[0-9]*"
										inputMode={isIOS ? "" : "numeric"}
										autoComplete="off"
										htmlRef={input => this.getInput2 = input}
										value={nCheck2}
										onChange={(e) => this.handleChangeDataPin({ nCheck2: e.target.value })}
									/>
									{isStar2&&<span className="star-2">★</span>}
									<Cleave
										id="input3"
										className={isStar3 ?"color-fff" : ""}
										placeholder="*"
										options={{
											numericOnly: true,
											blocks: [1]
										}}
										pattern="[0-9]*"

										inputMode={isIOS ? "" : "numeric"}
										autoComplete="off"
										htmlRef={input => this.getInput3 = input}
										value={nCheck3}
										onChange={(e) => this.handleChangeDataPin({ nCheck3: e.target.value })}
									/>
									{isStar3&&<span className="star-3">★</span>}
									<Cleave
										id="input4"
										className={isStar4 ?"color-fff" : ""}
										placeholder="*"
										options={{
											numericOnly: true,
											blocks: [1]
										}}
										pattern="[0-9]*"

										autoComplete="off"
										htmlRef={input => this.getInput4 = input}
										inputMode={isIOS ? "" : "numeric"}
										value={nCheck4}
										onChange={(e) => this.handleChangeDataPin({ nCheck4: e.target.value })}
									/>
									{isStar4&&<span className="star-4">★</span>}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<Popup
					classPopup="pop-wrap"
					classActive={this.state.modalIsOpensPin}
					isClose={true}
					handleClose={this.handleChangeClose}
				>
					<div className="pop-head">
						<h2>알림</h2>
					</div>
					<div className="pop-content normal">
						<p>빈 번호가 맞지 않습니다.</p>
					</div>
					<div className="pop-footer">
						<button
							className="agree"
							onClick={this.handleChangeClose}
						>확인</button>
					</div>
				</Popup>

			</div>
		)
	}

	render() {
		const { redirect, redirectSuccess, redirectFail, redirectPayPin, step } = this.state;

		if (redirect) {
			return <Redirect to='/passbook/pay/detail' />
		}

		if (redirectSuccess) {
			return <Redirect to='/passbook/pay/success' />
		}

		if (redirectFail) {
			return <Redirect to='/passbook/pay/fail' />
		}

		if (redirectPayPin) {
			return <Redirect to='/mypage/addpin' />
		}

		if (step) {
			return (
				this.renderAddPin()
			)
		}
		return (
			this.renderPayMain()
		)
	}
}

export default Pay;