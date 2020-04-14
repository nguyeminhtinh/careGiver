import httpService from "./httpService";

const apiEndpoint = process.env.REACT_APP_API_URL;

export function getListCaregiverProgress(user_id) {
	return httpService.get(apiEndpoint + '/histories/' + user_id + '/progress')
		.then(response => {
			return response;
		});
}

export function caregiverStartById(id) {
	return httpService.put(apiEndpoint + '/histories/' + id + '/start')
		.then(response => {
			return response;
		});
}

export function caregiverCancelById(id) {
	return httpService.put(apiEndpoint + '/histories/' + id + '/cancel')
		.then(response => {
			return response;
		});
}

export function getCaregiverProgressById(id) {
	return httpService.get(apiEndpoint + '/histories/progress/' + id)
		.then(response => {
			return response;
		});
}

export function getListCaregiverIntended(user_id, page, limit) {
	return httpService.get(apiEndpoint + '/histories/' + user_id + '/intended?limit=' + limit + '&page=' + page)
		.then(response => {
			return response;
		});
}

export function getCaregiverIntendedById(id) {
	return httpService.get(apiEndpoint + '/histories/intended/' + id)
		.then(response => {
			return response;
		});
}

export function getListCaregiverCompleted(user_id, page, limit) {
	return httpService.get(apiEndpoint + '/histories/' + user_id + '/completed?limit=' + limit + '&page=' + page)
		.then(response => {
			return response;
		});
}

export function getCaregiverCompletedById(id) {
	return httpService.get(apiEndpoint + '/histories/completed/' + id)
		.then(response => {
			return response;
		});
}

export function getStatusJob(id) {
	return httpService.get(apiEndpoint + '/histories/check_status/' + id)
		.then(response => {
			return response;
		});
}

export default {
	getListCaregiverProgress,
	getListCaregiverIntended,
	getListCaregiverCompleted,
	getCaregiverProgressById,
	getCaregiverIntendedById,
	getCaregiverCompletedById,
	caregiverStartById,
	caregiverCancelById,
	getStatusJob
};