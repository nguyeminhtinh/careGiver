import React, { Component } from 'react';
import ico_close from '../../public/images/ico_close2.png';
import ico_search from '../../public/images/ico_search.png';
import ico_search2 from '../../public/images/ico_search2.png';
import none_list from '../../public/images/none_list.png';
import { observer, inject } from "mobx-react";
import { withRouter } from 'react-router';
import { toJS } from 'mobx';
import Loading from '../common/loading';
import { ENTER_KEY } from "../../commons/constants";

@withRouter
@inject('rootStore')
@observer
class PopupSearch extends Component {
	rootStore;
	constructor(props) {
		super(props);

		this.rootStore = this.props.rootStore;
		this.state = {
			keySearch: '',
			isLoading: false
		}
	}
	async componentWillMount() {
		await this.rootStore.hospitalStore.setHospitals([]);
	}

	handleChange =  async (e) => {
		let data = e.target.value;
		if (e.key === ENTER_KEY) {
			this.setState({
				keySearch: data
			});
			this.setState({isLoading: true});
			await this.getDataSearchHospital(data);
		} 
	}

	getDataSearchHospital = async (keySearch) => {
		await this.rootStore.hospitalStore.searchHospital(keySearch).then(response => {
			this.setState({
				isLoading: false
			});
			let dataResult = response;
			this.props.hospitals.map((item) => {
				dataResult = dataResult.filter(ite => ite.id !== item.id);
				return item;
			});

			return dataResult;
		}).catch(error => {
			this.setState({
				isLoading: false
			});
		});
	}

	renderContentSearch = (hospitals) => {
		const { isLoading } = this.state;

		if (isLoading) {
			return (
				<Loading loading={isLoading} />
			);
		}

		return this.renderContent(hospitals);
	}

	handleAddHospital = async (item) => {
		let data = item;
		data.user_id = this.props.user_id;
		await this.rootStore.hospitalStore.addHospitalResult(data);
		this.props.handleClose({ isSearch: false });
	}

	renderContent = (hospitals) => {
		const { keySearch } = this.state;

		if (keySearch.trim().length === 0) {
			return (
				<div className="search-list None">
					<div className="NoneSearch-list">
						<img src={ico_search} alt="" />
						<p>근무를 희망하는 병원명을 입력해 주세요.</p>
					</div>
				</div>
			);
		}

		if (hospitals.length !== 0) {
			let html = [];

			hospitals.map((item, key) => {
				html.push(
					<li
						key={key}
						onClick={() => this.handleAddHospital(item)}
					>
						<h2 className="search-title">{item.name}</h2>
						<p className="adress">{item.address}</p>
					</li>
				);
				return item;
			});

			return (
				<div className="search-list mt-25">
					<ul className="SearchList-wrap">
						{html}
					</ul>
				</div>
			);
		}

		return (
			<div className="none-list custom-height">
				<img src={none_list} alt="" />
				<p>검색 항목이 없습니다.</p>
			</div>
		);
	}

	render() {
		let hospitals = toJS(this.props.rootStore.hospitalStore.hospitals);

		return (
			<div className="wrapper">
				<header className="pop-header">
					<div className="header-wrap">
						<div className="SubPage-title">
							<h2>병원 검색</h2>
						</div>
						<div
							className="close"
							onClick={() => this.props.handleClose({ isSearch: false })}
						>
							<img src={ico_close} alt="" />
						</div>
					</div>
				</header>
				<div className="content-body">
					<div className="main-Container">
						<div className="content-wrap SearchContent-wrap none-list">
							<div className="search-wrap custom-search-wrap">
								<div className="search-input">
									<input
										type="text"
										placeholder="병원 이름을 입력하세요."
										className="right-btn"
										onKeyDown={(e) => this.handleChange(e)}
									/>
									<button className="search-btn"><img src={ico_search2} alt="" /></button>
								</div>
							</div>
							{this.renderContentSearch(hospitals)}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default PopupSearch;