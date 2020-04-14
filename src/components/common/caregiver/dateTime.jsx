import React from 'react';
import ico_select from '../../../public/images/ico_select.png';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const formatDate = 'yyyy-MM-dd';

const DateTime = (props) => {
	return (
		<div>
			<div className="input-wrap input-space">
				<label className="input-title">
					간병 기간을 선택해주세요
              					</label>
				<span className="necessary">[필수]</span>
				<div className="date-wrap">
					<div className="date-title">
						<h3>시작</h3>
					</div>
					<div className="basic-input date-iuput">
						<DatePicker
							selected={props.date_start}
							dateFormat={formatDate}
							selectsStart
							disabled={true}
							startDate={props.date_start}
							endDate={props.date_end}
							placeholderText="시작 날짜 선택"
						/>
					</div>
					<div
						className="SelectBox-wrap small"
					>
						<div className="select-head">
							{
								props.time_start !== null ? props.time_start === "" ?
									<h2>시간 선택</h2> : <h2 className="text">{props.time_start}</h2> : <h2>시간 선택</h2>
							}
							<img src={ico_select} alt="" />
						</div>
					</div>
				</div>
				<div className="date-wrap">
					<div className="date-title">
						<h3>종료</h3>
					</div>
					<div className="basic-input date-iuput">
						<DatePicker
							selected={props.date_end}
							dateFormat={formatDate}
							selectsStart
							disabled={true}
							startDate={props.date_start}
							endDate={props.date_end}
							placeholderText="종료 날짜 선택"
						/>
					</div>
					<div
						className="SelectBox-wrap small"
					>
						<div className="select-head">
							{
								props.time_end !== null ? props.time_end === "" ?
									<h2>시간 선택</h2> : <h2 className="text">{props.time_end}</h2> : <h2>시간 선택</h2>
							}
							<img src={ico_select} alt="" />
						</div>
					</div>
				</div>
				<div className="checkbox-wrap">
					<input
						type="checkbox"
						id="end"
						name="end"
						className="AcceptAllChecked"
						checked={props.date_end.length === 0 ? true : false}
						disabled
					/>
					<label className="agree-label" htmlFor="end"><span className="checkbox-custom" />
						<span className="checkbox-label">미정</span>
					</label>
				</div>
			</div>
		</div>
	);
};

export default DateTime;