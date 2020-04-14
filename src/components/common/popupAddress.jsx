import React, { Component } from "react";
import ico_close from "../../public/images/ico_close2.png";
import { getListAddress, getCitys } from "../../commons/common";
import TabHeader from "./addressTabHeader";
import TabContent from "./addressTabContent";
import Popup from "../common/popup";
import { observer, inject } from "mobx-react";
import { withRouter } from 'react-router';

@withRouter
@inject('rootStore')
@observer
class PopupAddress extends Component {
	rootStore;
	constructor(props) {
		super(props);

		this.rootStore = this.props.rootStore;
		this.state = {
			address: [],
			citys: [],
			selectedTab: null,
			listsSelect: [],
			modalIsOpen: ""
		};
	}

	componentDidMount() {
		const address = [...getListAddress()];
		const citys = [...getCitys()];
		const selectedTab = citys[0];
		const listsSelect = this.props.listAddress;
		citys.map(city => city.active = false);
		address.map(add => add.active = false);

		if (listsSelect.length !== 0) {
			listsSelect.map(list => {
				if (list._id === "city") {
					citys.map(c => {

						if (list.city._id === c._id)
							c.active = true;

						return c;
					})
				} else {
					address.map(a => {
						if (a._id === list._id) a.active = true;

						return a;
					})
				}
				return list;
			});
		}

		this.setState({
			address,
			citys,
			selectedTab,
			listsSelect
		});
	}

	handleTabSelect = tab => {
		this.setState({ selectedTab: tab });
	};

	handleDistrictSelect = add => {
		const address = [...this.state.address];
		const index = address.indexOf(add);
		address[index] = { ...address[index] };
		address[index].active = !address[index].active;

		let lists = [...this.state.listsSelect];
		if (address[index].active) {
			lists.push(add);
		} else {
			lists = lists.filter(el => el._id !== add._id);
		}

		const citys = [...this.state.citys];
		const city = citys.filter(ec => ec._id === add.city._id);

		if (city[0].active) {
			lists = lists.filter(el => el._id !== add._id);
			address[index].active = false;
			this.setState({ listsSelect: lists });
		}

		if (lists.length > 5) {
			lists = lists.filter(el => el._id !== add._id);
			address[index].active = false;
			this.handleModal({ modalIsOpen: "active" });
			this.setState({ listsSelect: lists });
		}

		this.setState({
			address,
			listsSelect: lists
		});
	};

	hanleCitySelect = city => {
		const citys = [...this.state.citys];
		const index = citys.indexOf(city);
		citys[index] = { ...citys[index] };
		citys[index].active = !citys[index].active;

		let lists = [...this.state.listsSelect];
		lists = lists.filter(el => el.city._id !== city._id);
		const fake = {
			_id: "city",
			city,
			district: ""
		};

		if (citys[index].active) {
			lists.push(fake);
		} else {
			lists = lists.filter(el => el.city._id !== city._id);
		}

		if (lists.length > 5) {
			lists = lists.filter(el => el.city._id !== city._id);
			citys[index].active = false;
			this.handleModal({ modalIsOpen: "active" });
			this.setState({ listsSelect: lists });
		}

		const address = [...this.state.address];
		address.map(add => {
			if (add.city._id === city._id) add.active = false;
			return add;
		});
		this.setState({ citys, listsSelect: lists, selectedTab: city });
	};

	handleModal = data => {
		this.setState({
			...data
		});
	};

	handleSubmitAddress = async () => {
		let listsSelect = [...this.state.listsSelect];

		listsSelect.map(item => {
			item.user_id = this.props.user_id;
			return item;
		});
		await this.rootStore.hospitalStore.addAddressResult(listsSelect, this.props.user_id);
		this.props.handleChange({ isAddress: false });
	};

	render() {
		const {
			address,
			citys,
			selectedTab,
			modalIsOpen,
			listsSelect
		} = this.state;

		return (
			<div className="wrapper">
				<header className="pop-header">
					<div className="header-wrap">
						<div className="SubPage-title">
							<h2>주소 설정</h2>
						</div>
						<div
							className="close"
							onClick={() => this.props.handleClose({ isAddress: false })}
						>
							<img src={ico_close} alt="" />
						</div>
					</div>
				</header>
				<div className="content-body">
					<div className="main-Container">
						<TabHeader
							items={citys}
							selectedItem={selectedTab}
							onItemSelect={this.handleTabSelect}
						/>
						<TabContent
							address={address}
							citys={citys}
							selectedItem={selectedTab}
							onDistrictSelect={this.handleDistrictSelect}
							onCitySelect={this.hanleCitySelect}
							listsSelect={listsSelect}
						/>
						<div className="alarm-text content-wrap">
							<p>주소 설정은 최대 5개까지 설정이 가능합니다.</p>
						</div>
						<div className="BottomBtn-wrap fixed">
							<button className="btn-bottom" onClick={this.handleSubmitAddress}>
								선택완료
              				</button>
						</div>
					</div>
				</div>
				<Popup
					classPopup="pop-wrap"
					classActive={modalIsOpen}
					isClose={true}
					handleClose={() => this.handleModal({ modalIsOpen: "" })}
				>
					<div className="pop-head">
						<h2>알림</h2>
					</div>
					<div className="pop-content normal">
						<p>지역은 최대 5개까지 설정이 가능합니다</p>
					</div>
					<div className="pop-footer">
						<button
							className="agree"
							onClick={() => this.handleModal({ modalIsOpen: "" })}
						>
							확인
            			</button>
					</div>
				</Popup>
			</div>
		);
	}
}

export default PopupAddress;
