import React, { Component } from 'react';
import icon_close from '../../public/images/ico_close2.png';
import { observer, inject } from "mobx-react";
import { withRouter } from 'react-router-dom';
@withRouter
@inject('rootStore')
@observer
class ListBank extends Component {

	constructor(props) {
		super(props);
		this.state = {
			listBank: []
		}
	}

	async componentDidMount() {		
		this.props.rootStore.paymentStore.getBanks().then(response => {
			this.setState({ listBank: response })
		})
	}

	renderListBank = (array) => {
		let html = [];

		array.map((item, index) => {
			html.push(
				<li onClick={() => this.props.handleChangeBank(item)} key={index}>
					<div className="bank-ico"><img src={window.location.origin + item.image} alt="" /></div>
					<h2>{item.name}</h2>
				</li>
			);
			return item;
		});

		return html;
	}

	render() {
		const { modalIsOpen } = this.props;
		return (
			<div className={"passpay-popwrap " + modalIsOpen} >
				<div className="popup-inner">
					<div className="pop-head">
						<img
							src={icon_close}
							alt=""
							className="close"
							onClick={() => this.props.handleChange({ modalIsOpen: "" })}
						/>
						<h2>은행선택</h2>
					</div>
					<div className="pop-content pop-touch">
						<div className="bank-list">
							<ul>
								{this.renderListBank(this.state.listBank)}
							</ul>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default ListBank;