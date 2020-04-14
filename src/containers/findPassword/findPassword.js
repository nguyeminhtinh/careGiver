import React, { Component } from "react";
import FindUserComponent from "../../components/findUser/findUser";

export default class FindPassword extends Component {
	constructor(props) {
		super(props);

		this.state = {
			type: 1
		}
	}

	componentWillMount() {
		if (this.props.location.search.length !== 0) {
			let type = this.props.location.search.split('=')[1];
			this.setState({
				type
			});
		}
	}

	render() {
		const { type } = this.state;

		return (
			<FindUserComponent
				type={type}
			/>
		);
	}
}
