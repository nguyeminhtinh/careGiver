import React from 'react';

const Gender = (props) => {
	return (
		<div className="input-wrap">
			<label className="input-title">
				환자 이름 / 성별
					</label>
			<span className="necessary">[필수]</span>
			<div className="basic-input gender-input">
				<input type="text" defaultValue={props.name} disabled />
				<button className={`btn-gender ${props.gender === 1 ? 'active' : ''}`}>남자</button>
				<button className={`btn-gender ${props.gender !== 1 ? 'active' : ''}`}>여자</button>
			</div>
		</div>
	);
};

export default Gender;