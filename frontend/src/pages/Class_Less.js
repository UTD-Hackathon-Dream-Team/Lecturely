import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useAuth0 } from "@auth0/auth0-react";
import io from "socket.io-client";
import Board from "./Board_Less";

const ENDPOINT = "http://localhost:4000";

const activeUsers = ["109074203591919453634", "104609449234380862807"];

const Class = (props) => {
  const { user } = useAuth0();
  let socket;
  const userID = user.sub.split("|")[1];
  // compare this session ID to user token to see if teacher
  if (props.match.params.id === userID)
    socket = io.connect(ENDPOINT + "/admin");
  else socket = io.connect(ENDPOINT + "/student", { query: `id=${userID}` });
  socket.on("update_students", (data) => console.log(data));

  const studentList = (
    <List style={{ margin: "0 auto 0 auto" }}>
      {activeUsers.map((board) => (
        <ListItem>
          <Board id={board} styling="side" socket={socket} noColor={true} />
          {props.match.params.id === board}
        </ListItem>
      ))}
    </List>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Board id={userID} styling="main" socket={socket} />
      {studentList}
    </div>
  );
};

export default Class;