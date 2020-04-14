
import userService from "../services/userService";
import { LOCALSTORAGE_ACCESS_TOKEN, EXPIRES_AT } from "../commons/constants";
import httpService from "../services/httpService";
import { observable, action, computed } from "mobx";
import { persist } from 'mobx-persist';
import { toJS } from 'mobx';

class UserStore {
	@persist('object') @observable user = {};
	@persist('list') @observable listUser = [];

	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	async
	login(email, password, remeberMe) {
		return userService.login(email, password).then(async (data) => {
			let response = data.data.data;
			if (response && response.access_token) {
				this.setUser(response.user);
				if (response.user.role === "caregiver") {
					if (remeberMe) {
						localStorage.setItem(LOCALSTORAGE_ACCESS_TOKEN, response.access_token);
					} else {
						localStorage.removeItem(LOCALSTORAGE_ACCESS_TOKEN);
					}

					localStorage.setItem(EXPIRES_AT, response.expires_at);
					httpService.setAccessToken(response.access_token);
				}
				return data;
			} else {
				console.log('error Login');
				return data;
			}
		})
	}

	async autoLogin() {
		const token = await localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN);
		if (token) {
			return;
		} else {

		}
	}

	async logOut() {
		const token = await httpService.getAccessToken();
		localStorage.removeItem(LOCALSTORAGE_ACCESS_TOKEN);
		if (token) {
			return userService.logOut().then((data) => {
				httpService.clearAuthorization();
				localStorage.removeItem(LOCALSTORAGE_ACCESS_TOKEN);
				return data.data;
			});
		} else {
			console.log('ERROP');
		}
	}

	async addListAutoComplete(username) {
		let result = toJS(this.listUser);

		let index = result.indexOf(username.toLowerCase());
		if (index === -1) {
			result.push(username.toLowerCase());
		}

		this.setListUser(result);
	}

	@action
	setListUser(data) {
		this.listUser = data;
	}

	@action
	setUser(user) {
		this.user = user;
	}

	@computed
	get getUserInfo() {
		return this.user;
	}

	async
	getUser() {
		return userService.getUser()
	}

	async viewUser(idUser) {
		return userService.viewUser(idUser)
			.then(data => {
				return data;
			});
	}

	async updateUser(idUser, dataUpdate) {
		return userService.updateUser(idUser, dataUpdate)
			.then(data => {
				this.setUser(data.data);
				return data;
			});
	}

	async resetPassword(idUser, data) {
		return userService.resetPassword(idUser, data)
			.then(data => {
				return data;
			});
	}

	async findId(phone, code) {
		return userService.findId(phone, code)
			.then(data => {
				return data;
			})
	}

	async findPassword(username, phone, code) {
		return userService.findPassword(username, phone, code)
			.then(data => {
				return data;
			})
	}
}

export default UserStore;
