import React, { useState, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import Button from "../../../UI/Button";
import Icons from "../../../UI/Icons";
import io from "socket.io-client";

let socket;

if (!socket) {
  socket = io(":5000");
}

// Chat Box
const UserChatBox = ({ loggedinuser, selectuser, hideHanlde }) => {
  console.log(loggedinuser);
  const [text, setText] = useState("");
  const [istypeing, setisTypeing] = useState("");
  const [messages, setMessages] = useState([]);

  // change handler
  const changeHanlder = event => {
    const { value } = event.target;
    setText(value);
    socket.emit("typing", loggedinuser.name);
  };

  // submit handler
  const submitHandler = event => {
    event.preventDefault();
    socket.emit("chat", {
      id: loggedinuser._id,
      name: loggedinuser.name,
      message: text
    });
    setText("");
  };

  // user effect
  useEffect(() => {
    socket.on("chat", data => {
      setMessages([...messages, data]);
    });
    socket.on("typing", function(data) {
      setisTypeing(data);
    });
  }, [messages, istypeing]);

  // hide handler
  const hideHandler = () => {
    hideHanlde();
  };

  return (
    selectuser && (
      <div className="chat-box">
        <div className="chat-title">
          <h6>{selectuser.name}</h6>
          <Button clicked={hideHandler} classname="close">
            <Icons icon="times" />
          </Button>
        </div>
        <div className="chat-body">
          <Scrollbars>
            {istypeing && (
              <span className="is-typeing">
                <i>{istypeing} is typing...</i>
              </span>
            )}
            <ul>
              {messages.map((item, index) => (
                <li key={item.message + "-" + index}>
                  <label>{item.name}</label>
                  {item.message}
                </li>
              ))}
            </ul>
          </Scrollbars>
        </div>
        <form onSubmit={submitHandler} className="chat-form">
          <input
            name="text"
            onChange={changeHanlder}
            placeholder="type message here..."
            type="text"
            className="form-control"
            value={text}
          />
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </form>
      </div>
    )
  );
};

export default UserChatBox;
