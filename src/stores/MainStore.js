
import SessionStore from "./SessionStore";
import UserStore from "./UserStore";
import HospitalStore from "./HospitalStore";
import HistoryStore from "./HistoryStore";
import PaymentStore from "./PaymentStore";
import PayListStore from "./PayListStore";
import { create } from 'mobx-persist';

const hydrate = create({
	jsonify: true
})

class MainStore {
	sessionStore = new SessionStore(this);
	userStore = new UserStore(this);
	hospitalStore = new HospitalStore(this);
	historyStore = new HistoryStore(this);
	paymentStore = new PaymentStore();
	payListStore = new PayListStore(this);

	constructor() {
		hydrate('user', this.userStore);
		hydrate('hospital', this.hospitalStore);
		hydrate('payment', this.paymentStore);
	}
}

export default MainStore;