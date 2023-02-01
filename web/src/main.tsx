import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { NotificationsProvider } from '@mantine/notifications';


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(

  <BrowserRouter>
        <NotificationsProvider>

    <App />
    </NotificationsProvider>

  </BrowserRouter>

);
