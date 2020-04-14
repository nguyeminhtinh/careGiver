
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./public/css/main.css";
import Index from "./containers/home/index";
import { Provider } from 'mobx-react';
import MainStore from "./stores/MainStore";
import PrivateRoute from "./routes";
import MyPage from './components/mypage/myPage';
import ResetPassword from './components/mypage/resetPassword';
import Login from './containers/login/login';
import SignUp from './containers/signup/signup';
import SignUpSuccess from './components/signup/success';
import Privacy from './components/signup/privacy01';
import Work from './containers/work/workList';
import WorkWorking from './components/work/working';
import WorkSchedule from './components/work/schedule';
import WorkCompleted from './components/work/completed';
import FindPassword from './containers/findPassword/findPassword';
import EditNames from './components/mypage/editName';
import Service from './components/mypage/service';
import Passbook from './components/passBook/passBook';
import DetailTranfer from './components/passBook/detailTranfer';
import Pay from './components/passBook/pay/pay';
import AccountPay from './components/mypage/modify_account';
import IdClear from './components/findUser/idClear';
import MailClear from './components/findUser/mailClear';
import addAccount from './components/passBook/pay/addAccount';
import editAccount from './components/passBook/pay/editAccount';
import Welcome from './components/common/welcome';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddPin from './components/mypage/addPin';
import EditPin from './components/mypage/editPin';
import SuccessPayment from './components/passBook/pay/PaySuccess';
import FailPayment from './components/passBook/pay/payFail';
import DetailPayRoll from './components/passBook/detailPayroll';
var moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');


class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isWelcome: false
		}
	}

	componentWillMount() {
		if (sessionStorage.getItem("isWelcome") === null) {
			this.setState({
				isWelcome: true
			}, () => {
				setTimeout(() => {
					this.setState({
						isWelcome: false
					});
					sessionStorage.setItem("isWelcome", false);
				}, 1200);
			});
		}
	}

	render() {
		if (this.state.isWelcome) {
			return <Welcome />
		}

		return (
			<div>
				<ToastContainer />
				<Provider rootStore={new MainStore()} >
					<Router>
						<Switch>
							<PrivateRoute exact path="/" component={Index} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/findpassword" component={FindPassword} />
							<Route path="/idclear" component={IdClear} />
							<Route path="/mailclear" component={MailClear} />
							<Route exact path="/signup" component={SignUp} />
							<Route path="/signup/success" component={SignUpSuccess} />
							<Route path="/signup/privacy" component={Privacy} />
							<PrivateRoute exact path="/work" component={Work} />
							<PrivateRoute path="/work/working/:id" component={WorkWorking} />
							<PrivateRoute path="/work/schedule/:id" component={WorkSchedule} />
							<PrivateRoute path="/work/completed/:id" component={WorkCompleted} />
							<PrivateRoute exact path="/mypage" component={MyPage} />
							<PrivateRoute exact path="/mypage/resetpassword" component={ResetPassword} />
							<PrivateRoute exact path="/mypage/editname" component={EditNames} />
							<PrivateRoute exact path="/mypage/addpin" component={AddPin} />
							<PrivateRoute exact path="/mypage/editpin" component={EditPin} />
							<PrivateRoute exact path="/mypage/service" component={Service} />
							<PrivateRoute exact path="/mypage/account" component={AccountPay} />
							<PrivateRoute exact path="/passbook/detail/:id/1" component={DetailTranfer} />
							<PrivateRoute exact path="/passbook/detail/:id/2" component={DetailPayRoll} />
							<PrivateRoute exact path="/passbook" component={Passbook} />
							<PrivateRoute exact path="/passbook/pay" component={Pay} />
							<PrivateRoute exact path="/passbook/pay/success" component={SuccessPayment} />
							<PrivateRoute exact path="/passbook/pay/fail" component={FailPayment} />
							<PrivateRoute exact path="/passbook/pay/add" component={addAccount} />
							<PrivateRoute path="/passbook/pay/edit/:id" component={editAccount} />
						</Switch>
					</Router>
				</Provider>
			</div>

		);
	}
}

export default App;
