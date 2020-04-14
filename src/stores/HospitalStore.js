import hospitalService from "../services/hospitalService";
import { observable, action, computed } from "mobx";
import { persist } from 'mobx-persist';
import { toJS } from 'mobx';

class HospitalStore {
	@persist('list') @observable hospitals = [];
	@persist('list') @observable hospitalsResult = [];
	@persist('list') @observable addressResult = [];
	@observable patient;

	constructor(rootStore) {
		this.rootStore = rootStore;
		this.patient = [];
	}

	async searchHospital(keyword) {
		if (keyword.trim().length !== 0) {
			return hospitalService.findHospitals(keyword)
				.then(response => {
					this.setHospitals(response);
					return response;
				});
		} else {
			this.setHospitals([]);
			return [];
		}
	}

	async addHospitalResult(data) {
		let hospitalsResult = this.hospitalsResult;
		let dataSearch = toJS(hospitalsResult).filter(item=> item.id === data.id);
		if(dataSearch.length===0){
			hospitalsResult.push(data);
			this.hospitalsResult = hospitalsResult;
		}
	}

	async removeHospitalResult(id, user_id) {
		let hospitalsResult = toJS(this.hospitalsResult);
		hospitalsResult = hospitalsResult.filter(item => item.user_id === user_id && item.id !== id);
		this.hospitalsResult = hospitalsResult;
	}

	async addAddressResult(data, user_id) {
		let result = toJS(this.addressResult);
		result = result.filter(item => item.user_id !== user_id);
		data.map(item => {
			result.push(item);
			return item;
		})
		this.setAddress(result);
	}

	async removeAddressResult(data, user_id) {
		let addressResult = toJS(this.addressResult);

		if (data._id !== "city") {
			let dataResult = addressResult;
			addressResult.map((item, index) => {
				if (item._id.localeCompare(data._id) === 0 && item.user_id === user_id) {
					dataResult.splice(index, 1);
				}
				return item;
			})
			this.setAddress(dataResult);
		} else {
			let dataResult = addressResult;
			addressResult.map((item, index) => {
				if (item.city._id.localeCompare(data.city._id) === 0 && item.user_id === user_id) {
					dataResult.splice(index, 1);
				}
				return item;
			})
			this.setAddress(dataResult);
		}
	}

	@action
	setAddress(data) {
		this.addressResult = data;
	}

	@action
	setHospitals(data) {
		this.hospitals = data;
	}

	@computed
	get getHospital() {
		return this.hospital;
	}

	async searchPatient(id, name, address) {
		return hospitalService.findPatient(id, name, address)
			.then(response => {
				return response;
			});
	}

	async getPatientById(id) {
		return hospitalService.detailPatient(id)
			.then(response => {
				return response;
			});
	}

	async getRegisPatient(user_id, job_id) {
		return hospitalService.getRegisPatient(user_id, job_id)
			.then(response => {
				return response;
			});
	}
}

export default HospitalStore;