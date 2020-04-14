import httpService from "./httpService";
const apiEndpoint = process.env.REACT_APP_API_URL;
httpService.setAccessToken(httpService.getAccessToken());

export function login(username, password) {
	return httpService.post(apiEndpoint + '/login',
		{ username, password })
		.then((response) => {
			return response;
		});
}

export function logOut() {
	return httpService.put(apiEndpoint + '/logout')
		.then((response) => {
			return response;
		});
}

export function viewUser(idUser) {
	return httpService.get(apiEndpoint + '/my-page/' + idUser)
		.then((response) => {
			return response.data;
		});
}

export function getUser() {
	return httpService.get(apiEndpoint + '/user')
		.then(response => {
			return response.data.data;
		});
}

export function resetPassword(idUser, data) {
	return httpService.put(apiEndpoint + '/my-page/' + idUser + '/change-password', data)
		.then((response) => {
			return response.data;
		});
}

export function findId(phone, code) {
	return httpService.get(apiEndpoint + '/find-id?phone=' + phone + '&sms_code=' + code)
		.then((response) => {
			return response.data;
		});
}

export function findPassword(username, phone, code) {
	const data = {
		username, phone, sms_code: code
	}

	return httpService.put(apiEndpoint + '/find-password', data)
		.then((response) => {
			return response.data;
		});
}

export function updateUser(idUser, data) {
	return httpService.put(apiEndpoint + '/my-page/' + idUser + '/update', data)
		.then((response) => {
			return response.data;
		});
}

export default { login, logOut, viewUser, getUser, findId, findPassword, updateUser, resetPassword };
