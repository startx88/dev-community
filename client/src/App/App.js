import React, { Suspense, useEffect } from "react";
import "./App.css";
import Web from "../Web/Web";
import Spinner from "../UI/Spinner/Spinner";
import { checkUserIsAuthenticate } from "../Stores/Actions";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../axios_instance";

// App Component
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserIsAuthenticate());
  }, []);
  return (
    <Suspense fallback={<Spinner fixed />}>
      <Web />
    </Suspense>
  );
}

export default App;
