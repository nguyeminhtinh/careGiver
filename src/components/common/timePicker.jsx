import React, { Component } from 'react';
import TimeKeeper from 'react-timekeeper';

class TimePicker extends Component {

	renderContent = () => {
		const { isShow, time } = this.props;

		if (isShow) {
			return (
				<div className="popup-time">
					<TimeKeeper
						time={time}
						onDoneClick={(e) => this.props.handleSubmitTime(e.formatted)}
					/>
				</div>
			);
		}

		return null;
	}

	render() {
		return this.renderContent();
	}
};

export default TimePicker;