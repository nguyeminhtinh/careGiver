import React, { Component } from 'react';
import Header from '../common/header';
import mail_logo from '../../public/images/mail_logo.png';
import queryString from 'query-string';
import { Redirect, Link } from 'react-router-dom';

class MailClear extends Component {

	render() {
		const parsed = queryString.parse(this.props.location.search);

		if (Object.keys(parsed).length === 0) {
			return (
				<Redirect to='/findpassword' />
			);
		}

		return (
			<div className="wrapper">
				<Header
					title="비밀번호 찾기"
					link="/findpassword"
					isLink={true}
					classes=""
					classLink=""
					classHeader="header-wrap"
				/>
				<div className="content-body">
					<div className="main-Container">
						<div className="content-wrap">
							<div className="login-success">
								<img src={mail_logo} alt="" />
								<p>임시비밀번호를 전송했습니다.</p>
								<p>이메일을 확인해주세요.</p>
							</div>
						</div>
					</div>
					<div className="BottomBtn-wrap fixed">
						<button className="btn-bottom">
							<Link to="/login">
								로그인하러가기
							</Link>
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default MailClear;