import React from 'react';
import { Link } from 'react-router-dom';

const page1 = "회원가입";

const Condition = (props) => {
	return (
		<div className="wrapper">
			<header>
				<div className="header-wrap">
					<div className="ico-back">
						<Link to="#" onClick={() => props.handleChange({ page: page1 })}>
							<div className="ico-back" />
						</Link>
					</div>
					<div className="SubPage-title">
						<h2>CAREYOU 보호자</h2>
					</div>
				</div>
			</header>
			<div className="content-body">
				<div className="main-Container">
					<div className="content-wrap content-privacy">
						<div className="agree-head">
							<div className="checkbox-wrap">
								<input
									type="checkbox"
									id="privacy"
									name="privacy"
									checked={props.idChecked4}
									onChange={(e) => props.handleChangeCheck({ idChecked4: e.target.checked })}
								/>
								<label htmlFor="privacy"><span className="checkbox-custom" /><span className="checkbox-label">CAREYOU 이용약관</span> <span className="necessary">[필수]</span></label>

							</div>
						</div>
						<div className="Accept-content">
							<p>甲 : 주식회사 에이치엠씨네트웍스</p>
							<p>乙 : </p>
							<p>甲과 乙은 다음과 같이 간병인 계약을 체결한다.</p>
							<p>다  음</p>
							<p>第1條(목적) 본 계약은 甲 운영의 CARE YOU(모바일 어플리케이션)에 乙이 간병인으로 등록하여 甲의 관리 하에 구직활동을 하기 위하여 체결하는 계약서이다.</p>
							<p>第2條(약관) 본 계약에서 규정하지 아니하는 사항은 ‘CARE YOU 이용약관(간병인)’(이하 ‘약관’)을 따른다.</p>
							<p>第3條(회원가입의 강제) 본 계약은 CARE YOU에 회원으로 가입하는 것을 필요 요건으로 하므로, 乙은 이 계약과 CARE YOU 회원가입에 모두 동의하여야만 CARE YOU에서 구직활동이 가능하다.</p>
							<p>第4條(간병비의 지급) 甲은 약관에 따라 乙이 CARE YOU에서 보호자 및 환자와 계약한 내용에 따라 보호자 및 환자에게 받은 간병비용을 乙에게 지급한다. </p>
							<p>第5條(乙의 의무 및 책임) ① 乙은 甲에게 약관에 따라 제공하여야 할 정보를 허위사실의 기재 없이 제공하여야 한다.</p>
							<p>② 乙은 CARE YOU를 이용하기 위하여 간병인배상책임보험에 반드시 가입하여야 한다.</p>
							<p>③ 乙은 본 계약서 및 약관에 동의하여 CARE YOU에 ‘프리랜서 간병인’으로 등록되어 개인사업자로 보므로, 소득신고 및 세금신고는 甲이 대행하지만 이외 종합소득세 신고 등을 포함한 기타 세금업무 등의 문제는 甲에게 위탁함이 없이 스스로 해결하여야 하며 위 세금업무 등에 문제가 발생할 시 甲은 책임을 지지 아니한다.</p>
							<p>④ 乙은 甲에게 잘못된 사항을 고지하는 등 乙의 귀책사유로 인하여 불리한 결정‧판결‧처분 등을 받게 되거나 법적인 분쟁이 발생할 경우 甲에게 책임을 묻지 아니한다.</p>
							<p>⑤ 乙이 CARE YOU를 통하여 보호자회원과 간병계약을 체결한 이후의 일에 관하여 간병비의 지급을 제외한 나머지는 甲이 책임지지 아니한다.</p>
							<p>第6條(손해배상책임) ① 乙이 CARE YOU를 통상의 방법이 아닌 부정한 방법으로 이용할 경우 甲은 乙에게 민사상 발생한 손해의 배상을 청구할 수 있음은 물론 고발 등 형사조치를 취할 수 있다.</p>
							<p>② 乙로 인하여 甲에게 행정상의 조치가 내려진 경우, 甲은 乙에게 손해의 배상을 구할 수 있다.</p>
							<p>第7條(비밀유지의무) 乙은 CARE YOU를 통하여 보호자와 계약한 뒤 업무 중 지득한 甲 또는 보호자 및 환자의 비밀을 대상자의 동의 또는 법률의 특별한 규정에 의한 것이 아니면 임의로 타인에게 누설 또는 공개하여서는 아니 된다.</p>
							<p>第8條(관할) 본 계약에 관하여 당사자 사이에 분쟁이 발생하여 우호적으로 해결되지 아니하는 경우, 분쟁에 관한 관할법원은 서울중앙지방법원으로 한다. </p>
							<p>2019.  .  .</p>
							<p>갑   주식회사 에이치엠씨네트웍스(212-86-05451)</p>
							<p>대표자 김견원</p>
							<p>충남 천안시 동남구 삼룡1길 50(삼룡동)</p>
							<p>을</p>
						</div>
					</div>
				</div>
				<div className="BottomBtn-wrap fixed bottom-30">
					<button
						className="btn-bottom"
						onClick={() => props.handleChange({ page: page1 })}
					>
						다음
						</button>
				</div>
			</div>
		</div>
	);
}

export default Condition;