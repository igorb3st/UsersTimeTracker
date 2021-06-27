import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Users from "./Users";
import UserDetail from "./UserDetail";

const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={ (props) => <Users props={ props } /> } />
				<Route path="/:id" component={ () => <UserDetail /> } />
			</Switch>
		</Router>
	);
};

export default App;
