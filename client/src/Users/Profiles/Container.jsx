import React from "react";
import Title from "../../Widgets/Title/Title";
import { useSelector } from "react-redux";
const Container = props => {
  const { profile } = useSelector(state => state.profile);
  return (
    <>
      <Title type="admin" />
      <hr />
    </>
  );
};
export default Container;
