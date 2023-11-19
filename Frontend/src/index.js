import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { ThemeProvider, CSSReset } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";



import ChatProvider from "./Context/ChatProvider";
import "./index.css";

import App from "./App";
const theme = {
  // ... your system-ui theme
  config: {
    useSystemColorMode: false, // or true
    initialColorMode: "light", // or "dark"
    cssVarPrefix: "chakra", // any string
  }
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <ChatProvider>
        <Provider store={store}>
      
          <App />
           </Provider>
      </ChatProvider>
  </React.StrictMode>
);


