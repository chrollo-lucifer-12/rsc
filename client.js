import React from "react";
import ReactDOMClient from "react-dom/client";
import * as ReactServerDOMWebpackClient from "react-server-dom-webpack/client";

function App() {
  const [tree, setTree] = React.useState(null);

  React.useEffect(() => {
    // initial load
    fetch("/rsc")
      .then((res) =>
        ReactServerDOMWebpackClient.createFromReadableStream(res.body),
      )
      .then(setTree);

    window.__updateTree = async (stream) => {
      const newTree =
        await ReactServerDOMWebpackClient.createFromReadableStream(stream);
      setTree(newTree);
    };

    return () => {
      window.__updateTree = undefined;
    };
  }, []);

  if (!tree) return <div>Loading...</div>;

  return tree;
}

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(<App />);
