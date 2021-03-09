import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store";
import MyRouter from "./routes/Router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/custom.scss";
const App = () => {
  return (
    <Provider store={store}>
      {/* provider을 통하여 store에 연결 가능 App 컴포넌트는 Store에 접근한다. */}
      <ConnectedRouter history={history}>
        {/* history를 받아올 수 있다. */}
        <MyRouter />
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
