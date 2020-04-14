import React from 'react';

const RadioGroup = (props) => {
	const { ability_cognitive, ability_suction, ability_change_posture, ability_move, ability_eat, ability_toilet } = props
	return (
		<div className="input-wrap">
			<label className="input-title">
				{props.label}
			</label>
			<span className="necessary">[필수]</span>
			<div className="SymptomCheck-list">
				<div className="radio-wrap">
					<div className="input-wrap">
						<label className="input-title">치매/섬망</label>
					</div>
					<div className="radio">
						<input type="radio" id="q12" name="q6" checked={ability_cognitive === 1 ? true : false} readOnly />
						<label htmlFor="q12"><span className="checkbox-custom" /><span className="checkbox-label">있음</span></label>
					</div>
					<div className="radio">
						<input type="radio" id="q13" name="q6" checked={ability_cognitive === 2 ? true : false} readOnly />
						<label htmlFor="q13"><span className="checkbox-custom" /><span className="checkbox-label">없음</span></label>
					</div>
				</div>
				<div className="radio-wrap">
					<div className="input-wrap">
						<label className="input-title">
							석션
                    						</label>
					</div>
					<div className="radio">
						<input type="radio" id="q6" name="q3" checked={ability_suction === 1 ? true : false} readOnly />
						<label htmlFor="q6"><span className="checkbox-custom" /><span className="checkbox-label">있음</span></label>
					</div>
					<div className="radio">
						<input type="radio" id="q7" name="q3" checked={ability_suction === 2 ? true : false} readOnly />
						<label htmlFor="q7"><span className="checkbox-custom" /><span className="checkbox-label">없음</span></label>
					</div>
				</div>
				<div className="radio-wrap">
					<div className="input-wrap">
						<label className="input-title">
							체위변경
                    						</label>
					</div>
					<div className="radio">
						<input type="radio" id="q1" name="ability_move" value="1" checked={ability_change_posture === 1 ? true : false} readOnly />
						<label htmlFor="q1"><span className="checkbox-custom" /><span className="checkbox-label">있음</span></label>
					</div>
					<div className="radio">
						<input type="radio" id="q2" name="ability_move" value="2" checked={ability_change_posture === 2 ? true : false} readOnly />
						<label htmlFor="q2"><span className="checkbox-custom" /><span className="checkbox-label">없음</span></label>
					</div>
				</div>
				<div className="radio-wrap">
					<div className="input-wrap">
						<label className="input-title">
							거동
                    						</label>
					</div>
					<div className="radio">
						<input type="radio" id="q8" name="q4" checked={ability_move === 1 ? true : false} readOnly />
						<label htmlFor="q8"><span className="checkbox-custom" /><span className="checkbox-label">스스로가능</span></label>
					</div>
					<div className="radio">
						<input type="radio" id="q9" name="q4" checked={ability_move === 2 ? true : false} readOnly />
						<label htmlFor="q9"><span className="checkbox-custom" /><span className="checkbox-label">부축필요</span></label>
					</div>
					<div className="radio">
						<input type="radio" id="q91" name="q4" checked={ability_move === 3 ? true : false} readOnly />
						<label htmlFor="q9"><span className="checkbox-custom" /><span className="checkbox-label">불가능</span></label>
					</div>
				</div>
				<div className="radio-wrap">
					<div className="input-wrap">
						<label className="input-title">
							식사
                    						</label>
					</div>
					<div className="radio">
						<input type="radio" id="q3" name="q2" checked={ability_eat === 1 ? true : false} readOnly />
						<label htmlFor="q3"><span className="checkbox-custom" /><span className="checkbox-label">스스로 가능</span></label>
					</div>
					<div className="radio">
						<input type="radio" id="q4" name="q2" checked={ability_eat === 2 ? true : false} readOnly />
						<label htmlFor="q4"><span className="checkbox-custom" /><span className="checkbox-label">도움필요</span></label>
					</div>
					<div className="radio">
						<input type="radio" id="q5" name="q2" checked={ability_eat === 3 ? true : false} readOnly />
						<label htmlFor="q5"><span className="checkbox-custom" /><span className="checkbox-label">피딩</span></label>
					</div>
				</div>
				<div className="radio-wrap">
					<div className="input-wrap">
						<label className="input-title">
							배뇨/배변
                    						</label>
					</div>
					<div className="radio">
						<input type="radio" id="q10" name="q5" checked={ability_toilet === 1 ? true : false} readOnly />
						<label htmlFor="q10"><span className="checkbox-custom" /><span className="checkbox-label">스스로 가능</span></label>
					</div>
					<div className="radio">
						<input type="radio" id="q11" name="q5" checked={ability_toilet === 2 ? true : false} readOnly />
						<label htmlFor="q11"><span className="checkbox-custom" /><span className="checkbox-label">부축필요</span></label>
					</div>
					<div className="radio">
						<input type="radio" id="q111" name="q5" checked={ability_toilet === 3 ? true : false} readOnly />
						<label htmlFor="q111"><span className="checkbox-custom" /><span className="checkbox-label">기저귀</span></label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RadioGroup;