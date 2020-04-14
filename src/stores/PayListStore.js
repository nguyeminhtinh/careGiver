import historyService from "../services/payList";

class PayList {
    constructor (rootStore) {
        this.rootStore = rootStore;
    }

	getPayrollStore (userId, dataSort) {
        return historyService.getPayrollList(userId, dataSort)
		.then(response => {
			return response.data;
		});
	}

	getTransactionListStore (id) {
        return historyService.getTransactionListDetail(id)
		.then(response => {
			return response.data;
		});
	}

	getPayrollListStore (id) {
        return historyService.getPayrollListDetail(id)
		.then(response => {
			return response.data;
		});
	}
}

export default PayList;