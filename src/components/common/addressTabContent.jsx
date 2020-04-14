import React from "react";

const ChildTabContent = props => {
	var html = [];
	var { address, city, listsSelect, onDistrictSelect } = props;

	address.map(add => {
		if (add.city._id === city._id) {
			let classes = "area-btn";
			let isActive = listsSelect.filter(ite => ite._id === add._id);
			if (isActive.length !== 0) {
				classes += " active";
			}
			var btn = (
				<button
					key={add._id}
					className={classes}
					onClick={() => onDistrictSelect(add)}
				>
					{add.district}
				</button>
			);
			html.push(btn);
		}
		return add;
	});

	return html;
};

const TabContent = props => {
	const {
		address,
		citys,
		selectedItem,
		onDistrictSelect,
		onCitySelect,
		listsSelect
	} = props;

	return (
		<div className="content-wrap">
			<div className="TabContent-wrap">
				{citys.map(city => {
					let classesC = "area-btn";
					if (city.active) classesC += " active";
					return (
						<div
							key={city._id}
							className={
								selectedItem._id === city._id
									? "tab-content tab-address active"
									: "tab-content"
							}
						>
							<div className="area-content all-contact">
								<div className="domestic-bank area-list">
									<button
										className={classesC}
										onClick={() => onCitySelect(city)}
									>
										{city.name}
									</button>
								</div>
							</div>
							<div className="area-content">
								<div className="foreign-bank area-list">
									<ChildTabContent
										address={address}
										city={city}
										listsSelect={listsSelect}
										onDistrictSelect={onDistrictSelect}
									/>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default TabContent;
