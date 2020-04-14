import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { isIOS } from "react-device-detect";
import Cleave from 'cleave.js/react';
import { Link } from 'react-router-dom';
import { isNumberKey, isHANGUL } from '../../commons/common';
const step3 ="SignUp3";
const step4 ="SignUp4";
const step5 ="SignUp5";
@inject('rootStore')
@observer

class SignUp03 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				full_name: this.props.dataInput.full_name || "",
				gender: this.props.dataInput.gender || "",
				is_foreigner: this.props.dataInput.is_foreigner || "",
				age: this.props.dataInput.age || "",
				experience: this.props.dataInput.experience || "",
				image: this.props.dataInput.image || "",
				insurance_number: this.props.dataInput.insurance_number || "",
			},
			addClassName: "fail",
			addClassGender: "fail",
			addClassAge: "fail",
			addClassExperience: "fail",
			addClassPhone: "fail",
			addClassResident: "fail",
			addClassForeigner: "fail"
		}
	}

	componentDidMount() {
		var { full_name, gender, is_foreigner, age, experience , insurance_number } = this.props.dataInput;
		if(full_name && gender && is_foreigner && age && experience && insurance_number){
			this.setState({
				addClassName: "success",
				addClassGender: "success",
				addClassAge: "success",
				addClassExperience: "success",
				addClassPhone: "success",
				addClassResident: "success",
				addClassForeigner: "success",
			});
		}
	}

	handleChangeName = () => {
		const { full_name } = this.state.data;
		let addClassName = "success";

		if (full_name.trim().length === 0) {
			addClassName = "fail";
		}

		if (full_name.trim().length > 16 || isHANGUL(full_name)) {
			addClassName = "fail";
		}

		this.setState({
			addClassName
		});
	}

	handleChangeResident = () => {
		const { insurance_number } = this.state.data;
		let addClassResident = "success";

		if (insurance_number.length !== 14) {
			addClassResident = "fail";
		}

		this.setState({
			addClassResident
		});
	}

	handleChangeAge = () => {
		const { age } = this.state.data;
		let addClassAge = "success";

		if (age.trim().length === 0) {
			addClassAge = "fail";
		}

		if (parseInt(age.trim()) > 100) {
			addClassAge = "fail";
		}

		if (parseInt(age.trim()) < 0) {
			addClassAge = "fail";
		}

		if (age.toString().indexOf('.') !== -1) {
			addClassAge = "fail";
		}

		this.setState({
			addClassAge
		});

	}

	handleChangeExperience = () => {
		const { experience, age } = this.state.data;
		let addClassExperience = "success";

		if (experience.trim().length === 0) {
			addClassExperience = "fail";
		}

		if (parseInt(experience.trim()) > 100) {
			addClassExperience = "fail";
		}

		if (parseInt(experience.trim()) < 0) {
			addClassExperience = "fail";
		}

		if (parseInt(experience.trim()) > parseInt(age.trim())) {
			addClassExperience = "fail";
		}

		if (experience.toString().indexOf('.') !== -1) {
			addClassExperience = "fail";
		}

		this.setState({
			addClassExperience
		});
	}

	handleChangeForeigne = () =>{
		const { is_foreigner } = this.state.data;

		let addClassForeigner= "fail";
		if(is_foreigner !==""){
			addClassForeigner= "success"
		}
		this.setState({
			addClassForeigner
		});
	}

	handleChangeGender = () =>{
		const { gender } = this.state.data;

		let addClassGender= "fail";
		if(gender !==""){
			addClassGender= "success"
		}
		this.setState({
			addClassGender
		});
	}

	handleChangeData = (data) => {
		this.setState({
			data: {
				...this.state.data,
				...data
			},
		}, () => {
			this.handleChangeName();
			this.handleChangeAge();
			this.handleChangeResident();
			this.handleChangeExperience();
			this.handleChangeForeigne();
			this.handleChangeGender();
			this.props.handleChangeStep({ step: step4, data: this.state.data });
		});
	}

	getFileName = async (e) => {
		let image = await this.fileToBase64(e);

		if (image !== undefined) {
			this.setState({
				data: {
					...this.state.data,
					image
				},
			});
		}
	}

	renderWrappAvatar = () => {
		let { image } = this.state.data;
		let classes = 'MyFace';

		if (image.length > 0) {
			classes = 'MyFace image';
		}

		return (
			<label className={classes} htmlFor="uploadFile">
				{this.renderProfile(image)}
				<input type="file"
					name="uploadFile"
					id="uploadFile"
					accept="image/png, image/jpeg, image/jpg"
					className="d-none"
					onChange={(e) => this.getFileName(e.target)}
				/>
			</label>
		);
	}

	renderProfile = (image) => {
		if (image.length > 0) {
			return (
				<img src={image} alt="" className="img-profile" />
			);
		}
	}

	fileToBase64 = (inputFile) => {
		var file = inputFile.files[0];
		if (file !== undefined) {
			return new Promise(resolve => {
				var reader = new FileReader();
				reader.onload = function (event) {
					resolve(event.target.result);
				};

				reader.readAsDataURL(file);
			});
		}
	};

	handleData = () => {
		var { full_name, insurance_number, age, experience , gender, is_foreigner, image } = this.state.data;

			this.setState({
				data:{
					full_name,
					age,
					experience,
					gender,
					is_foreigner,
					insurance_number,
					image,
				}
			})
		this.props.handleChangeStep({ step: step5, data: this.state.data })
	}

	render() {
		const { full_name, age, experience, insurance_number, is_foreigner, gender } = this.state.data;
		const { addClassName, addClassAge, addClassExperience, addClassResident, addClassForeigner, addClassGender } = this.state;
		const blockButton =  (addClassName ==="success" && addClassResident ==="success" && addClassAge ==="success" && addClassExperience ==="success" && addClassForeigner=== "success" && addClassGender=== "success" ) ? "BottomBtn-wrap": "BottomBtn-wrap off";
		const disabledButton = !(addClassName ==="success" && addClassResident ==="success" && addClassAge ==="success" && addClassExperience ==="success" && addClassForeigner==="success" && addClassGender=== "success" ) ? true: false;
		return (
			<div className="wrapper">
				<header>
					<div className="header-wrap">
						<div className="ico-back"
							onClick={() => this.props.backStep({ step: step3 })}>
						<Link to={"/signup"} />
						</div>
						<div className="SubPage-title ">
							<h2>회원가입</h2>
						</div>
					</div>
				</header>
				<div className="content-body">
					<div className="Sub-Container">
						<div className="SubContent-wrap paddingTop-wrap">
							<div className="input-wrap">
								<label className="input-title">
									이름
              					</label>
								<div className={"basic-input " + addClassName}>
									<input
										type="text"
										placeholder="이름을 입력하세요"
										value={full_name}
										onChange={(e) => this.handleChangeData({ full_name: e.target.value })}
									/>
									{addClassName === "fail" && <i className="ressetValue" onClick={() => this.handleChangeData({ full_name: "" })}></i>}
								</div>
								<span className="alert-massage">간병인에게 보여질 이름입니다.<br />한글로 16자리 이하 입력가능</span>
							</div>
							<div className="input-wrap">
								<label className="input-title">
									주민등록번호
              					</label>
								<div className={"basic-input " + addClassResident}>
									<Cleave
										placeholder="주민등록번호를 입력하세요"
										options={{
											numericOnly: true,
											delimiters: ['-'],
											blocks: [6, 7]
										}}
										pattern="[0-9]*"
										inputMode={isIOS ? "" : "numeric"}
										value={insurance_number}
										onChange={(e) => this.handleChangeData({ insurance_number: e.target.value })}
									/>
								</div>
								<span className="alert-massage">세금 계산의 목적으로 수집됩니다.<br />자세한 내용은 약관을 참고하세요.</span>
							</div>
							<div className="input-wrap gender-wrap">
								<label className="input-title">
									내국인/외국인
              					</label>
								<div className="checkbox-wrap gender-check">
									<input
										type="radio"
										id="locals"
										name="nationality"
										className="nationality"
										checked={is_foreigner ===0}
										onChange={() => this.handleChangeData({ is_foreigner: 0 })}
									/>
									<label className="agree-label" htmlFor="locals"><span className="checkbox-custom" /></label><span className="gender">내국인</span>
								</div>
								<div className="checkbox-wrap gender-check">
									<input
										type="radio"
										id="foreigner"
										name="nationality"
										className="nationality"
										checked={is_foreigner ===1}
										onChange={() => this.handleChangeData({ is_foreigner: 1 })}
									/>
									<label className="agree-label" htmlFor="foreigner"><span className="checkbox-custom" /></label><span className="gender">외국인</span>
								</div>
							</div>
							<div className="input-wrap gender-wrap">
								<label className="input-title">
									성별
              					</label>
								<div className="checkbox-wrap gender-check">
									<input
										type="radio"
										id="Man"
										name="gender"
										className="Gender"
										checked={gender ===1}
										onChange={() => this.handleChangeData({ gender: 1 })}
									/>
									<label className="agree-label" htmlFor="Man"><span className="checkbox-custom" /></label><span className="gender">남자</span>
								</div>
								<div className="checkbox-wrap gender-check">
									<input
										type="radio"
										id="Woman"
										name="gender"
										className="Gender"
										checked={gender === 2}
										onChange={() => this.handleChangeData({ gender: 2 })}
									/>
									<label className="agree-label" htmlFor="Woman"><span className="checkbox-custom" /></label><span className="gender">여자</span>
								</div>
							</div>
							<div className="input-wrap">
								<label className="input-title">
									나이
              					</label>
								<div className={"basic-input " + addClassAge}>
									<input
										type="number"
										pattern="[0-9]*"
										placeholder="나이를 입력하세요"
										value={age}
										onChange={(e) => this.handleChangeData({ age: e.target.value })}
										onKeyPress={(e) => isNumberKey(e)}
									/>
								</div>
							</div>
							<div className="input-wrap">
								<label className="input-title">
									경력
              					</label>
								<div className={"basic-input " + addClassExperience}>
									<input
										type="number"
										pattern="[0-9]*"
										placeholder="경력을 입력하세요"
										value={experience}
										onChange={(e) => this.handleChangeData({ experience: e.target.value })}
										onKeyPress={(e) => isNumberKey(e)}
									/>
								</div>
							</div>
							<div className="input-wrap profile-wrap">
								<label className="input-title">
									프로필 사진
              					</label>
								<div className="profile-inner">
									<div className="basic-input">
										{this.renderWrappAvatar()}
									</div>
									<span className={this.state.data.image?"d-none":"alert-massage"}>자신의 프로필 사진을 업로드해주세요.</span>
								</div>
							</div>
							<div className={blockButton}>
								<button className="btn-bottom"
									disabled ={disabledButton}
									onClick={this.handleData}
								>
									다음
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default SignUp03;