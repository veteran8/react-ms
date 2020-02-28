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
                  const hasPermission = route.roles.includes(this.props.role);
                  console.log(hasPermission, "hasPermission+++");
                  return hasPermission ? (
                    <route.component {...routerProps} />
                  ) : (
                    <Redirect to="/admin/noAuth" />
                  );
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
  console.log(state, "App State++++");
  return {
    isLogin: state.user.isLogin,
    role: state.user.role
  };
};

export default connect(mapToState)(App);
