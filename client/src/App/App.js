import React, { Suspense } from "react";
import "./App.css";
import Web from "../Web/Web";
import Spinner from "../UI/Spinner/Spinner";

// App Component
function App() {
  return (
    <Suspense fallback={<Spinner fixed />}>
      <Web />
    </Suspense>
  );
}

export default App;
