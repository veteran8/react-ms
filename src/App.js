import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { adminRoutes } from "./routes";
import { Frame } from "./components";
import { connect } from "react-redux";

const menus = adminRoutes.filter(route => {
  return route.isNav === true;
});
class App extends Component {
  render() {
    console.log(this.props.isLogin, 777);
    return this.props.isLogin ? (
      <Frame menus={menus}>
        <Switch>
          {adminRoutes.map(route => {
            return (
              <Route
                key={route.pathname}
                path={route.pathname}
                exact={route.exact}
                render={routerProps => {
                  return <route.component {...routerProps} />;
                }}
              />
            );
          })}
          <Redirect to={adminRoutes[0].pathname} from="/admin" exact />
          <Redirect to="/404" />
        </Switch>
      </Frame>
    ) : (
      <Redirect to="/login" />
    );
  }
}
const mapToState = state => {
  console.log(state, "state");
  return {
    isLogin: state.user.isLogin
  };
};

export default connect(mapToState)(App);
