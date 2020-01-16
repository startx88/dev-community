import React, { Suspense, useEffect } from "react";
import "./App.css";
import Web from "../Web/Web";
import Spinner from "../UI/Spinner/Spinner";
import { checkUserIsAuthenticate } from "../Stores/Actions";
import { useDispatch } from "react-redux";
import ErrorBoundary from "../Widgets/ErrorBoundary/ErrorBoundary";
// App Component
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserIsAuthenticate());
  }, [dispatch]);

  return (
    <Suspense fallback={<Spinner fixed />}>
      <ErrorBoundary>
        <Web />
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
