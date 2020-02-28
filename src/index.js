import { render } from "react-dom";
import React from "react";
import App from "./App";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Provider } from "react-redux";
import { mainRoutes } from "./routes";
import "./index.less";
import store from "./store";

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/admin" component={App} />
        {mainRoutes.map(route => {
          return (
            <Route
              key={route.pathname}
              path={route.pathname}
              component={route.component}
            />
          );
        })}
        <Redirect to="/admin" from="/" exact />
        <Redirect to="/404" />
      </Switch>
    </Router>
  </Provider>,
  document.querySelector("#root")
);
