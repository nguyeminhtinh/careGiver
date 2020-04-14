import React, { Component } from 'react';

class CountDown extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			minute: this.props.minute || "03",
			second: this.props.second || "00",
			total: 0
		}
	}

	componentWillMount() {
		this._isMounted = true;
		this.initializeClock(this.props.time);
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	getTimeRemaining(time) {
		let total = Date.parse(time) - Date.parse(new Date());
		let second = Math.floor((total / 1000) % 60);
		let minute = Math.floor((total / 1000 / 60) % 60);

		if (this._isMounted) {
			this.setState({
				total,
				minute: ('0' + minute).slice(-2),
				second: ('0' + second).slice(-2)
			}, () => {
				this.props.handleChange({ time: total });
			});
		}

		return total;
	}

	initializeClock(time) {
		let deadline = new Date(Date.parse(new Date()) + time);

		let intervalId = setInterval(() => {
			let total = this.getTimeRemaining(deadline);

			if (total <= 0) {
				clearInterval(intervalId);
			}
		}, 1000);
	}

	render() {
		const { minute, second } = this.state;

		return (
			<div className="count-down">
				{minute} : {second}
			</div>
		);
	}
};

export default CountDown;