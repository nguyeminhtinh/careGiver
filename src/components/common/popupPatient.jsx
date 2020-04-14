import React, { Component } from 'react';
import ico_close from '../../public/images/ico_close2.png';
import ico_more from '../../public/images/ico_more.png';
import none_list from '../../public/images/none_list.png';
import { formatNumber } from '../../commons/common';
import Popup from './popup';
import { observer, inject } from "mobx-react";
import { withRouter } from 'react-router';
import Loading from './loading';

@withRouter
@inject('rootStore')
@observer
class PopupPatient extends Component {
	rootStore;
	constructor(props) {
		super(props);

		this.rootStore = this.props.rootStore;
		this.state = {
			modalNotifi: '',
			isLoading: false
		}
	}

	renderContent = () => {
		if (this.props.listPatient.length === 0) {
			return (
				<div className="content-wrap none-list">
					<div className="none-list">
						<img src={none_list} alt="" />
						<p>등록된 환자가 없습니다.</p>
					</div>
				</div>
			);
		}

		return (
			<div className="content-wrap">
				<ul className="patient-list">
					{this.renderItem()}
				</ul>
			</div>
		);
	}

	handleClick = async (item) => {
		this.setState({
			isLoading: true
		});

		await this.props.rootStore.hospitalStore.getPatientById(item.id).then(response => {
			if (response && response.data) {
				if (response.data.data) {
					this.setState({
						isLoading: false
					});

					if (response.data.data.length === 0) {
						this.setState({
							modalNotifi: 'active'
						});
					} else {
						this.props.handleClose({
							isPatient: false,
							isPatientDetail: true,
							dataPatient: item
						});
					}
				}
			}
		}).catch(err => {
			this.setState({
				isLoading: false
			});
		});
	}

	handleClosePopup = () => {
		this.setState({
			modalNotifi: ''
		});
	}

	renderItem = () => {
		let html = [];

		this.props.listPatient.map((item, index) => {
			html.push(
				<li key={index}>
					<button
						onClick={() => this.handleClick(item)}
					>
						<div className="list-left">
							<table border={0}>
								<caption>{item.name}</caption>
								<tbody><tr>
									<th>일 간병비</th>
									<td><span>{formatNumber(item.amount)}</span>원</td>
								</tr>
									<tr>
										<th>간병 시작일</th>
										<td>{item.start_date} {item.start_time}</td>
									</tr>
									<tr>
										<th>간병 종료일</th>
										<td><span>{item.end_date || '미정'}</span></td>
									</tr>
								</tbody>
							</table>
						</div>
						<img src={ico_more} alt="" />
					</button>
				</li>
			);

			return item;
		});

		return html;
	}

	render() {
		const { modalNotifi, isLoading } = this.state;

		return (
			<div className="wrapper">
				<header className="pop-header">
					<div className="header-wrap">
						<div className="SubPage-title">
							<h2>환자 찾기</h2>
						</div>
						<div
							className="close"
							onClick={() => this.props.handleClose({ isPatient: false })}
						>
							<img src={ico_close} alt="" />
						</div>
					</div>
				</header>
				{
					isLoading && <Loading loading={isLoading} />
				}
				<div className="content-body">
					<div className="main-Container">
						{this.renderContent()}
					</div>
				</div>
				<Popup
					classPopup="pop-wrap"
					classActive={modalNotifi}
					isClose={true}
					handleClose={this.handleClosePopup}
				>
					<div className="pop-head">
						<h2>알림</h2>
					</div>
					<div className="pop-content normal">
						<p>
							업무는 종료되었습니다
						</p>
					</div>
					<div className="pop-footer">
						<button
							className="agree"
							onClick={this.handleClosePopup}
						>
							확인
						</button>
					</div>
				</Popup>
			</div>
		)
	}
}

export default PopupPatient;