import React from "react";
import Moment from "react-moment";
import Icons from "./Icons";
const Date = ({ from, to, icon, ...rest }) => {
  return (
    <div className="date">
      {icon ? (
        <div className="date-icon">
          <Icons icon="clock" />
          <Moment format="DD-MM-YYYY">{from}</Moment>
        </div>
      ) : (
        <Moment format="DD-MM-YYYY">{from}</Moment>
      )}

      {to && <Moment format="DD-MM-YYYY">{to}</Moment>}
    </div>
  );
};

export default Date;
