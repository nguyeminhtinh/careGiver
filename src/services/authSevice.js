import httpService from "./httpService";
const apiEndpoint = process.env.REACT_APP_API_URL;
const apiEndpointCode = process.env.REACT_APP_IMG_URL;

export function signUpCareGiver(data) {
	return httpService.post(apiEndpoint + '/signup', data)
		.then((response) => {
			return response.data;
		});
}

export function sendSmsCode(phone) {
	let phoneNumber = phone.replace(/-/g, "");

	return httpService.get(apiEndpointCode + '/api/sms/code/' + phoneNumber)
		.then((response) => {
			return response.data;
		});
}

export function checkSmsCode(phone, smsCode) {
	let phoneNumber = phone.replace(/-/g, "");

	return httpService.get(apiEndpointCode + `/api/sms/auth/${phoneNumber}/${smsCode}`)
		.then((response) => {
			return response;
		});
}

export function checkEmailSignUp(username) {
	return httpService.get(apiEndpoint + '/check-username-exists?username=' + username)
		.then((response) => {
			return response.data;
		});
}

export function checkPhoneNumber(phone) {
	return httpService.get(apiEndpoint + '/check-phone-exists?phone=' + phone)
		.then((response) => {
			return response.data;
		});
}

export function addPinNumber(idUser, pinNumber) {
	var pin = {
		'pin': pinNumber
	}
	return httpService.put(apiEndpoint + '/my-page/'+ idUser +'/change-pin', pin)
		.then((response) => {
			return response;
		});
}

export function CheckPinNumber(idUser, pinNumber) {
	return httpService.get(apiEndpoint + '/my-page/'+ idUser +'/check-pin?pin='+ pinNumber)
	.then((response) => {
		return response;
	});
}