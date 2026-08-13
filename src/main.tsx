import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { AudioProvider } from "./audio/AudioProvider";
import { GameProvider } from "./store/GameProvider";
import "./styles.css";
import "./theme-patches.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <GameProvider>
        <AudioProvider>
          <App />
        </AudioProvider>
      </GameProvider>
    </HashRouter>
  </React.StrictMode>,
);
