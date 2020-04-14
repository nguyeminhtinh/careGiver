import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import mypage_arrow from '../../public/images/mypage_arrow.png';
// import mypage_Name from '../../public/images/mypage_name.png';
import mypage_Lock from '../../public/images/mypage_lock.png';
import mypage_Card from '../../public/images/mypage_card.png';
import mypage_Service from '../../public/images/mypage_service.png';
import mypage_Version from '../../public/images/mypage_version.png';
import mypage_Logout from '../../public/images/mypage_logout.png';
import text_Logo from '../../public/images/caregiver_mypage_logo.jpg';
// import mypage_list from '../../public/images/mypage_list.png';
import mypage_pin from '../../public/images/mypage_pin.png';
import Header from "../common/header";
import Root from "../common/root";
import Popup from '../common/popup';
import "../../public/css/main.css";
import Loading from '../common/loading';
import { observer, inject } from "mobx-react";
import { withRouter } from 'react-router';

@withRouter
@inject('rootStore')
@observer
class MyPage extends Component {
	rootStore;
	constructor(props) {
		super(props);

		this.rootStore = this.props.rootStore;
		this.state = {
			modalIsOpen: "",
			username: "",
			full_name: "",
			isLoading: true
		}
	}

	async componentWillMount() {
		let user = await this.props.rootStore.userStore.getUser()
		this.setState({
			username: user.username,
			full_name: user.full_name,
			isLoading: false
		})
	}
	handleLogout = () => {
		const { rootStore } = this.props;
		rootStore.userStore.logOut();
		rootStore.sessionStore.signout();
	}

	handleChange = (data) => {
		this.setState({
			...data
		});
	}

	render() {
		const { modalIsOpen } = this.state;
		const sessionStore = this.rootStore.sessionStore;
		const redirectToReferrer = sessionStore.redirectToReferrer;
		const history = this.props.history;
		let { username, full_name, isLoading } = this.state;
		if (!redirectToReferrer) {
			window.location.href = "/login"
		}

		return (
			<Root active={4}>
				<Loading loading={isLoading} />
				<Header
					title="마이페이지"
					link="/"
					isLink={true}
					classes="title-top"
					classLink="mr-0"
					classHeader="SubHeader-wrap"
				/>
				<div className="content-body">
					<div className="main-Container">
						<div className="content-wrap">
							<div className="myInfoWrap">
								<div className="myEmail">
									<img src={text_Logo} alt="logo" />
									<p>{username}</p>
								</div>
								<div className="myName">
									<p>{full_name}</p>
								</div>
							</div>
							<div className="list-wrap">
								<ul>
									{/* <li>
										<Link to="/mypage/editname">
											<img src={mypage_Name} alt="name" />
											이름 수정
											<img src={mypage_arrow} alt="arrow" className="arrow" />
										</Link>
									</li> */}
									<li>
										<Link to="/mypage/resetpassword">
											<img src={mypage_Lock} alt="lock" />
											비밀번호 수정
											<img src={mypage_arrow} alt="arrow" className="arrow" />
										</Link>
									</li>
									<li>
										<Link to="/mypage/account">
											<img src={mypage_Card} alt="card" />
											계좌 등록
											<img src={mypage_arrow} alt="arrow" className="arrow" />
										</Link>
									</li>
									<li>
										<Link to="/mypage/service">
											<img src={mypage_Service} alt="service" />
											서비스 약관
											<img src={mypage_arrow} alt="arrow" className="arrow" />
										</Link>
									</li>
									<li>
										<Link to="/mypage/addpin">
											<img src={mypage_pin} alt="service" />
											통장 비밀번호 등록/수정
											<img src={mypage_arrow} alt="arrow" className="arrow" />
										</Link>
									</li>
									{/* <li>
										<Link to="/mypage/paylist">
											<img src={mypage_list} alt="service" />
											송금 내역
											<img src={mypage_arrow} alt="arrow" className="arrow" />
										</Link>
									</li> */}
									<li>
										<Link to="/mypage">
											<img src={mypage_Version} alt="version" />
											버전 정보
											<span className="version">Ver 1.0.0</span>
										</Link>
									</li>
									<li>
										<button className="d-flex align-items-center w-100 cl-555" onClick={() => this.handleChange({ modalIsOpen: 'active' })}>
											<img src={mypage_Logout} alt="logout" />
											로그아웃
											<img src={mypage_arrow} alt="arrow" className="arrow" />
										</button>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
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
							로그아웃을 하시겠습니까?
						</p>
					</div>
					<div className="pop-footer btn-2">
						<button className="agree" onClick={() => this.handleLogout(history)}>예</button>
						<button
							className="cancel"
							onClick={() => this.handleChange({ modalIsOpen: "" })}
						>취소</button>
					</div>
				</Popup>
			</Root>
		)
	}
}

export default MyPage;