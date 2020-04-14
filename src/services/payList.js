import httpService from "./httpService";
const apiEndpoint = process.env.REACT_APP_API_URL;

export function getPayrollList(userId, dataSort) {
	let params = {sort: dataSort.order_by, type: dataSort.type, start_date: dataSort.start_date, end_date: dataSort.end_date };
	return httpService.get(apiEndpoint + '/history/' + userId + '/payroll', { params: params })
		.then((response) => {
			return response.data;
		});
}

export function getTransactionListDetail(id) {
	return httpService.get(apiEndpoint + '/history/' + id + '/detail')
		.then((response) => {
			return response.data;
		});
}

export function getPayrollListDetail(id) {
	return httpService.get(apiEndpoint + '/history/payroll/' + id + '/detail')
		.then((response) => {
			return response.data;
		});
}

export default {getPayrollList, getTransactionListDetail, getPayrollListDetail};