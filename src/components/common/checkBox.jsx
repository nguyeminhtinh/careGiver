import React from "react";

const InputCheckbox = ({ name, id, onCheck, checked, className }) => {
	return (
		<input
			type="checkbox"
			name={name}
			className={className}
			id={id}
			checked={checked}
			onChange={onCheck}
		/>
	);
};

export default InputCheckbox;
