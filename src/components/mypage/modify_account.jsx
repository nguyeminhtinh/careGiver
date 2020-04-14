import React, { Component } from 'react';
import Header from '../common/header';
import pencle from '../../public/images/pencle.png';
import { Link } from 'react-router-dom';
import { observer, inject } from "mobx-react";
import { withRouter } from 'react-router-dom';
import Loading from '../common/loading';
import { toJS } from 'mobx';
import _ from "lodash";
@withRouter
@inject('rootStore')
@observer
class AccountPay extends Component {
	rootStore;
	constructor(props) {
		super(props);
		this.rootStore = this.props.rootStore;
		this.state = {
			listCard: [],
			isLoading: true,
			pagePay: this.props.location.state && this.props.location.state.pagePay
		}
	}

	async componentWillMount() {
		let user = toJS(this.rootStore.userStore.user);
		try {
		await this.rootStore.paymentStore.getListCardStore(user.id).then(response => {
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

	renderListAccount = () => {
		const array = this.state.listCard;
		let html = [];
		try {
			if (_.size(array) === 0) {
				html.push(
					<div key={Math.random()} className="no-account">
						<p>등록된 계좌가 없습니다.</p>
					</div>
				)
				return html;
			}

			array.map((item, index) => {
				html.push(
					<Link key={index} to={{
						pathname: "/passBook/pay/edit/"+item.id,
						state: {
							...this.state
						}}} className="mb-2 d-block">
						<div className="account-wrap">
							<h2>{item.full_name}
								<img src={pencle} alt="" />
							</h2>
							<p><span>{item.bank.name}</span><span>
								{item.number}
							</span></p>
						</div>
					</Link>
				);
				return item;
			});

			return html;
		} catch (error) {
			this.setState({
				isLoading: true
			});
		}
	}

	render() {
		let link = "/mypage";
		if (this.state.pagePay) {
			link = "/passbook/pay"
		}
		return (
			<div className="wrapper">
				<Loading loading={this.state.isLoading} />
				<Header
					title="계좌 등록하기"
					link={link}
					isLink={true}
					classes=""
					classLink=""
					classHeader="header-wrap"
				/>
				<div className="content-body">
					<div className="Container">
						<div className="content-wrap">
							<div className="save-account">
								{this.renderListAccount()}
							</div>
							<div className="BottomBtn-wrap fixed">
								<button className="btn-bottom">
									<Link 
									to={{
										pathname: "/passbook/pay/add",
										state: {
											...this.state
										}
									}}>
										계좌 등록
									</Link>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default AccountPay;