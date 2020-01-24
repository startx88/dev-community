import openSocket from "socket.io-client";

export const connectSocket = event => {
  const socket = openSocket("http://localhost:4200");
  return socket.on(event, data => {
    const { action } = data;
    switch (action) {
      case "create":
        return data;
      default:
        return data;
    }
  });
};
//io("");
