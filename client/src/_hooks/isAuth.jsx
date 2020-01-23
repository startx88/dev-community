import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { userSelector } from "../Stores/Selectors";

const useAccess = props => {
  const auth = useSelector(
    createStructuredSelector({
      user: userSelector
    })
  );

  return auth;
};
export default useAccess;
