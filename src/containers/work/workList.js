import React, { Component } from "react";
import WorkListComponent from "../../components/work/list";

export default class Work extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tab: 1
		}
	}

	componentWillMount() {
		if (this.props.location.search.length !== 0) {
			let tab = this.props.location.search.split('=')[1];
			this.setState({
				tab
			});
		}
	}

	render() {
		const { tab } = this.state;

		return (
			<WorkListComponent
				tab={tab}
			/>
		);
	}
}
