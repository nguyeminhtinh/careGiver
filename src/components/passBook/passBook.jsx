import React, { Component } from "react";
import Header from "../common/header";
import moment from "moment";
import Root from "../common/root";
import DatePicker, { registerLocale } from "react-datepicker";
import ko from 'date-fns/locale/ko';
import "react-datepicker/dist/react-datepicker.css";
import icon_arrow from "../../public/images/ico_arrow.png";
import { Link } from "react-router-dom";
import Loading from '../common/loading';
import { Redirect } from 'react-router-dom';
import _ from "lodash";
import InputDatePicker from '../common/inputDatePicker';
import { parseISO } from 'date-fns';

import {
	getListTime,
	getListTransaction,
	getListTransactionHistory
} from "../../commons/common";
import { inject, observer } from 'mobx-react';
registerLocale("ko", ko);
const formatDate = "yyyy-MM-dd(월)";
@inject('rootStore')
@observer
class Passbook extends Component {
	rootStore;
	constructor(props) {
		super(props);

		this.rootStore = this.props.rootStore;
		const dataProps = this.props.location.state;
		this.state = {
			modalIsOpen: "",
			isActive: false,
			dataFilter: {
				time: {
					id: (dataProps && dataProps.dataFilter.time.id) || 1,
					name: (dataProps && dataProps.dataFilter.time.name) || "1개월"
				},
				transaction: {
					type: (dataProps && dataProps.dataFilter.transaction.type) || 0,
					name: (dataProps && dataProps.dataFilter.transaction.name) || "전체"
				},
				history: {
					id: (dataProps && dataProps.dataFilter.history.id) || 1,
					name: (dataProps && dataProps.dataFilter.history.name) || "최신순"
				},
				startDate: (dataProps && dataProps.dataFilter.startDate) || moment(new Date()).subtract(1, 'month').format("YYYY-MM-DD"),
				endDate: (dataProps && dataProps.dataFilter.endDate) || moment(new Date()).format("YYYY-MM-DD")
			},
			timeTemp: {
				id: (dataProps && dataProps.timeTemp.id) || 1,
				name:  (dataProps && dataProps.timeTemp.name) || "1개월",
				value:  (dataProps && dataProps.timeTemp.value) || 1
			},
			transactionTemp: {
				type: (dataProps && dataProps.transactionTemp.type) || 0,
				name: (dataProps && dataProps.transactionTemp.name) || "전체"
			},
			historyTemp: {
				id: (dataProps && dataProps.historyTemp.id) || 1,
				name: (dataProps && dataProps.historyTemp.name) || "최신순"
			},
			amoutPay: "",
			startDateTemp: (dataProps && dataProps.startDateTemp) || new Date(moment(new Date()).subtract(1, 'month')),
			endDateTemp: (dataProps && dataProps.endDateTemp) || new Date(moment(new Date())),
			errorStartDate: "",
			errorEndDate: "",
			flag: false,
			listPayroll: [],
			isLoading: true,
			redirect: false,
			dataSort: {
				start_date: (dataProps && dataProps.dataSort.start_date) || moment(new Date()).subtract(1, 'month').format("YYYY-MM-DD"),
				end_date: (dataProps && dataProps.dataSort.end_date) || moment(new Date()).format("YYYY-MM-DD"),
				type: (dataProps && dataProps.dataSort.type) || 0,
				order_by: (dataProps && dataProps.dataSort.order_by) || "DESC",
			}
		};
	}

	componentWillMount() {
		this.handleDataHitory();
	}

	handleDataHitory = async () =>{
		let user = await this.rootStore.userStore.getUser();
		try {
			this.setState({
				amoutPay: user.amount,
				isLoading: true,
			});
			await this.props.rootStore.payListStore.getPayrollStore(user.id, this.state.dataSort).then(response => {

				this.setState({
					listPayroll: response,
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

	handleChange = data => {
		this.setState({
			...data,
			errorStartDate: "",
			errorEndDate: ""
		});
	};

	handleChangeDate = data => {
		this.setState({
			dataFilter: {
				...this.state.dataFilter,
				...data
			},
			errorStartDate: "",
			errorEndDate: ""
		});
	};

	handleChangeFilter = (item) => {
		let startDateTemp = new Date(moment(new Date()).subtract(item.value, 'month').format("YYYY-MM-DD"));

		if (item.id !== 4) {
			this.setState({
				startDateTemp,
				endDateTemp: new Date(moment(new Date()).format("YYYY-MM-DD"))
			});
		}

		this.setState({
			timeTemp: item
		});
	};

	renderButtonTime = (array) => {
		const { timeTemp } = this.state;
		let html = [];

		array.map((item, index) => {
			html.push(
				<button
					className={timeTemp.id === item.id ? "active" : ""}
					key={index}
					onClick={() => this.handleChangeFilter(item)}
				>
					{item.name}
				</button>
			);

			return item;
		});

		return html;
	};

	renderButtonTransaction = (array) => {
		const { transactionTemp } = this.state;
		let html = [];
		array.map((item, index) => {
			html.push(
				<button
					className={transactionTemp.type === item.type ? "active" : ""}
					key={index}
					onClick={() => this.handleChange({ transactionTemp: item })}
				>
					{item.name}
				</button>
			);

			return item;
		});

		return html;
	};

	renderButtonHistory = (array, id) => {
		const { historyTemp } = this.state;
		let html = [];
		array.map((item, index) => {
			html.push(
				<button
					className={historyTemp.id === item.id ? "active" : ""}
					key={index}
					onClick={() => this.handleChange({ historyTemp: item })}
				>
					{item.name}
				</button>
			);

			return item;
		});

		return html;
	};

	renderPayrollList = () => {
		const array = this.state.listPayroll;
		let html = [];
		try {
			if (_.size(array) === 0) {
				html.push(
					<div key={Math.random()} className="list-content">
						이전 기록이 없습니다.
					</div>
				)
				return html;
			}

			array.map((item, index) => {
				
				html.push(
					<li key={index}>
						<Link to={{
								pathname: "/passbook/detail/"+item.id+'/'+item.type,
								state: {
									...this.state
								}
							}
							}>
							<div className="DayName">
								<small>{moment(item.date).format("YYYY-MM-DD")}</small>
								<h2>{item.type===1? item.bank_name : item.name}</h2>
							</div>
							<div className="PayMoney">
								<p className={item.type !== 1 ? "pay-add": "pay-add minus"}>
									{item.type !== 1? "+": "-"}<span>{item.amount}</span>{item.type !== 1? "": "원"}
								</p>
								<p className="pay-all">
								{(Number(item.type)!==1 || Number(item.bank_number) ===0 )? item.totalAmount: item.bank_number}
								<span className="ml-1">{item.type===1 && item.receiver}</span></p>
							</div>
							<img src={icon_arrow} alt="" className="arrow" />
						</Link>
					</li>
				);
				return item;
			});

			return html;
		} catch (error) {
			
		}
	}

	handleClosePopup = () => {
		this.setState({
			modalIsOpen: "",
			timeTemp: this.state.dataFilter.time,
			transactionTemp: this.state.dataFilter.transaction,
			historyTemp: this.state.dataFilter.history,
			startDateTemp: parseISO(this.state.dataFilter.startDate),
			endDateTemp:  parseISO(this.state.dataFilter.endDate)
		});
	};

	handleSubmitFilter = () => {
		const { startDateTemp, endDateTemp } = this.state;
		if (startDateTemp === "") {
			this.setState({
				errorStartDate: "시작일을 선택하세요."
			});
			return
		}

		if (endDateTemp === "") {
			this.setState({
				errorEndDate: "종료일을 선택하세요."
			});
			return
		}

		this.setState({
			modalIsOpen: "",
			dataFilter: {
				...this.state.dataFilter,
				time: this.state.timeTemp,
				transaction: this.state.transactionTemp,
				history: this.state.historyTemp,
				startDate: moment(this.state.startDateTemp).format("YYYY-MM-DD"),
				endDate: moment(this.state.endDateTemp).format("YYYY-MM-DD")
			}
		}, () =>{
			this.handleDataShort();
		});
	};

	handleDataShort = () =>{
		const { transaction, history, startDate, endDate } = this.state.dataFilter;
		this.setState({
			dataSort:{
				start_date: startDate,
				end_date: endDate,
				type: transaction.type,
				order_by: history.id ===1 ? "DESC" : "ASC"
			}
		}, () =>{
			this.handleDataHitory();
			this.setState({
				isLoading: false,
			});
		});
	}

	render() {
		const { modalIsOpen, errorStartDate, errorEndDate, startDateTemp, endDateTemp, timeTemp, amoutPay } = this.state;
		const {
			time,
			transaction,
			history,
			startDate,
			endDate
		} = this.state.dataFilter;

		const { redirect } = this.state;
		if (redirect) {
			return <Redirect to='/' />
		}

		return (
			<div className="wrapper">
				<Loading loading={this.state.isLoading} />
				<Header
					title="통장"
					link="/mypage"
					isLink={false}
					classes=""
					classLink=""
					classHeader="SubHeader-wrap"
				/>
				<div className="content-body">
					<div className="Sub-Container">
						<div className="SubContent-wrap">
							<div className="MyPassbook">
								<button>
									<Link to="/passbook/pay">이체하기</Link>
								</button>
								<div className="content-box">
									<p className="pay-num">
										<strong>{Number(amoutPay).toLocaleString('en')}</strong>원
                  					</p>
								</div>
							</div>
							<div className="search-bar" onClick={() => this.handleChange({ modalIsOpen: "active" })}>
								<p>
									<span>{startDate}</span>~
									<span>{endDate}</span> ∙{" "}
									<span>{time.name}</span> ∙ <span>{transaction.name}</span> ∙{" "}
									<span>{history.name}</span>
								</p>
								<img
									src={icon_arrow}
									alt=""
									className="arrow"
								/>
							</div>
						</div>
						<div className="SubContent-wrap bottom-padding history-pay">
							<ul className="hospital-list">
								{this.renderPayrollList()}
							</ul>
						</div>
					</div>
				</div>
				<div className={"passbook-popwrap " + modalIsOpen}>
					<div className="popup-inner">
						<div className="pop-head">
							<img
								src={icon_arrow}
								alt=""
								className="arrow"
								onClick={this.handleClosePopup}
							/>
							<h2>보기설정</h2>
							<button onClick={this.handleSubmitFilter}>확인</button>
						</div>
						<div className="pop-content pop-touch">
							<div className="day-content">
								<h3>기간</h3>
								<div className="btn-wrap">
									{this.renderButtonTime(getListTime(1))}
								</div>
								<div className="date-choice">
									<DatePicker
										selected={new Date(startDateTemp)}
										dateFormat={formatDate}
										selectsStart
										locale="ko"
										startDate={new Date(startDateTemp)}
										endDate={new Date(endDateTemp)}
										maxDate={endDateTemp}
										dateFormatCalendar="yyyy LLLL"
										onChange={e => this.handleChange({ startDateTemp: e })}
										placeholderText="시작 날짜 선택"
										withPortal
										customInput={<InputDatePicker disabled={true} />}
										disabled={[1, 2, 3].indexOf(timeTemp.id) !== -1 ? true : false}
									/>
									<b>~</b>
									<DatePicker
										locale="ko"
										selected={new Date(endDateTemp)}
										dateFormat={formatDate}
										selectsStart
										startDate={new Date(startDateTemp)}
										endDate={new Date(endDateTemp)}
										onChange={e => this.handleChange({ endDateTemp: e })}
										maxDate={new Date()}
										minDate={startDateTemp}
										dateFormatCalendar="yyyy LLLL"
										placeholderText="종료 날짜 선택"
										withPortal
										customInput={<InputDatePicker disabled={true} />}
										disabled={[1, 2, 3].indexOf(timeTemp.id) !== -1 ? true : false}
									/>
								</div>
								<div className="mt-2">
									<span className="text-danger-error" role="alert">
										{errorStartDate}
									</span>
								</div>
								<div className="mt-2">
									<span className="text-danger-error" role="alert">
										{errorEndDate}
									</span>
								</div>
							</div>
							<div className="case-content">
								<h3>거래유형</h3>
								<div className="btn-wrap">
									{this.renderButtonTransaction(getListTransaction(0))}
								</div>
							</div>
							<div className="list-content">
								<h3>거래내역</h3>
								<div className="btn-wrap">
									{this.renderButtonHistory(getListTransactionHistory(1))}
								</div>
							</div>
						</div>
					</div>
				</div>
				<Root active={3} />
			</div>
		);
	}
}
export default Passbook;
