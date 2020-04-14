import React, { Component } from 'react';
import pop_close from '../../public/images/pop_close.png';

class Popup extends Component {

	render() {
		const { classPopup, classActive, isClose } = this.props;

		return (
			<div className={classPopup + ' ' + classActive} >
				<div className="pop-body">
					{
						isClose &&
						<div className="pop-close">
							<img src={pop_close} alt="" onClick={this.props.handleClose} />
						</div>
					}
					{this.props.children}
				</div>
			</div>
		);
	}
};

export default Popup;