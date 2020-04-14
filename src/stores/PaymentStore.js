import paymentService from "../services/paymentService";
import { observable } from "mobx";
import { persist } from 'mobx-persist';

class PaymentStore {
    @persist('object') @observable payment = {};
    
    constructor(rootStore) {
		this.rootStore = rootStore;
    }
    
    async 
    tranfer(payment) {
        return paymentService.tranferBank(payment)
            .then(response => {
                if(response) {
                    return response;
                } 
            })
    }

    async 
    checkBankNumber(payment) {
        return paymentService.checkNumberBank(payment)
            .then(response => {
                if(response) {
                    return response;
                } 
            })
    }

    async 
    getBanks() {
        return paymentService.getBankList()
        .then(response => {
            if(response) {
                return response.data;
            } 
        })
	}
	
	async 
    createCardStore(idUser, dataCard) {
        return paymentService.createCard(idUser, dataCard)
		.then(response => {
			if(response) {
				return response;
			} 
		});
	}
	
	async 
    updateCardStore(idUser, dataCard) {
        return paymentService.updateCard(idUser, dataCard)
		.then(response => {
			if(response) {
				return response;
			} 
		});
    }

	async 
    getListCardStore(idUser) {
        return paymentService.getListCard(idUser)
		.then(response => {
			if(response) {
				return response;
			} 
		});
	}
	
	async 
	detailCardStore(idUser) {
        return paymentService.detailCard(idUser)
		.then(response => {
			if(response) {
				return response;
			} 
		});
	}
}

export default PaymentStore;