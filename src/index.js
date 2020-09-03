import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import TabProvider from "./providers/images/Images.provider";
import PageProvider from "./providers/page/Page.provider";
import SoftkeysProvider from "./providers/softkeys/Softkeys.provider";
// import * as serviceWorker from './serviceWorker';

const app = (
  <TabProvider>
    <PageProvider>
      <SoftkeysProvider>
        <App />
      </SoftkeysProvider>
    </PageProvider>
  </TabProvider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
