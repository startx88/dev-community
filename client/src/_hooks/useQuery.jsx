import React from "react";
import { useLocation, Redirect } from "react-router-dom";
const useQuery = props => {
  return new URLSearchParams(useLocation().search);
};
export default useQuery;
