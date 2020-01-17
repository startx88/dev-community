import React from "react";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
const UserStatus = props => {
  return (
    <div class="user-status">
      <div className="status-title">
        <h6>Add Your Status</h6>
      </div>
      <div className="status-form">
        <Input inputtype="textarea" placeholder="add status" />
        <Button btnType="primary">ADD</Button>
      </div>
    </div>
  );
};
export default UserStatus;
