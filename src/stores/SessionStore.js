import { observable, action } from "mobx";

class SessionStore {

	@observable isAuthenticated;
	@observable redirectToReferrer;

	constructor(rootStore) {
		this.rootStore = rootStore;
		this.isAuthenticated = false;
		this.redirectToReferrer = false;
	}

	@action
	set_isAuthenticated(value) {
		this.isAuthenticated = value;
	}

	@action
	set_redirectToReferrer(value) {
		this.redirectToReferrer = value;
	}

	async
	signout() {
		this.isAuthenticated = false;
		this.redirectToReferrer = false;
	}

	async
	authenticate() {
		this.isAuthenticated = true;
		this.redirectToReferrer = true;
	}
}

export default SessionStore;