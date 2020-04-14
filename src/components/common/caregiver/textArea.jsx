import React from 'react';

const TextArea = (props) => {
	return (
		<div className="input-wrap">
			<label className="input-title">
				{props.label}
			</label>
			{
				props.isRequied ?
					<span className="necessary">[필수]</span> : null
			}
			<div className="basic-input">
				<textarea
					placeholder={props.placeholder}
					disabled
					value={props.value || ""}
				/>
			</div>
		</div>
	);
};

export default TextArea;