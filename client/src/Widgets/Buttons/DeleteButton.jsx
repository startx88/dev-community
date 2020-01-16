import React from "react";
import Button from "../../UI/Button";
import Icons from "../../UI/Icons";

// Delete Button
const DeleteButton = ({ icon, text, deleteHandler }) => {
  return (
    <Button  clicked={() => deleteHandler(comment._id)}
      btnType="dlt-icon"
    >
     {text ? text: <Icons icon={icon} />}
    </Button>
  );
};

export DeleteButton
