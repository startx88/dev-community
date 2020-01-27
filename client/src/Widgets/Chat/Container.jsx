import React, { useState, useEffect, useCallback } from "react";
import PostAvatar from "../Avatar/PostAvatar";
import ChatBox from "./Controls/chatbox";
import { useDispatch, useSelector } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import { getAllUsers } from "../../Stores/Actions";
import useAccess from "../../_hooks/isAuth";
import Spinner from "../../UI/Spinner/Spinner";
/**
 * Chat component
 * @param {*} props
 */
const Container = props => {
  const [chatUser, setChatUser] = useState(null);
  const { user } = useAccess();
  console.log("user", user);
  // dispatch
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.auth);

  // select user
  const selectUserHandler = user => {
    setChatUser(user);
  };

  const hideUserHanlder = () => {
    setChatUser(null);
  };

  // load all user
  const loadUsers = useCallback(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  if (!users) {
    return <Spinner />;
  }

  if (!user.user) {
    return <Spinner />;
  }

  return (
    <>
      <aside className="aside-chat">
        <Scrollbars style={{ width: "100%" }}>
          <ul>
            {users
              .filter(usr => usr._id !== user.user._id)
              .map(user => (
                <li key={user._id} onClick={() => selectUserHandler(user)}>
                  <PostAvatar
                    avatar={user.avatar}
                    name={user.name}
                    status="Sr. Software Engineer"
                  />
                </li>
              ))}
          </ul>
        </Scrollbars>
      </aside>
      {user.user && (
        <ChatBox
          hideHanlde={hideUserHanlder}
          selectuser={chatUser}
          loggedinuser={user.user}
        />
      )}
    </>
  );
};
export default Container;
