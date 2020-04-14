import React, { Component } from 'react';
import Header from '../common/header';
import id_logo from '../../public/images/id_logo.png';
import queryString from 'query-string';
import { Redirect, Link } from 'react-router-dom';

class IdClear extends Component {
	render() {
		const parsed = queryString.parse(this.props.location.search);
		let ID = '';

		if (Object.keys(parsed).length === 0) {
			return (
				<Redirect to='/findpassword' />
			);
		} else {
			ID = parsed.ID;
		}

		return (
			<div className="wrapper">
				<Header
					title="아이디 찾기"
					link="/login"
					isLink={true}
					classes=""
					classLink=""
					classHeader="header-wrap"
				/>
				<div className="content-body">
					<div className="main-Container">
						<div className="content-wrap">
							<div className="login-success">
								<img src={id_logo} alt="" />
								<p><span className="lh-15">당신의 아이디는[{ID}]입니다</span></p>
							</div>
						</div>
					</div>
					<div className="BottomBtn-wrap fixed">
						<button className="btn-bottom">
							<Link to="/login">
								로그인하러가기
							</Link>
						</button>
						<button className="btn-bottom btn-style2">
							<Link to="/findpassword?type=2">
								비밀번호 찾기
							</Link>
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default IdClear;