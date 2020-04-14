import React from 'react'
import { inject } from "mobx-react";
import { Route, Redirect } from 'react-router-dom';


const PrivateRoutesTemp = ({ component: Component, rootStore, ...rest }) => (
	<Route {...rest}
		render={props => (
			rootStore.sessionStore.isAuthenticated ? (
				<Component {...props} />
			) : (
					<Redirect to={{
						pathname: '/login',
						state: { from: props.location }
					}} />
				)
		)} />
)

const PrivateRoute = inject("rootStore")(PrivateRoutesTemp)
export default PrivateRoute;
