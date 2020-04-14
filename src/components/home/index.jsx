import React, { Component } from 'react';
import ico_arrow from '../../public/images/ico_arrow.png';
import ico_close2 from '../../public/images/ico_close2.png';
import ico_back_w from '../../public/images/ico_back_w.png';
import ico_hospital from '../../public/images/ico_hospital.png';
import ico_address from '../../public/images/ico_address.png';
import main_logo from '../../public/images/main_logo.png';
import Root from '../common/root';
import Popup from '../common/popup';
import { withRouter } from 'react-router-dom';
import { observer, inject } from "mobx-react";
import { toJS } from 'mobx';
import Loading from '../common/loading';

const listPatient = [];

@withRouter
@inject('rootStore')
@observer

class IndexComponent extends Component {
	rootStore;
	userStore;
	constructor(props) {
		super(props);

		this.state = {
			isAddress: false,
			isSearch: false,
			isPatient: false,
			isPatientDetail: false,
			dataPatient: {},
			listPatient: listPatient,
			listAddress: [],
			modalOption: false,
			modalConfirm: '',
			modalNotiHospital: '',
			idHospital: '',
			idAddress: '',
			type: true,
			isLoading: true
		};
		this.hospitalStore = this.props.rootStore.hospitalStore;
		this.rootStore = this.props.rootStore;
	}

	async componentWillMount() {
		// let user = await this.rootStore.userStore.getUser();
		this.rootStore.userStore.getUser().then(user => {
			this.setState({
				user_id: user.id,
				isLoading: false
			})
		}).catch(err => {
			this.setState({ isLoading: false })
			console.log(err);

		})

	}

	handleChange = (data) => {
		this.setState({
			...data
		});
	}

	handleSearchPatient = async (hospitals, listAddress) => {
		if (hospitals.length === 0 && listAddress.length === 0) {
			this.setState({
				modalOption: "active"
			});
		} else {
			this.setState({
				isLoading: true
			});
			let arrayHospital = [];
			hospitals.map((item) => {
				arrayHospital.push(item.name);
				return item;
			});
			let arrayAddress = [];
			listAddress.map((item) => {
				arrayAddress.push(item.district || item.city.subName);
				return item;
			});

			this.rootStore.userStore.getUser().then(async (user) => {
				let id = user.id;
				await this.hospitalStore.searchPatient(id, arrayHospital, arrayAddress).then(response => {
					this.setState({
						isPatient: true,
						isLoading: false,
						listPatient: response.data.data.jobs
					});
				});
			}).catch(err => {
				console.log(err)
				this.setState({
					isLoading: false
				})
			});
		}
	}

	handleSearchHospital = (hospitals) => {
		if (hospitals.length === 5) {
			this.setState({
				modalNotiHospital: 'active'
			});
		} else {
			this.setState({
				isSearch: true
			});
		}
	}

	handleRemove = async () => {
		const { type, idHospital, idAddress, user_id } = this.state;

		if (type) {
			await this.rootStore.hospitalStore.removeHospitalResult(idHospital, user_id);
			this.setState({
				modalConfirm: false
			});
		} else {
			await this.rootStore.hospitalStore.removeAddressResult(idAddress, user_id);
			this.setState({
				modalConfirm: false
			});
		}
	}

	renderDataHospital = (hospitals) => {
		let html = [];

		hospitals.map((item, index) => {
			if (item.user_id === this.state.user_id) {
				html.push(
					<div className="contact-content" key={index}>
						<p>{item.name}</p>
						<img
							src={ico_close2}
							alt=""
							onClick={() => this.handleChange({ modalConfirm: "active", idHospital: item.id, type: true })}
						/>
					</div>
				);
			}
			return item;
		});
		return html;
	}

	renderAddress = (address) => {
		let html = [];

		address.map((item, index) => {
			if (item.user_id === this.state.user_id) {
				html.push(
					<div className="contact-content" key={index}>
						<p>{item.city.name} {item.district}</p>
						<img
							src={ico_close2}
							alt=""
							onClick={() => this.handleChange({ modalConfirm: "active", idAddress: item, type: false })}
						/>
					</div>
				);
			}
			return item;
		});
		return html;
	}

	handleSaveAddress = (data) => {
		this.setState({
			...data
		});
	}

	render() {
		const {
			isAddress,
			isSearch,
			isPatient,
			isPatientDetail,
			dataPatient,
			listPatient,
			modalOption,
			modalConfirm,
			modalNotiHospital,
			user_id,
			isLoading
		} = this.state;

		let hospitals = toJS(this.props.rootStore.hospitalStore.hospitalsResult);
		let listAddress = toJS(this.props.rootStore.hospitalStore.addressResult);
		hospitals = hospitals.filter(item => item.user_id === user_id);
		listAddress = listAddress.filter(item => item.user_id === user_id);
		return (
			<Root
				active={1}
				isAddress={isAddress}
				isSearch={isSearch}
				isPatient={isPatient}
				isPatientDetail={isPatientDetail}
				handleClose={this.handleChange}
				handleChange={this.handleChange}
				dataPatient={dataPatient}
				listPatient={listPatient}
				listAddress={listAddress}
				handleSaveAddress={this.handleSaveAddress}
				hospitals={hospitals}
				user_id={user_id}
			>
				<Loading loading={isLoading} />

				<div className="content-body">
					<div className="scroll-container">
						<div className="content-wrap">
							<div className="main-content">
								<div className="main-logo">
									<img src={main_logo} alt="" />
								</div>
								<div className="search-wrap">
									<div className="find-hospital">
										<button onClick={() => this.handleSearchHospital(hospitals)}>
											<img src={ico_hospital} alt="" />
											<div className="find-text">
												<h2 className="find-title">병원 찾기</h2>
												<p>병원 이름을 검색해주세요.</p>
											</div>
											<img src={ico_arrow} alt="" className="arrow" />
										</button>
									</div>
									<div className="find-address">
										<button onClick={() => this.handleChange({ isAddress: true })}>
											<img src={ico_address} alt="" />
											<div className="find-text">
												<h2 className="find-title">지역 찾기</h2>
												<p>원하는 지역을 검색해주세요.</p>
											</div>
											<img src={ico_arrow} alt="" className="arrow" />
										</button>
									</div>
								</div>
								<div className="contact-list">
									{this.renderDataHospital(hospitals)}
									{this.renderAddress(listAddress)}
								</div>
								<div className="SearchBtn-wrap">
									<button
										className="SearchBtn"
										onClick={() => this.handleSearchPatient(hospitals, listAddress)}
									>
										환자 찾기
										<img src={ico_back_w} alt="" />
									</button>
								</div>
							</div>
						</div>
					</div>
					<Popup
						classPopup="pop-wrap"
						classActive={modalOption}
						isClose={true}
						handleClose={() => this.handleChange({ modalOption: "" })}
					>
						<div className="pop-head">
							<h2>알림</h2>
						</div>
						<div className="pop-content normal">
							<p>근무할 병원 혹은 주소를 입력해주세요.</p>
						</div>
						<div className="pop-footer">
							<button
								className="agree"
								onClick={() => this.handleChange({ modalOption: "" })}
							>확인</button>
						</div>
					</Popup>
					<Popup
						classPopup="pop-wrap"
						classActive={modalNotiHospital}
						isClose={true}
						handleClose={() => this.handleChange({ modalNotiHospital: "" })}
					>
						<div className="pop-head">
							<h2>알림</h2>
						</div>
						<div className="pop-content normal">
							<p>병원은 최대 5개까지 설정이 가능합니다.</p>
						</div>
						<div className="pop-footer">
							<button
								className="agree"
								onClick={() => this.handleChange({ modalNotiHospital: "" })}
							>확인</button>
						</div>
					</Popup>
					<Popup
						classPopup="pop-wrap"
						classActive={modalConfirm}
						isClose={true}
						handleClose={() => this.handleChange({ modalConfirm: "" })}
					>
						<div className="pop-head">
							<h2>알림</h2>
						</div>
						<div className="pop-content normal">
							<p>항목을 삭제하시겠습니까?</p>
						</div>
						<div className="pop-footer btn-2">
							<button
								className="agree"
								onClick={this.handleRemove}
							>예</button>
							<button
								className="cancel"
								onClick={() => this.handleChange({ modalConfirm: "" })}
							>취소</button>
						</div>
					</Popup>
				</div>
			</Root>
		);
	}
}

export default IndexComponent;