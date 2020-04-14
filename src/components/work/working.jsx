import React, { Component } from 'react';
import Header from '../common/header';
import DateTime from '../common/caregiver/dateTime';
import Name from '../common/caregiver/name';
import Text from '../common/caregiver/text';
import TextArea from '../common/caregiver/textArea';
import RadioGroup from '../common/caregiver/radioGroup';
import { observer, inject } from "mobx-react";
import { withRouter } from 'react-router';
import { formatNumber } from '../../commons/common';
import { Link } from 'react-router-dom';
import Loading from '../common/loading';
import { Redirect } from 'react-router-dom';
import _ from "lodash";
@withRouter
@inject('rootStore')
@observer
class Working extends Component {
	rootStore;
	constructor(props) {
		super(props);

		this.rootStore = this.props.rootStore;
		this.state = {
			data: {
				time_start: "",
				time_end: "",
				date_start: "",
				date_end: "",
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
				other: "",
				reason: ""
			},
			redirect: false,
			isLoading: true
		}
	}

	componentWillMount() {
		this._renderData(parseInt(this.props.match.params.id));
	}

	_renderData = async (id) => {
		this.props.rootStore.historyStore.getCaregiverProgressById(id).then(response => {
			if (response.data) {
				if (_.size(response.data.data) !==0) {
					this.setState({
						data: {
							...this.state.data,
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
							salary: "일 ￦ " + formatNumber(response.data.data.amount || 0),
							other: response.data.data.other,
							reason: response.data.data.reason
						},
						isLoading: false
					});
				}else{
					this.setState({
						redirect: true
					});
				}
			}
		}).catch(err => {
			this.setState({
				isLoading: false
			});
		});
	}

	renderLoading = () => {
		const { isLoading } = this.state;

		if (isLoading) {
			return (
				<Loading loading={this.state.isLoading} loadingOverlayDiv={true} />
			);
		}
	}

	render() {
		const {
			time_start,
			time_end,
			date_start,
			date_end,
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
			other,
			reason
		} = this.state.data;
		if (this.state.redirect) {
			return <Redirect to="/work?tab=1"
			/>
		}
		return (
			<div className="wrapper">
				
				<Header
					title="간병 내역"
					link="/work?tab=1"
					isLink={true}
					classHeader="header-wrap"
					classes=""
					classLink=""
				/>
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
								placeholder="기타 요청사항을 입력해주세요"
								value={other}
							/>
							<div className="BottomBtn-wrap">
								<button className="btn-bottom">
									<Link to="/work">
										확인
									</Link>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Working;