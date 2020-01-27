import React, { Suspense, useEffect } from "react";
import "./App.css";
import Web from "../Web/Web";
import Spinner from "../UI/Spinner/Spinner";
import ErrorBoundary from "../Widgets/ErrorBoundary/ErrorBoundary";
import setAuthToken from "../_helper/setAuthToken";
import { checkUserIsAuthenticate } from "../Stores/Actions";
import { useDispatch } from "react-redux";

// App Component

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserIsAuthenticate());
  }, [dispatch]);

  return (
    <Suspense
      fallback={<Spinner svgWidthHeight="100" text="Loading..." fixed />}
    >
      <ErrorBoundary>
        <Web />
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
