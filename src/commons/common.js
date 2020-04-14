const listAddress = [
	{
		_id: "5b21ca3eeb7f6fbccd471801",
		city: { _id: "5b21ca3eeb7f6fbccd47181a", name: "서울" },
		district: "강남구",
		active: false
	},
	{
		_id: "5b21ca3eeb7f6fbccd471802",
		city: { _id: "5b21ca3eeb7f6fbccd47181a", name: "서울" },
		district: "강동구"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471803",
		city: { _id: "5b21ca3eeb7f6fbccd47181a", name: "서울" },
		district: "강북구"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471804",
		city: { _id: "5b21ca3eeb7f6fbccd47181a", name: "서울" },
		district: "강서구"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471805",
		city: { _id: "5b21ca3eeb7f6fbccd47181a", name: "서울" },
		district: "관악구"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471806",
		city: { _id: "5b21ca3eeb7f6fbccd47181a", name: "서울" },
		district: "광진구"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471807",
		city: { _id: "5b21ca3eeb7f6fbccd47181a", name: "서울" },
		district: "구로구"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471808",
		city: { _id: "5b21ca3eeb7f6fbccd47181a", name: "서울" },
		district: "금천구"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471809",
		city: { _id: "5b21ca3eeb7f6fbccd47181a", name: "서울" },
		district: "노원구"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471810",
		city: { _id: "5b21ca3eeb7f6fbccd47181a", name: "서울" },
		district: "도봉구"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471811",
		city: { _id: "5b21ca3eeb7f6fbccd47181a", name: "서울" },
		district: "동대문구"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471812",
		city: { _id: "5b21ca3eeb7f6fbccd47181a", name: "서울" },
		district: "동작구"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471813",
		city: { _id: "5b21ca3eeb7f6fbccd47181a", name: "서울" },
		district: "마포구"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471814",
		city: { _id: "5b21ca3eeb7f6fbccd47181a", name: "서울" },
		district: "서대문구"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471815",
		city: { _id: "5b21ca3eeb7f6fbccd47181a", name: "서울" },
		district: "서초구"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471816",
		city: { _id: "5b21ca3eeb7f6fbccd47181a", name: "서울" },
		district: "성동구"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471817",
		city: { _id: "5b21ca3eeb7f6fbccd47181a", name: "서울" },
		district: "성북구"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471818",
		city: { _id: "5b21ca3eeb7f6fbccd47181a", name: "서울" },
		district: "송파구"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471819",
		city: { _id: "5b21ca3eeb7f6fbccd47181a", name: "서울" },
		district: "양천구"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471820",
		city: { _id: "5b21ca3eeb7f6fbccd47181a", name: "서울" },
		district: "영등포구"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471821",
		city: { _id: "5b21ca3eeb7f6fbccd47181a", name: "서울" },
		district: "용산구"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471822",
		city: { _id: "5b21ca3eeb7f6fbccd47181a", name: "서울" },
		district: "은평구"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471823",
		city: { _id: "5b21ca3eeb7f6fbccd47181a", name: "서울" },
		district: "종로구"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471824",
		city: { _id: "5b21ca3eeb7f6fbccd47181a", name: "서울" },
		district: "중구"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471825",
		city: { _id: "5b21ca3eeb7f6fbccd47181a", name: "서울" },
		district: "중랑구"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471826",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "가평군"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471827",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "고양시"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471828",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "과천시"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471829",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "광명시"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471830",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "광주시"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471831",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "구리시"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471832",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "군포시"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471833",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "김포시"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471834",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "남양주시"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471835",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "동두천시"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471836",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "부천시"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471837",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "성남시"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471838",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "수원시"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471839",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "시흥시"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471840",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "안산시"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471841",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "안성시"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471842",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "안양시"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471843",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "양주시"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471844",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "양평군"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471845",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "여주시"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471846",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "연천군"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471847",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "오산시"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471848",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "용인시"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471849",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "의왕시"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471850",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "의정부시"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471851",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "이천시"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471852",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "파주시"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471853",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "평택시"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471854",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "포천시"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471855",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "하남시"
	},
	{
		_id: "5b21ca3eeb7f6fbccd471856",
		city: { _id: "5b21ca3eeb7f6fbccd47181b", name: "경기" },
		district: "화성시"
	},
];

export const citys = [
	{ _id: "5b21ca3eeb7f6fbccd47181a", name: "서울전체", subName: "서울", tabName: "서울특별시", active: false },
	{ _id: "5b21ca3eeb7f6fbccd47181b", name: "경기전체", subName: "경기", tabName: "경기도" },
];

export function getCitys() {
	return citys.filter(c => c);
}

export function getListAddress() {
	return listAddress;
}

export function isEmail(email) {
	var re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/;
	return re.test(String(email).toLowerCase());
}
export function isNumberKey(e) {
	var charCode = (e.which) ? e.which : e.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		e.preventDefault();
		return false;
	}
	return true;
}

export function checkEnglishNumber(str) {
	var name = /^[A-Za-z0-9]*$/;
	if (!name.test(str)) {
		return false;
	} else {
		return true;
	}
}

export function checkSpace(str) {
	var k = str ? str.which : window.event.keyCode;
	if (k === 32) {
		str.preventDefault();
		return false;
	}
	return true;
}

export function checkPassword(str) {
	let reg = /[a-zA-Z]/;
	for (var i = 0; i < str.length; i++) {
		if (reg.test(str.charAt(i))) {
			return true;
		}
	}
	return false;
}

export function checkLengthPassword(str) {
	if (str.trim().length <= 20) {
		if (str.trim().length >= 4) {
			return true;
		}
	}

	return false;
}

export function isCharacterValid(str) {
	let reg = /^[a-zA-Z0-9!@#$%^&*()]+$/i;
	let regHangul = RegExp("[\u1100-\u11FF|\u3130-\u318F|\uA960-\uA97F|\uAC00-\uD7AF|\uD7B0-\uD7FF]");
	for (var i = 0; i < str.length; i++) {
		if (!reg.test(str.charAt(i)) && !regHangul.test(str.charAt(i))) {
			return true;
		}
	}
	return false;
}

export function specialCharacters(e) {
	var keyCode = e.which;
	if (!((keyCode >= 48 && keyCode <= 57)
		|| (keyCode >= 65 && keyCode <= 90)
		|| (keyCode >= 97 && keyCode <= 122))
		&& keyCode !== 8 && keyCode !== 32) {
		e.preventDefault();
	}
}

export function isHANGUL(str) {
	let reg = RegExp("[\u1100-\u11FF|\u3130-\u318F|\uA960-\uA97F|\uAC00-\uD7AF|\uD7B0-\uD7FF]");
	for (var i = 0; i < str.length; i++) {
		if (!reg.test(str.charAt(i))) {
			return true;
		}
	}
	return false;
}

const listTime = [
	{ id: 1, name: '1개월', value: 1 },
	{ id: 2, name: '3개월', value: 3 },
	{ id: 3, name: '6개월', value: 6 },
	{ id: 4, name: '직접입력', value: 0 },
];

export function getListTime() {
	return listTime;
}

const listTransaction = [
	{ type: 0, name: '전체' },
	{ type: 2, name: '입금만' },
	{ type: 1, name: '출금만' },
];

export function getListTransaction() {
	return listTransaction;
}

const listTransactionHistory = [
	{ id: 1, name: '최신순' },
	{ id: 2, name: '과거순' },
];

export function getListTransactionHistory() {
	return listTransactionHistory;
}

export function formatNumber(number) {
	return number.toFixed(0).replace(/./g, function (c, i, a) {
		return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
	});
}

export function formatNumberBank(number){
	var data = number.slice(0, 4) + "-" + number.slice(4, 8) + "-" + number.slice(8, 15);
	return data;
}
export function splitSpaceOrNewLine(text)  {
	return String(text).split(/[\0\s]+/g).filter(Boolean); 
}

export function checkPassNumberAndCharater(str) {
	return /[a-z].*[0-9]|[0-9].*[a-z]/.test(str);
}