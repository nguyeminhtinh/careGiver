import historyService from "../services/historyService";

class HistoryStore {

	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	async getListCaregiverProgress(user_id) {
		return historyService.getListCaregiverProgress(user_id)
			.then(response => {
				return response;
			});
	}

	async getCaregiverProgressById(id) {
		return historyService.getCaregiverProgressById(id)
			.then(response => {
				return response;
			});
	}

	async getListCaregiverIntended(user_id, page, limit) {
		return historyService.getListCaregiverIntended(user_id, page, limit)
			.then(response => {
				return response;
			});
	}

	async getCaregiverIntendedById(id) {
		return historyService.getCaregiverIntendedById(id)
			.then(response => {
				return response;
			});
	}

	async getListCaregiverCompleted(user_id, page, limit) {
		return historyService.getListCaregiverCompleted(user_id, page, limit)
			.then(response => {
				return response;
			});
	}

	async getCaregiverCompletedById(id) {
		return historyService.getCaregiverCompletedById(id)
			.then(response => {
				return response;
			});
	}

	async caregiverStartById(id) {
		return historyService.caregiverStartById(id)
			.then(response => {
				return response;
			});
	}

	async caregiverCancelById(id) {
		return historyService.caregiverCancelById(id)
			.then(response => {
				return response;
			});
	}

	async getStatusJob(id) {
		return historyService.getStatusJob(id)
			.then(response => {
				return response;
			});
	}
}

export default HistoryStore;