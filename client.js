import React from "react";
import ReactDOMClient from "react-dom/client";
import * as ReactServerDOMWebpackClient from "react-server-dom-webpack/client";

// fetch server rendered react tree from /rsc
// convert to something react understands
// render it using React.use
//

const initialReactTreePromise = fetch("/rsc").then((response) => {
  return ReactServerDOMWebpackClient.createFromReadableStream(response.body);
});

function App() {
  return React.use(initialReactTreePromise);
}

const root = ReactDOMClient.createRoot(document.getElementById("root"));

root.render(<App />);
