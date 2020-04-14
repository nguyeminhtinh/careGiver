import React, { Component } from 'react';
import Header from '../common/header';
import { inject, observer } from 'mobx-react';
import InputCheckbox from '../common/checkBox';
import Privacy01 from './privacy01';
import Privacy02 from './privacy02';
import Privacy00 from './privacy00';

const page1 = "회원가입";
const page2 = "개인정보취급방침(필수)";
const page3 = "CareU 이용약관(필수)";
const page4 = "CareU";
const step2 = "SignUp2";
@inject('rootStore')
@observer

class SignUp01 extends Component {
	constructor(props) {
		super(props);
		this.state = {

			isChecked: {
				idChecked2: this.props.dataInput.idChecked2 || false,
				idChecked3: this.props.dataInput.idChecked2 || false,
				idChecked4: this.props.dataInput.idChecked2 || false,
			},
			page: page1,
		}
	}

	handleChange = (data) => {
		this.setState({
			...data
		});
	}

	renderCheckAll = () => {
		let { idChecked2, idChecked3, idChecked4 } = this.state.isChecked;

		return (
			<div className="checkbox-wrap">
				<InputCheckbox
					id="all"
					name="AllChecked"
					checked={idChecked2 && idChecked3 && idChecked4}
					onCheck={this.handleCheckAll}
				/>
				<label htmlFor="all"><span className="checkbox-custom" /><span className="checkbox-label">전체동의</span></label>
			</div>
		);
	}

	handleCheckAll = () => {
		let { idChecked2, idChecked3, idChecked4 } = this.state.isChecked;

		if (!(idChecked2 && idChecked3 && idChecked4)) {
			this.setState({
				isChecked: {
					idChecked2: true,
					idChecked3: true
				},
			});
		}

		if (true && idChecked2 && idChecked3 && idChecked4) {
			this.setState({
				isChecked: {
					idChecked2: false,
					idChecked3: false,
					idChecked4: false
				}
			});
		} else {
			this.setState({
				isChecked: {
					idChecked2: true,
					idChecked3: true,
					idChecked4: true
				},
			});
		}
	}

	handleChangeCheck = (data) => {
		this.setState({
			isChecked: {
				...this.state.isChecked,
				...data
			}
		});
	}

	renderSignUp1 = () => {
		const { isChecked } = this.state;
		return (
			<div className="wrapper">
				<Header
					title="회원가입"
					link=""
					isLink={true}
					classHeader="header-wrap"
					classes=""
					classLink=""
				/>
				<div className="content-body">
					<div className="Sub-Container">
						<div className="SubContent-wrap paddingTop-wrap">
							<div className="agree-wrap">
								<div className="agree-head">
									{this.renderCheckAll()}
								</div>
								<div className="agree-cont">
									<div className="checkbox-wrap">
										<InputCheckbox
											id="Privacy"
											name="AllChecked"
											onCheck={(e) => this.handleChangeCheck({ idChecked2: !this.state.isChecked.idChecked2 })}
											checked={isChecked.idChecked2}
											className="AcceptAllChecked"
										/>
										<label className="agree-label" htmlFor="Privacy"><span className="checkbox-custom" /><span className="checkbox-label">개인정보처리방침</span> <span className="necessary">[필수]</span></label>
										<i className="detail-view"
											onClick={() => this.handleChange({ page: page2 })}
										>자세히 보기</i>
									</div>
									<div className="checkbox-wrap">
										<InputCheckbox
											id="CareUAccept"
											name="AllChecked"
											onCheck={(e) => this.handleChangeCheck({ idChecked3: !this.state.isChecked.idChecked3 })}
											checked={isChecked.idChecked3}
											className="AcceptAllChecked"
										/>
										<label className="agree-label" htmlFor="CareUAccept"><span className="checkbox-custom" /><span className="checkbox-label">CAREYOU 이용약관(간병인)</span> <span className="necessary">[필수]</span></label>
										<i className="detail-view"
											onClick={() => this.handleChange({ page: page3 })}
										>자세히 보기</i>
									</div>
									<div className="checkbox-wrap">
										<InputCheckbox
											id="CareUAgreement"
											name="AllChecked"
											onCheck={(e) => this.handleChangeCheck({ idChecked4: !this.state.isChecked.idChecked4 })}
											checked={isChecked.idChecked4}
											className="AcceptAllChecked"
										/>
										<label className="agree-label" htmlFor="CareUAgreement"><span className="checkbox-custom" /><span className="checkbox-label">CAREYOU 간병인 계약서</span> <span className="necessary">[필수]</span></label>
										<i className="detail-view"
											onClick={() => this.handleChange({ page: page4 })}
										>자세히 보기</i>
									</div>
								</div>
							</div>
							<div className={!(isChecked.idChecked2 && isChecked.idChecked3 && isChecked.idChecked4) ? "BottomBtn-wrap fixed off" : "BottomBtn-wrap fixed"}>
								<button className="btn-bottom"
									disabled={!(isChecked.idChecked2 && isChecked.idChecked3 && isChecked.idChecked4) ? true : false}
									onClick={() => this.props.handleChangeStep({
										step: step2, data: {
											idChecked2: true,
											idChecked3: true,
											idChecked4: true
										}
									})}
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

	renderPage = () => {
		var { page } = this.state;

		if (page === page1) {
			return (
				<div>
					{this.renderSignUp1()}
				</div>
			)
		}

		if (page === page2) {
			return (
				<Privacy00
					handleChangeCheck={this.handleChangeCheck}
					handleChange={this.handleChange}
					idChecked2={this.state.isChecked.idChecked2}
				/>
			)
		}

		if (page === page3) {
			return (
				<Privacy01
					handleChangeCheck={this.handleChangeCheck}
					handleChange={this.handleChange}
					idChecked3={this.state.isChecked.idChecked3}
				/>
			)
		}

		return (
			<Privacy02
				handleChangeCheck={this.handleChangeCheck}
				handleChange={this.handleChange}
				idChecked4={this.state.isChecked.idChecked4}
			/>
		);
	}

	render() {

		return (
			<div>
				{this.renderPage()}
			</div>
		)
	}
}

export default SignUp01;