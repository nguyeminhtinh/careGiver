import React, { Component } from 'react';
import Header from '../common/header';
import Root from '../common/root';
import none_list from '../../public/images/none_list.png';
import ico_more from '../../public/images/ico_more.png';
import Popup from '../common/popup';
import { observer, inject } from "mobx-react";
import { withRouter, Redirect } from 'react-router';
import Pagination from '../common/pagination';
import { formatNumber } from '../../commons/common';
import Loading from '../common/loading';
import moment from 'moment';

@withRouter
@inject('rootStore')
@observer
class WorkList extends Component {
	rootStore;
	constructor(props) {
		super(props);

		this.rootStore = this.props.rootStore;
		this.state = {
			tabActive: 1,
			modalWorking: '',
			modalCancel: '',
			showbtn: true,
			user_id: '',
			dataWorking: {},
			dataSchedule: {
				data: [],
				page: 1,
				pageSz: 5,
				totalPage: 0
			},
			dataCompleted: {
				data: [],
				page: 1,
				pageSz: 5,
				totalPage: 0
			},
			isLoading: true,
			isLoadingCheck: false,
			isRedirect: false,
			modalNotifi: '',
			modalEndJob: '',
			redirect: {
				isRedirectPage: false,
				link: '',
				id: ''
			}
		}
	}

	async componentWillMount() {
		if (this.props.tab) {
			this.setState({
				tabActive: parseInt(this.props.tab)
			});
		}

		this.rootStore.userStore.getUser().then(user => {
			let user_id = user.id;
			this.setState({
				user_id
			});
			this.handleChangeTab(parseInt(this.props.tab));
		}).catch(err => {
			this.setState({
				isLoading: false
			});
			console.log(err);
		});
	}

	handleRefreshData = async () => {
		this.setState({
			isLoadingCheck: false,
			isLoading: true,
			modalNotifi: '',
			modalEndJob: ''
		});
		await this._renderDataCompleted(this.state.user_id, 1, this.state.dataCompleted.pageSz);
		this._renderDataWorking(this.state.user_id).then(async (res) => {
			await this._renderDataSchedule(this.state.user_id, 1, this.state.dataSchedule.pageSz);
		}).catch(err => {
			this.setState({
				isLoading: false
			});
		});
	}

	_renderDataWorking = async (user_id) => {
		this.setState({
			dataWorking: {}
		});
		await this.props.rootStore.historyStore.getListCaregiverProgress(user_id).then(response => {
			let dataWorking = [];
			if (response) {
				if (response.data) {
					if (response.data.data) {
						if (response.data.data.length !== 0) {
							dataWorking = response.data.data[0];
							this.setState({
								user_id,
								dataWorking
							});
						} else {
							this.setState({
								dataWorking: {}
							});
						}
					}
				}
			}
		}).catch(err => {
			this.setState({
				isLoading: false
			});
		});
	}

	_renderDataSchedule = async (user_id, page, pageSz) => {
		await this.props.rootStore.historyStore.getListCaregiverIntended(user_id, page, pageSz).then(response => {
			if (response) {
				if (response.data) {
					if (response.data.data) {
						if (response.data.data.data) {
							this.setState({
								dataSchedule: {
									...this.state.dataSchedule,
									data: response.data.data.data,
									page: response.data.data.page,
									totalPage: response.data.data.total
								},
								isLoading: false
							});
						}
					}
				}
			}
		}).catch(err => {
			this.setState({
				isLoading: false
			});
		});
	}

	_renderDataCompleted = async (user_id, page, pageSz) => {
		await this.props.rootStore.historyStore.getListCaregiverCompleted(user_id, page, pageSz).then(response => {
			if (response) {
				if (response.data) {
					if (response.data.data) {
						if (response.data.data.data.length) {
							this.setState({
								dataCompleted: {
									...this.state.dataCompleted,
									data: response.data.data.data,
									page: response.data.data.page,
									totalPage: response.data.data.total
								}
							});
						}
					}
				}
			}
		}).catch(err => {
			this.setState({
				isLoading: false
			});
		});
	}

	handleChange = (data) => {
		this.setState({
			...data
		});
	}

	renderContent = (data, link) => {
		return (
			<ul className="work-list">
				{this.renderItem(data, link)}
			</ul>
		);
	}

	handleClick = async (link, item) => {
		this.setState({
			isLoading: true
		});
		await this.props.rootStore.historyStore.getStatusJob(item.id).then(response => {
			if (response.data) {
				if (response.data.data) {
					this.setState({
						isLoading: false
					});
					if (response.data.data.length === 0) {
						this.setState({
							modalNotifi: 'active'
						});
					} else {
						this.setState({
							redirect: {
								isRedirectPage: true,
								link: link,
								id: item.id
							}
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

	renderItem = (data, link) => {
		let html = [];
		var mountText = this.state.tabActive !== 3 ? '일 간병비' : '총 간병비';

		data.map((item, index) => {
			html.push(
				<li key={index}>
					<a href="#job" onClick={() => this.handleClick(link, item)}>
						<div className="list-left">
							<table border={0}>
								<caption>{item.info}</caption>
								<tbody>
									<tr>
										<th>간병 시작일</th>
										<td>{item.start}</td>
									</tr>
									<tr>
										<th>간병 종료일</th>
										<td>{item.end || '미정'}</td>
									</tr>
									<tr>
										<th>{mountText}</th>
										<td><span>{formatNumber(item.amount || 0)}</span>원</td>
									</tr>
								</tbody>
							</table>
						</div>
						<img src={ico_more} alt="" />
					</a>
				</li>
			);
			return item;
		});
		return html;
	}

	renderDataList = (data, link, text) => {
		if (data.length === 0) {
			return (
				this.renderLoading(text)
			);
		}
		return this.renderContent(data, link);
	}

	handleChangePageCompleted = (page) => {
		this.setState({
			dataCompleted: {
				...this.state.dataCompleted,
				page
			}
		}, () => {
			this._renderDataCompleted(this.state.user_id, page, this.state.dataCompleted.pageSz)
		});
	}

	handleChangePageSchedule = (page) => {
		this.setState({
			dataSchedule: {
				...this.state.dataSchedule,
				page
			}
		}, () => {
			this._renderDataSchedule(this.state.user_id, page, this.state.dataSchedule.pageSz)
		});
	}

	renderLoading = (text) => {

		return (
			<div className="none-list">
				<img src={none_list} alt="" />
				<p>{text} 간병 내역이 없습니다.</p>
			</div>
		);
	}

	handleCheckJob = async (id) => {
		this.setState({
			isLoadingCheck: true
		});

		await this.props.rootStore.historyStore.getStatusJob(id).then(response => {
			if (response.data) {
				if (response.data.data) {
					if (response.data.data.status === 4 && response.data.data.close === 1) {
						this.setState({
							modalEndJob: 'active',
							isLoadingCheck: false
						});
						return;
					}

					if (response.data.data.status === 5) {
						this.setState({
							modalEndJob: 'active',
							isLoadingCheck: false
						});
						return;
					}

					if (response.data.data && response.data.data.length === 0) {
						this.setState({
							modalEndJob: 'active',
							isLoadingCheck: false
						});
						return;
					}

					this.setState({
						isRedirect: true
					});
				}
			}
		}).catch(err => {
			console.log(err)
			this.setState({
				isLoadingCheck: false
			})
		})
	}

	renderDataWorking = (dataWorking) => {
		var mountText = this.state.tabActive !== 3 ? '일 간병비' : '총 간병비';

		if (Object.keys(dataWorking).length !== 0) {

			return (
				<div>
					<ul className="work-list">
						<li>
							<a href="#job" onClick={() => this.handleCheckJob(dataWorking.id)}>
								<div className="list-left">
									<table border={0}>
										<caption>{dataWorking.info}</caption>
										<tbody>
											<tr>
												<th>간병 시작일</th>
												<td>{dataWorking.start}</td>
											</tr>
											<tr>
												<th>간병 종료일</th>
												<td>{dataWorking.end || '미정'}</td>
											</tr>
											<tr>
												<th>{mountText}</th>
												<td><span>{formatNumber(dataWorking.amount)}</span>원</td>
											</tr>
										</tbody>
									</table>
								</div>
								<img src={ico_more} alt="" />
							</a>
						</li>
					</ul>
					{this.renderButtonStart(dataWorking)}
				</div>
			);
		}

		return (
			this.renderLoading('진행중인')
		);
	}

	handleButtonCheckJob = async (id) => {
		this.setState({
			isLoadingCheck: true
		});

		await this.props.rootStore.historyStore.getStatusJob(id).then(response => {
			if (response.data) {
				if (response.data.data) {
					if (response.data.data.status === 4 && response.data.data.close === 1) {
						this.setState({
							modalEndJob: 'active',
							isLoadingCheck: false
						});
						return;
					}

					if (response.data.data.status === 5) {
						this.setState({
							modalEndJob: 'active',
							isLoadingCheck: false
						});
						return;
					}

					this.setState({
						modalWorking: 'active',
						isLoadingCheck: false
					});
				}
			}
		}).catch(err => {
			console.log(err)
			this.setState({
				isLoadingCheck: false
			})
		})
	}

	renderButtonStart = (dataWorking) => {
		let date = moment(new Date());
		let { showbtn } = this.state;
		let start = moment(dataWorking.start);
		if (dataWorking.status === 1 || dataWorking.process_status === 6 || dataWorking.process_status === 7 || !showbtn) {
			return null;
		}

		if (date > start) {
			return (
				<div className="BottomBtn-wrap fixed footer-stay">
					<button
						className="btn-bottom"
						onClick={() => this.handleButtonCheckJob(dataWorking.id)}
					>
						출근완료
					</button>
				</div>
			);
		}
	}

	handleSubmitStart = async (id) => {
		await this.props.rootStore.historyStore.caregiverStartById(id).then(response => {
			if (Object.keys(response.data.data).length !== 0) {
				this.setState({
					modalWorking: ""
				}, () => {
					this._renderDataWorking(this.state.user_id);
				});
			} else {
				this.setState({
					modalCancel: "active",
					modalWorking: "",
				});
			}
		}).catch(err => {
			console.log(err)
			this.setState({
				isLoadingCheck: false
			})
		})
	}

	handleChangeTab = async (tabActive) => {
		this.setState({
			tabActive,
			isLoading: true
		});

		switch (tabActive) {
			case 1:
				await this._renderDataWorking(this.state.user_id);
				break;
			case 2:
				await this._renderDataSchedule(this.state.user_id, 1, this.state.dataSchedule.pageSz);
				break;
			case 3:
				await this._renderDataCompleted(this.state.user_id, 1, this.state.dataCompleted.pageSz);
				break;
			default:
				break;
		}

		this.setState({
			isLoading: false
		});
	}

	render() {
		const {
			tabActive,
			modalWorking,
			modalCancel,
			dataWorking,
			dataSchedule,
			dataCompleted,
			isRedirect,
			modalNotifi,
			modalEndJob,
			isLoadingCheck,
			isLoading
		} = this.state;

		const { isRedirectPage, link, id } = this.state.redirect;

		if (isRedirectPage) {
			return (
				<Redirect to={link + id} />
			);
		}

		if (isRedirect) {
			return (
				<Redirect to={`/work/working/` + dataWorking.id} />
			);
		}

		return (
			<Root active={2}>
				<Header
					title="간병 내역"
					link=""
					isLink={false}
					classHeader="SubHeader-wrap"
					classes=""
					classLink=""
				/>
				<Loading loading={isLoadingCheck || isLoading} />
				<div className="content-body">
					<div className="main-Container">
						<div className="BarContent-tab" id="tabs">
							<ul>
								<li
									className={tabActive === 1 ? "active" : ""}
									onClick={() => this.handleChangeTab(1)}
								>진행 내역</li>
								<li
									className={tabActive === 2 ? "active" : ""}
									onClick={() => this.handleChangeTab(2)}
								>대기 내역</li>
								<li
									className={tabActive === 3 ? "active" : ""}
									onClick={() => this.handleChangeTab(3)}
								>완료 내역</li>
							</ul>
						</div>
						<div className="content-wrap custom-fixed">
							<div className="TabContent-wrap resize-pt">
								<div className={`tab-content list-work ${tabActive === 1 ? 'active' : ''}`}>
									{this.renderDataWorking(dataWorking)}
								</div>
								<div className={`tab-content list-work ${tabActive === 2 ? 'active' : ''}`}>
									{this.renderDataList(dataSchedule.data, '/work/schedule/', '대기 중인')}
									<Pagination
										page={dataSchedule.page}
										pageSz={dataSchedule.pageSz}
										totalPage={dataSchedule.totalPage}
										handleChangePage={this.handleChangePageSchedule}
									/>
								</div>
								<div className={`tab-content list-work ${tabActive === 3 ? 'active' : ''}`}>
									{this.renderDataList(dataCompleted.data, '/work/completed/', '완료된')}
									<Pagination
										page={dataCompleted.page}
										pageSz={dataCompleted.pageSz}
										totalPage={dataCompleted.totalPage}
										handleChangePage={this.handleChangePageCompleted}
									/>
								</div>
							</div>
						</div>
					</div>
					<Popup
						classPopup="pop-wrap"
						classActive={modalWorking}
						isClose={true}
						handleClose={() => this.handleChange({ modalWorking: "" })}
					>
						<div className="pop-head">
							<h2>알림</h2>
						</div>
						<div className="pop-content normal px-2">
							<p>
								출근 완료 처리하시겠습니까? <br />
								(출근하지 않고, 예 선택 시 패널티가 부여됩니다.)
							</p>
						</div>
						<div className="pop-footer btn-2">
							<button
								className="agree"
								onClick={() => this.handleSubmitStart(dataWorking.id)}
							>예</button>
							<button
								className="cancel"
								onClick={() => this.handleChange({ modalWorking: "" })}
							>취소</button>
						</div>
					</Popup>
					<Popup
						classPopup="pop-wrap"
						classActive={modalCancel}
						isClose={true}
						handleClose={() => this.handleChange({ modalCancel: "" })}
					>
						<div className="pop-head">
							<h2>알림</h2>
						</div>
						<div className="pop-content normal px-2">
							<p>취소 된 작업을 시작할 수 없습니다!</p>
						</div>
						<div className="pop-footer">
							<button
								className="agree"
								onClick={() => this.handleChange({ modalCancel: "", showbtn: false })}
							>취소</button>
						</div>
					</Popup>
					<Popup
						classPopup="pop-wrap"
						classActive={modalNotifi}
						isClose={true}
						handleClose={this.handleRefreshData}
					>
						<div className="pop-head">
							<h2>알림</h2>
						</div>
						<div className="pop-content normal">
							<p>
								환자는 존재하지 않습니다!
							</p>
						</div>
						<div className="pop-footer">
							<button
								className="agree"
								onClick={this.handleRefreshData}
							>
								확인
							</button>
						</div>
					</Popup>
					<Popup
						classPopup="pop-wrap"
						classActive={modalEndJob}
						isClose={true}
						handleClose={this.handleRefreshData}
					>
						<div className="pop-head">
							<h2>알림</h2>
						</div>
						<div className="pop-content normal">
							<p>
								업무는 종료되었습니다!
							</p>
						</div>
						<div className="pop-footer">
							<button
								className="agree"
								onClick={this.handleRefreshData}
							>
								확인
							</button>
						</div>
					</Popup>
				</div>
			</Root>
		)
	}
}

export default WorkList;
