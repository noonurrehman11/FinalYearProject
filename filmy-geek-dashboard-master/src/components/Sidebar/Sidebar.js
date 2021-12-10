import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import SearchIcon from "@material-ui/icons/Search";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import SidebarChat from "../SidebarChat/SidebarChat";
import {db} from "../../firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";

function Sidebar() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const chatsRef = collection(db, "chats");
    const unsubscribe = onSnapshot(chatsRef,(snapshot) => {
      const chats = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setChats(chats);
    });
    return () => {
      unsubscribe();
    };
    
  }, []);

  console.log("Chats",chats);
  const addChat = () => {
    const chatName = prompt("Please enter a chat name");

    if (chatName) {
      db.collection("chats").add({
        chatName: chatName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          onClick={() => {}}
          src={require('./admin.png')}
          className="sidebar__avatar"
        />
        <div className="sidebar__input">
          <SearchIcon />
          <input placeholder="Search" />
        </div>

        <IconButton variant="outlined" className="sidebar__inputButton">
          <RateReviewOutlinedIcon onClick={addChat} />
        </IconButton>
      </div>

      <div className="sidebar__chats">
        {chats.map(({ id, data: { name } }) => (
          <SidebarChat key={id} id={id} chatName={name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
