import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { observer, inject } from "mobx-react";
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loading from '../common/loading';

@withRouter
@inject('rootStore')
@observer
class DetailPayRoll extends Component {
	user;
	rootStore;
	constructor(props) {
		super(props);
		this.rootStore = this.props.rootStore;
		this.state = {
			redirect: false,
			isLoading: true,
			detailPayroll: {
				info: "",
				info_detail: "",
				insurance: "",
				tax: "",
				amount: "",
				deposit_amount: "",
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
			await this.props.rootStore.payListStore.getPayrollListStore(id).then(response => {
				var data = response;
				this.setState({
					detailPayroll: {
						info: data && data.info,
						info_detail:  data && data.info_detail,
						insurance: data && data.insurance,
						tax: data && data.tax,
						amount: data && data.amount,
						deposit_amount: data && data.deposit_amount,
						total: data && data.total
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

		const { info, info_detail, insurance, tax, amount, deposit_amount, total } = this.state.detailPayroll;
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
							<h2>입금 내역</h2>
						</div>
					</div>
				</header>
				<div className="content-body">
					<div className="Container">
						<div className="content-wrap out-case">
							<div className="pb-detail">
								<h2>입금 내역</h2>
								<div className="white-box">
									<table border={0}>
										<tbody>
											<tr>
												<th>내 통장 표시</th>
												<td>{info} {info_detail}</td>
											</tr>
											<tr>
												<th>입금 내역</th>
												<td className="red-color">{amount !== 0 ? '+': ""}<span>{amount}</span></td>
											</tr>
											<tr>
												<th>보험</th>
												<td>{insurance !== 0 ? '-': ""}<span>{insurance}</span></td>
											</tr>
											{/* <tr>
												<th>유니폼</th>
												<td>-<span>20,000</span></td>
											</tr>
											<tr>
												<th>카드 재발급</th>
												<td>-<span>3,000</span></td>
											</tr> */}
											<tr>
												<th>세금</th>
												<td>{tax}</td>
											</tr>
										</tbody>
									</table>
									<table border={0}>
										<tbody>
											<tr>
												<th>입금액</th>
												<td className="red-color"><span>{deposit_amount}</span></td>
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

export default DetailPayRoll;