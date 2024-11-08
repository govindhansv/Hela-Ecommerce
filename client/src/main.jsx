import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-day-picker/dist/style.css";
import "react-image-crop/dist/ReactCrop.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { store } from "./redux/store";
import { Provider } from "react-redux";
// import { GOOGLE_ID } from "./Common/configurations.jsx";

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://7a0fafc1e5fdc05a8b0e637081ce10a0@o4508261561073664.ingest.de.sentry.io/4508261621104720",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/server\.healh\.in\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const GOOGLE_ID =
  "628424458787-qkhchkq95n7ht13oneer3692talfp63f.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={`${GOOGLE_ID}`}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);
