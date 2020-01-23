import { useLocation } from "react-router-dom";
const useQuery = props => {
  return new URLSearchParams(useLocation().search);
};
export default useQuery;
