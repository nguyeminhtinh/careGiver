import axios from 'axios';
import { toast } from "react-toastify";
import { LOCALSTORAGE_ACCESS_TOKEN } from "../commons/constants";
class HttpService {
	client = null;
	constructor(options) {
		this.client = axios.create({
			headers: { 'Content-Type': 'application/json' },
			...options
		});

		this.client.interceptors.request.use(
			(request) => {
				return request;
			},
			(error) => {
				return error;
			}
		);

		this.client.interceptors.response.use(
			(response) => {
				return response;
			},
			(error) => {
				return error;
			}
		);
	}

	handleResponse(promise) {
		return Promise.resolve(promise)
			.then(response => {
				if (response.status !== 200) {
					toast.error("이메일 또는 비밀번호를 다시 확인해주세요.");
				}
				return response;
			})
			.catch(error => {
				if (!error.response) {
					// toast.error("네트워크 연결이 끊어져 있습니다. 네트워크 확인 후 다시 시도 해주시기 바랍니다.");
					return Promise.reject(error)
				}
				
				if (error.response && error.response.status === 401) {
					this.clearAuthorization();
					localStorage.removeItem(LOCALSTORAGE_ACCESS_TOKEN);
					window.location.href = '/login'

				}
				return Promise.resolve(error.response);
			})
	}

	get(path, config) {
		return this.handleResponse(this.client.get(path, config));
	}

	post(path, config) {
		return this.handleResponse(this.client.post(path, config));
	}

	put(path, config) {
		return this.handleResponse(this.client.put(path, config));
	}

	delete(path, config) {
		return this.handleResponse(this.client.delete(path, config));
	}

	setAccessToken(token) {
		return (this.client = axios.create({
			headers: { 'Authorization': `Bearer ${token}` }
		}));
	}

	getAccessToken() {
		let token = localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN);
		return token;
	}

	clearAuthorization() {
		const { Authorization, ...rest } = this.client.defaults.headers;
		this.client.defaults.headers = rest;
	}
}

const httpService = new HttpService();
export default httpService;
