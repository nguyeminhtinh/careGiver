import httpService from "./httpService";
httpService.setAccessToken(httpService.getAccessToken());
const apiEndpoint = 'http://careu.daeriya.com/api';
const apiUrl = process.env.REACT_APP_API_URL;


export function tranferBank(payment) {
	return httpService.post(apiEndpoint + '/bank/send',
        payment)
		.then((response) => {
			return response.data;
		});
}


export function checkNumberBank(payment) {
	return httpService.post(apiEndpoint + '/bank/check',
        payment)
		.then((response) => {
			return response.data;
		});
}

export function getBankList() {
	return httpService.get(apiEndpoint + '/bank/list')
		.then((response) => {
			if (response) {
				return response.data;
			}
		});
}

export function createCard(idUser, dataCard) {
	return httpService.post(apiUrl + '/my-page/'+idUser+'/cards/create', dataCard)
	.then((response) => {
		if (response) {
			return response.data;
		}
	});
}

export function updateCard(idUser, dataCard) {
	return httpService.put(apiUrl + '/my-page/cards/'+idUser+'/update', dataCard)
	.then((response) => {
		if (response) {
			return response.data;
		}
	});
}

export function getListCard(idUser) {
	return httpService.get(apiUrl + '/my-page/'+idUser+'/cards/list')
	.then((response) => {
		if (response) {
			return response.data;
		}
	});
}

export function detailCard(idUser) {
	return httpService.get(apiUrl + '/my-page/cards/'+idUser+'/detail')
	.then((response) => {
		if (response) {
			return response.data;
		}
	});
}

export default { tranferBank, checkNumberBank, getBankList, createCard , getListCard, detailCard, updateCard };