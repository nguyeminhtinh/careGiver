import React, { Component } from 'react';
import Header from '../../common/header';
import ListBank from '../../mypage/listBank.jsx';
import { isHANGUL } from '../../../commons/common';
import Cleave from 'cleave.js/react';
import { isIOS } from "react-device-detect";
import { Link } from 'react-router-dom';
import Loading from '../../common/loading';
import Popup from '../../common/popup';
import { Redirect } from 'react-router-dom';
import { observer, inject } from "mobx-react";
import { withRouter } from 'react-router-dom';
import { toJS } from 'mobx';
import _ from "lodash";
import { splitSpaceOrNewLine } from "../../../commons/common";
import moment from "moment";
@withRouter
@inject('rootStore')
@observer
class addAccount extends Component {
	user;
	rootStore;
	constructor(props) {
		super(props);
		this.rootStore = this.props.rootStore;

		this.state = {
			modalIsOpen: "",
			errorName: "",
			errorBank: "",
			errorNumberCard: "",
			dataCard: {
				name: "",
				bank: "",
				numberCard: ""
			},
			modalIsOpens: "",
			modalIsFail: "",
			modalMesg: "",
			redirect: false,
			isLoading: true
		}
	}

	componentWillMount() {
		this._renderData(parseInt(this.props.match.params.id));
	}

	_renderData = async (id) => {
		try {
			await this.rootStore.paymentStore.detailCardStore(id).then(response => {
				var data = response.data;
				this.setState({
					dataCard:{
						name: data.full_name,
						bank: data.bank,
						numberCard: data.number,
					},
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

	handleChange = (data) => {
		this.setState({
			...data,
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
			errorName: "",
			errorBank: "",
			errorNumberCard: "",
		});
	}

	handleSubmit = () => {
		const { name, bank, numberCard, } = this.state.dataCard;
		if (name.trim().length === 0) {
			this.setState({
				errorName: "이름을 입력하세요."
			});
			return;
		}
		if (name.trim().length > 16) {
			this.setState({
				errorName: "한글, 최대 16자를 사용할 수 있습니다."
			});
			return;
		}

		if(name.trim()){
			if (isHANGUL(name.trim())) {
				this.setState({
					errorName: "한글, 최대 16자를 사용할 수 있습니다."
				});
				return;
			}
		}

		if (bank.length === 0) {
			this.setState({
				errorBank: "은행을 선택하십시오."
			});
			return;
		}

		if (numberCard.length === 0) {
			this.setState({
				errorNumberCard: "계좌 번호를 입력하십시오."
			});
			return;
		}
		if (numberCard.trim().length < 10 || numberCard.trim().length > 14) {
			this.setState({
				errorNumberCard: "숫자만 입력가능,\n최소 10자리~최대 14자리"
			});
			return;
		} else {
			this.updateData();
		}
	}

	updateData = async () => {
		const { bank, numberCard } = this.state.dataCard;
		var packetCodeTmp = Math.floor(100000 + Math.random() * 900000);
		var numberCardFormat = numberCard.replace(/-/g, '');
		var currentDate = moment(new Date()).format("MMDD");
		var paymentCheck = {
			"disc_code": "",
			"company_code": "HMCNET01",
			"packet_code": packetCodeTmp.toString(),
			"bank_code": bank.code,
			"bank_date": currentDate.toString(),
			"bank_number": numberCardFormat,
			"user_number": toJS(this.props.rootStore.userStore).user.birthdate.replace(/-/g, ""),
			"is_woori_bank": "N",
			"is_nh_bank": "N",
			"user_id": toJS(this.props.rootStore.userStore).user.id
		}

		this.setState({
			isLoading: true,
			modalIsOpens: ""
		}, () => {
			this.props.rootStore.paymentStore.checkBankNumber(paymentCheck).then(data => {
				var message = data.message,
					result = message.result;
				var recv_msg = message.RECV_MSG;
				if (result && result.code === 200) {
					var bank_name = splitSpaceOrNewLine(recv_msg)[4];
					this.setState({
						bank_name: bank_name,
						isLoading: false
					});
					this.handleChange({ modalIsOpens: "active" });
				} else {
					this.setState({
						isLoading: false
					});
					this.handleChange({ modalIsFail: "active", modalMesg: "계좌 조회에 실패했습니다.\n 계좌 정보를 다시 한번 확인하세요." });
				}
			}).catch(err => {
				console.log(err)
				this.setState({
					isLoading: false
				});
			});
		});
	}

	submitUpdateCartNumber = () =>{
		const { name, bank, numberCard } = this.state.dataCard;
		var numberCardFormat = numberCard.replace(/-/g, '');
		var bodyCard = {
			"full_name": name,
			"bank_code": bank.code,
			"number": numberCardFormat,
		}
		this.setState({ 
			isLoading: true,
			modalIsOpens: ""
		}, () => {
			this.props.rootStore.paymentStore.updateCardStore(parseInt(this.props.match.params.id), bodyCard).then(data => {
				var message = data.message;
				if (data && _.size(data.data) !== 0) {
					this.setState({
						isLoading: false,
						redirect: true
				   });
				} else {
					this.setState({
						 isLoading: false
					});
					this.handleChange({ modalIsFail: "active", modalMesg: message });
				}
			}).catch(err => {
				console.log(err)
				this.setState({
					isLoading: false
				});
			});
		});
	}

	render() {
		const { modalIsOpen, errorName, errorBank, errorNumberCard, isLoading, redirect } = this.state;
		const { name, bank, numberCard } = this.state.dataCard;
		let link = "/mypage/account";
		if (this.props.location.state&&this.props.location.state.pagePay) {
			link ={
				pathname: "/mypage/account",
				state: {
					pagePay: this.props.location.state.pagePay
				}
			} 
		}

		if (redirect) {
			return <Redirect to='/mypage/account' />
		}
		return (
			<div className="wrapper">
				<Loading loading={isLoading} />
				<Header
					title="계좌 수정하기"
					link={link}
					isLink={true}
					classes=""
					classLink=""
					classHeader="header-wrap"
				/>
				<div className="content-body">
					<div className="Container">
						<div className="content-wrap">
							<div className="PassMain-content mt-0">
								<div className="content-title">
									<h2>즐겨찾는 계좌를 등록해 주세요.</h2>
								</div>
								<div className="input-wrap">
									<label className="input-title">
										계좌 명칭
                  					</label>
									<div className="basic-input">
										<input
											type="text"
											placeholder="계좌명칭을 입력해주세요."
											value={name}
											onChange={(e) => this.handleChangeData({ name: e.target.value })}
										/>
									</div>
									<div className="mt-2">
										<span className="text-danger-error" role="alert">
											{errorName}
										</span>
									</div>
								</div>
								<div className="input-wrap">
									<label className="input-title">
										등록 계좌번호
                  					</label>
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
										<Cleave
											placeholder="계좌번호를 입력해주세요."
											options={{
												numericOnly: true,
												blocks: [14]
											}}
											pattern="[0-9]*"
											inputMode={isIOS ? "" : "numeric"}
											value={numberCard}
											onChange={(e) => this.handleChangeData({ numberCard: e.target.value })}
											className="bank-order"
										/>
										<div className="mt-2 mb-2">
											<span className="text-danger-error" role="alert">
												{errorBank}
											</span>
										</div>
										<div className="ml-5 pl-5">
											<span className="text-danger-error ml-3 pre-line d-block" role="alert">
												{errorNumberCard}
											</span>
										</div>
									</div>
								</div>
							</div>
							<div className="BottomBtn-wrap fixed">
								<button
									className="btn-bottom"
									onClick={this.handleSubmit}
								>
									등록
								</button>
								<button
									className="btn-bottom btn-style2"
								>
									<Link to={{
										pathname: "/mypage/account",
										state: {
											pagePay: this.props.location.state.pagePay
										}}}>
										취소
									</Link>	
								</button>
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
					classActive={this.state.modalIsOpens}
					isClose={true}
					handleClose={() => this.handleChange({ modalIsOpens: "", isLoading: false })}
				>
					<div className="pop-head">
						<h2>{this.state.bank_name}</h2>
						<p className="overflowHide"><span className="mr-1">{this.state.dataCard.bank.name}</span>|<span className="ml-1">{this.state.dataCard.numberCard}</span></p>
					</div>
					<div className="pop-content normal pre-line">
						<p>즐겨 찾는 계정을 편집 하시겠습니까?</p>
					</div>
					<div className="pop-footer btn-2">
						<button
							className="agree"
							onClick={this.submitUpdateCartNumber}
						>예</button>
						<button
							className="cancel"
							onClick={() => this.handleChange({ modalIsOpens: "", isLoading: false })}
						>아니오</button>
					</div>
				</Popup>

				<Popup
					classPopup="pop-wrap"
					classActive={this.state.modalIsFail}
					isClose={true}
					handleClose={() => this.handleChange({ modalIsFail: "", isLoading: false })}
				>
					<div className="pop-head">
						<h2>알림</h2>
					</div>
					<div className="pop-content normal pre-line">
						<p>{this.state.modalMesg}</p>
					</div>
					<div className="pop-footer">
						<button
							className="agree"
							onClick={() => this.handleChange({ modalIsFail: "", isLoading: false })}
						>확인</button>
					</div>
				</Popup>
			</div>
		)
	}
}

export default addAccount;