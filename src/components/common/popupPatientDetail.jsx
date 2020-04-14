import React, { Component } from 'react';
import ico_close from '../../public/images/ico_close2.png';
import Popup from './popup';
import DateTime from '../common/caregiver/dateTime';
import Name from '../common/caregiver/name';
import Text from '../common/caregiver/text';
import TextArea from '../common/caregiver/textArea';
import RadioGroup from '../common/caregiver/radioGroup';
import { observer, inject } from "mobx-react";
import { withRouter } from 'react-router';
import { formatNumber } from '../../commons/common';
import Loading from '../common/loading';
import { toJS } from 'mobx';

@withRouter
@inject('rootStore')
@observer
class PopupPatientDetail extends Component {
	userStore;
	constructor(props) {
		super(props);
		this.rootStore = this.props.rootStore;
		this.hospitalStore = this.props.rootStore.hospitalStore;

		this.state = {
			modalSubmit: "",
			modalError: "",
			data: {
				time_start: "",
				time_end: "",
				date_start: "",
				date_end: "",
				is_off: true,
				name: "",
				gender: "",
				weight: "",
				age: "",
				salary: "",
				ability_move: "",
				ability_eat: "",
				ability_change_posture: "",
				ability_cognitive: "",
				ability_toilet: "",
				ability_suction: "",
				reason: "",
				other: "",
				messageError: ""
			},
			isLoading: true
		}
	}

	handleChange = (data) => {
		this.setState({
			...data
		});
	}

	componentWillMount() {
		this._renderData(parseInt(this.props.dataPatient.id));
	}

	renderLoading = () => {
		const { isLoading } = this.state;

		if (isLoading) {
			return (
				<Loading loading={this.state.isLoading} loadingOverlayDiv={true} />
			);
		}
	}

	_renderData = async (id) => {
		await this.props.rootStore.hospitalStore.getPatientById(id).then(response => {
			if (response && response.data) {				
				if (response.data.data) {
					this.setState({
						data: {
							...this.state.data,
							id: response.data.data.id,
							time_start: response.data.data.time_start,
							time_end: response.data.data.time_end,
							date_start: response.data.data.date_start ? new Date(response.data.data.date_start) : '',
							date_end: response.data.data.date_end ? new Date(response.data.data.date_end) : '',
							is_off: true,
							ability_move: response.data.data.ability_move,
							ability_eat: response.data.data.ability_eat,
							ability_change_posture: response.data.data.ability_change_posture,
							ability_cognitive: response.data.data.ability_cognitive,
							ability_toilet: response.data.data.ability_toilet,
							ability_suction: response.data.data.ability_suction,
							name: response.data.data.patient_name,
							gender: response.data.data.patient_gender,
							weight: response.data.data.patient_weight + "kg",
							age: response.data.data.patient_age,
							salary: "일 ￦ " + formatNumber(response.data.data.amount),
							reason: response.data.data.reason,
							other: response.data.data.other
						},
						isLoading: false
					});
				}
			}
		});
	}

	handleSubmit = async (id) => {
		this.setState({
			isLoading: true
		});

		let user = await this.rootStore.userStore.getUser();
		let user_id = user.id;


		await this.props.rootStore.hospitalStore.getRegisPatient(user_id, id).then(response => {
			if (response.data) {
				if (Object.keys(response.data).length !== 0) {
					this.setState({
						modalSubmit: "",
						isLoading: false
					});
					this.props.handleClose({ isPatientDetail: false, isPatient: false })
				} else {
					this.setState({
						messageError: response.message,
						modalError: "active",
						modalSubmit: "",
						isLoading: false
					})
				}
			} else {
				this.setState({
					messageError: response.message,
					modalError: "active",
					modalSubmit: "",
					isLoading: false
				})
			}
		});
	}

	handleSubmitReload = async () => {
		const { user_id } = this.props;
		this.setState({
			modalError: ''
		});

		let hospitals = toJS(this.props.rootStore.hospitalStore.hospitalsResult);
		let listAddress = toJS(this.props.rootStore.hospitalStore.addressResult);

		hospitals = hospitals.filter(item => item.user_id === user_id);
		listAddress = listAddress.filter(item => item.user_id === user_id);


		let arrayHospital = [];
		hospitals.map((item) => {
			arrayHospital.push(item.name);
			return item;
		});
		let arrayAddress = [];
		listAddress.map((item) => {
			arrayAddress.push(item.district);
			return item;
		});

		await this.hospitalStore.searchPatient(user_id, arrayHospital, arrayAddress).then(response => {
			this.props.handleClose({
				isPatient: true,
				isPatientDetail: false,
				listPatient: response.data.data.jobs
			});
		});
	}

	render() {
		const { modalSubmit, modalError, messageError } = this.state;
		const {
			id,
			time_start,
			time_end,
			date_start,
			date_end,
			is_off,
			name,
			gender,
			weight,
			age,
			salary,
			ability_move,
			ability_change_posture,
			ability_cognitive,
			ability_toilet,
			ability_eat,
			ability_suction,
			reason,
			other
		} = this.state.data;		

		return (
			<div className="wrapper">
				<header className="pop-header">
					<div className="header-wrap">
						<div className="SubPage-title">
							<h2>환자 찾기</h2>
						</div>
						<div
							className="close"
							onClick={() => this.props.handleClose({ isPatientDetail: false, isPatient: true })}
						>
							<img src={ico_close} alt="" />
						</div>
					</div>
				</header>
				{this.renderLoading()}
				<div className="content-body">
					<div className="Sub-Container">
						<div className="SubContent-wrap disabled-input">
							<h2 className="page-alert">
								환자에 대한 정보를 입력해주세요.
							</h2>
							<DateTime
								time_start={time_start}
								time_end={time_end}
								date_start={date_start}
								date_end={date_end}
								is_off={is_off}
							/>
							<Name
								name={name}
								gender={gender}
							/>
							<Text
								label="환자의 몸무게를 입력해주세요"
								placeholder="환자의 몸무게를 입력해주세요"
								value={weight}
							/>
							<Text
								label="환자의 나이를 입력해주세요"
								placeholder="나이를 입력 해주세요"
								value={age}
							/>
							<Text
								label="간병비를 입력하세요"
								placeholder="간병비를 입력하세요"
								value={salary}
							/>
							<RadioGroup
								label="환자의 증상을 입력해주세요"
								ability_move={ability_move}
								ability_change_posture={ability_change_posture}
								ability_cognitive={ability_cognitive}
								ability_toilet={ability_toilet}
								ability_eat={ability_eat}
								ability_suction={ability_suction}
							/>
							<TextArea
								label="환자의 증상을 입력해주세요"
								placeholder="환자의 증상을 입력해주세요"
								value={reason}
								isRequied={true}
							/>
							<TextArea
								label="기타 요청사항을 입력해주세요"
								value={other}
								placeholder="기타 요청사항을 입력해주세요"
							/>
							<div className="BottomBtn-wrap">
								<button
									className="btn-bottom"
									onClick={() => this.handleChange({ modalSubmit: "active" })}
								>
									신청하기
								</button>
								<button
									className="btn-bottom btn-style2"
									onClick={() => this.props.handleClose({ isPatientDetail: false, isPatient: true })}
								>
									취소
							</button>
							</div>
						</div>
					</div>
				</div>
				<Popup
					classPopup="pop-wrap"
					classActive={modalSubmit}
					isClose={true}
					handleClose={() => this.handleChange({ modalSubmit: "" })}
				>
					<div className="pop-head">
						<h2>알림</h2>
					</div>
					<div className="pop-content normal px-1">
						<p>간병 신청이 완료되었습니다.</p>
						<p>간병 신청 내역은 대기내역에서 확인이 가능하며,</p>
						<p>신청하신 간병은 보호자가 최종 승인 시 확정됩니다.</p>
					</div>
					<div className="pop-footer btn-2">
						<button
							className="agree"
							onClick={() => this.handleSubmit(id)}
						>예</button>
						<button
							className="cancel"
							onClick={() => this.handleChange({ modalSubmit: "" })}
						>취소</button>
					</div>
				</Popup>
				<Popup
					classPopup="pop-wrap"
					classActive={modalError}
					isClose={true}
					handleClose={this.handleSubmitReload}
				>
					<div className="pop-head">
						<h2>알림</h2>
					</div>
					<div className="pop-content normal">
						<p>
							{messageError}
						</p>
					</div>
					<div className="pop-footer">
						<button
							className="agree"
							onClick={this.handleSubmitReload}
						>취소</button>
					</div>
				</Popup>
			</div>
		)
	}
}

export default PopupPatientDetail;