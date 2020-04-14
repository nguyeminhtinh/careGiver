import React from 'react';
const Text = (props) => {
	return (
		<div className="input-wrap">
			<label className="input-title">
				{props.label}
			</label>
			<span className="necessary">[필수]</span>
			<div className="basic-input">
				<input
					type="text"
					placeholder={props.placeholder}
					defaultValue={props.value}
					disabled
				/>
			</div>
		</div>
	);
};

export default Text;