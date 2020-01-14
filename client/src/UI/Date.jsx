import React from "react";
import Moment from "react-moment";

const Date = ({ from, to, ...rest }) => {
  return (
    <div className="date">
      <Moment format="DD-MM-YYYY">{from}</Moment>
      {to && <Moment format="DD-MM-YYYY">{to}</Moment>}
    </div>
  );
};

export default Date;
