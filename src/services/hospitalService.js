import httpService from "./httpService";

const apiEndpoint = process.env.REACT_APP_API_URL;
export function findHospitals(keyword) {
	return httpService.get(apiEndpoint + '/find-hospital?keyword=' + keyword)
		.then(response => {
			return response.data.data.hospitals;
		});
}

export function findPatient(id, name, address) {
	let params = { name: name, address: address };

	return httpService.get(apiEndpoint + '/' + id + '/find-patient?keyword=' + JSON.stringify(params))
		.then(response => {
			return response;
		});
}

export function detailPatient(id) {

	return httpService.get(apiEndpoint + '/patients/' + id + '/detail')
		.then(response => {
			return response;
		});

}

export function getRegisPatient(user_id, job_id) {
	return httpService.post(apiEndpoint + '/users/' + user_id + '/regist-patient', { job_id })
		.then((response) => {
			return response.data;
		});
}

export default { findHospitals, findPatient, detailPatient, getRegisPatient };