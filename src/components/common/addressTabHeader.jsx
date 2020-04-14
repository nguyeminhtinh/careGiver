import React from "react";

const TabHeader = props => {
	const { items, selectedItem, onItemSelect } = props;

	return (
		<div className="SubContent-tab" id="tabs">
			<ul>
				{items.map(item => (
					<li
						key={item._id}
						className={selectedItem._id === item._id ? "active" : ""}
						onClick={() => onItemSelect(item)}
					>
						{item.tabName}
					</li>
				))}
			</ul>
		</div>
	);
};

export default TabHeader;
