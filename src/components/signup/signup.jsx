import React, { Component } from 'react';
import SignUpPayLoadRequest from '../../models/User';
import { signUpCareGiver } from '../../services/authSevice';
import User from '../../models/User';
import SignUp01 from './signup01';
import SignUp02 from './signup02';
import SignUp03 from './signup03';
import SignUp04 from './signup04';
import { Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Loading from '../common/loading';
import Popup from '../common/popup';
import _ from "lodash";

const step1 = "SignUp1";
const step2 = "SignUp2";
const step3 = "SignUp3";
const step5 = "SignUp5";

@withRouter
@inject('rootStore')
@observer
class SignUp extends Component {
	rootStore;
	constructor(props) {
		super(props);
		this.rootStore = this.props.rootStore;
		this.state = {
			username: "",
			password: "",
			password_confirmation: "",
			full_name: "",
			gender: "",
			is_foreigner: "",
			age: "",
			experience: "",
			phone: "",
			image: "",
			sms_code: "",
			insurance_number: "",
			step: step1,
			isLoading: false,
			modalIsOpen: "",
			idChecked2: false,
			idChecked3: false,
			isVerify: null,
			time: 0
		}
	}

	backStep = (data) => {
		this.setState({
			...this.state,
			...data,
		});
	}

	handleChangeStep = (data) => {
		this.setState({
			...this.state,
			...data.data,
			step: data.step
		},() => {
			if (this.state.step === step5 ) {
				this.handleSaveData();
			}
		});
	}

	handleSaveData = async () => {
		var username = this.state.username,
			password = this.state.password,
			password_confirmation = this.state.password_confirmation,
			full_name = this.state.full_name,
			age = this.state.age,
			experience = this.state.experience,
			is_foreigner = this.state.is_foreigner,
			gender = this.state.gender,
			phone = this.state.phone,
			insurance_number = this.state.insurance_number,
			sms_code = this.state.sms_code,
			image = this.state.image,
			
			signUpPayLoad = new SignUpPayLoadRequest({
				username,
				password,
				password_confirmation,
				full_name,
				age,
				experience,
				gender,
				is_foreigner,
				phone,
				insurance_number,
				sms_code,
				image
			});
			try {
				this.setState({
					isLoading: true
				});
				var userSigUpPayload = new User(signUpPayLoad);
				await signUpCareGiver(userSigUpPayload.data.data).then(response => {
					if(_.size(response.data) > 1){
						this.setState({
							redirect: true,
							isLoading: false,
						});
					}
					
				}).catch(error => {
					this.setState({
						isLoading: false
					});
				});
				
				this.handleChangeData({ isVerify: true, time: 0 });
				this.setState({
					isLoading: false
				});
			} catch (ex) {
				this.setState({
					isLoading: false
				});
		}
	}

	renderPage = () => {
		var { step } = this.state;

		if (step === step1) {
			return (
				<SignUp01
					handleChangeStep={this.handleChangeStep}
					dataInput={this.state}
				/>
			)
		}

		if (step === step2) {
			return (
				<SignUp02
					handleChangeStep={this.handleChangeStep}
					backStep = {this.backStep}
					dataInput={this.state}
				/>
			)
		}

		if (step === step3) {
			return (
				<SignUp03
					handleChangeStep={this.handleChangeStep}
					backStep={this.backStep}
					dataInput={this.state}
				/>
			)
		}

		return (
			<SignUp04
				handleChangeStep={this.handleChangeStep}
				backStep={this.backStep}
				dataInput={this.state}
			/>
		);
	}

	handleChange = (data) => {
		this.setState({
			...data
		});
	}
	
	renderLoading = () => {
		const { isLoading } = this.state;

		if (isLoading) {
			return (
				<div className="signup-loading">
					<Loading loading={isLoading} loadingOverlayDiv={true} />
				</div>
			);
		}
	}

	render() {
		const { modalIsOpen, messageError, redirect } = this.state;
		if (redirect) {
			return <Redirect to='/signup/success' />
		}

		return (
			<div>
				{this.renderLoading()}
				{this.renderPage()}
				<Popup
					classPopup="pop-wrap"
					classActive={modalIsOpen}
					isClose={true}
					handleClose={() => this.handleChange({ modalIsOpen: "" })}
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
							onClick={() => this.handleChange({ modalIsOpen: "" })}
						>확인</button>
					</div>
				</Popup>
			</div>
		)
	}
}

export default SignUp