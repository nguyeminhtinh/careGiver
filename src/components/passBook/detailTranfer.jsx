import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { observer, inject } from "mobx-react";
import { withRouter } from 'react-router-dom';
import Loading from '../common/loading';

@withRouter
@inject('rootStore')
@observer
class DetailTranfer extends Component {
	user;
	rootStore;
	constructor(props) {
		super(props);
		this.rootStore = this.props.rootStore;
		this.state = {
			redirect: false,
			isLoading: true,
			dataListDetail: {
				reciever: "",
				bank_name: "",
				bank_number: "",
				date: "",
				amount: "",
				fees: "",
				amount_of_withdrawal: "",
				total: ""
			},
			dataFilter: "",
			timeTemp: "",
			transactionTemp: "",
			historyTemp: "",
			startDateTemp: "",
			endDateTemp: "",
			dataSort: ""
		}
	}

	componentWillMount() {
		this.setState({
			dataFilter: this.props.location.state && this.props.location.state.dataFilter,
			timeTemp: this.props.location.state && this.props.location.state.timeTemp,
			transactionTemp: this.props.location.state && this.props.location.state.transactionTemp,
			historyTemp: this.props.location.state && this.props.location.state.historyTemp,
			startDateTemp: this.props.location.state && this.props.location.state.startDateTemp,
			endDateTemp: this.props.location.state && this.props.location.state.endDateTemp,
			dataSort: this.props.location.state && this.props.location.state.dataSort
		});
		this._renderData(parseInt(this.props.match.params.id));
	}

	_renderData = async (id) => {
		try {
			await this.props.rootStore.payListStore.getTransactionListStore(id).then(response => {
				var data = response;
				this.setState({
					dataListDetail: {
						reciever: data.reciever,
						bank_name: data.bank_name,
						bank_number: data.bank_number,
						date: data.date,
						amount: Number(data.amount).toLocaleString('en'),
						fees: Number(data.fees).toLocaleString('en'),
						amount_of_withdrawal: Number(data.amount_of_withdrawal).toLocaleString('en'),
						total: Number(data.total).toLocaleString('en')
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

	handleChange = () => {
		this.setState({
			redirect: true
		});
	}

	render() {
		const { redirect, isLoading } = this.state;
		const { reciever, bank_name, bank_number, date, amount, fees, amount_of_withdrawal, total } = this.state.dataListDetail;
		if (redirect) {
			return <Redirect to={{
				pathname: "/passbook",
				state: {
					...this.state
				}
			}
			} />
		}

		return (
			<div className="wrapper">
				<Loading loading={isLoading} />
				<header>
					<div className="header-wrap">
						<div className="ico-back ">
							<Link to={{
								pathname: "/passbook",
								state: {
									...this.state
							}}}/>
						</div>
						<div className="SubPage-title ">
							<h2>송금 내역</h2>
						</div>
					</div>
				</header>
				<div className="content-body">
					<div className="Container">
						<div className="content-wrap out-case">
							<div className="pb-detail out-case">
								<h2>송금 내역</h2>
								<div className="white-box">
									<table border={0}>
										<tbody>
											<tr>
												<th>출금은행</th>
												<td>{bank_name}</td>
											</tr>
											<tr>
												<th>출금 계좌번호</th>
												<td><span>{bank_number}</span></td>
											</tr>
											<tr>
												<th>받는분</th>
												<td>{reciever}</td>
											</tr>
											<tr>
												<th rowSpan={2}>거래시간</th>
												<td>{date}</td>
											</tr>
											<tr>
												<td>출금</td>
											</tr>
											<tr>
												<th>출금 요청 금액</th>
												<td className="red-color">
													{amount}
												</td>
											</tr>
											<tr>
												<th>수수료</th>
												<td className="red-color">
													{fees === "0" ? fees : "-" + fees}
												</td>
											</tr>
										</tbody>
									</table>
									<table border={0}>
										<tbody>
											<tr>
												<th>출금액</th>
												<td className="red-color"><span>{amount_of_withdrawal}</span></td>
											</tr>
											<tr>
												<th>거래 후 잔액</th>
												<td><span>{total}</span></td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<div className="BottomBtn-wrap fixed">
								<button
									className="btn-bottom"
									onClick={this.handleChange}
								>
									확인
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default DetailTranfer;