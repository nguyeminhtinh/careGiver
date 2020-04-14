import { observable } from 'mobx';

class User {
	id = null;
	@observable access_token = "";
	@observable expired_At = null;
	@observable email = null;
	@observable password = null;
	@observable password_confirmation = null;
	@observable full_name = null;
	@observable phone = null;
	@observable sms_code = null;

	constructor(data) {
		this.data = data;
	}
}


export const SignUpPayLoadRequest = {
	email: null,
	password: null,
	password_confirmation: null,
	full_name: null,
	gender: null,
	age: null,
	experience: null,
	phone: null,
	sms_code: null,
	image: null
}

export default User;