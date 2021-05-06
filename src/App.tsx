import React from "react";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import store from "./store";

const App = () => {
  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={IndexPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;
