import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase";
import "./SidebarChat.css";
import * as timeago from "timeago.js";
import { useDispatch } from "react-redux";
import { setChat } from "../../redux/chatSlice";
import { collection, onSnapshot, query,orderBy } from "firebase/firestore";


function SidebarChat({ id, chatName }) {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState([]);

  useEffect(() => {
    const chatsRef = collection(db, "chats", id, "messages");
      const q=query(chatsRef,orderBy("timestamp","desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          return { id: doc.id, data: doc.data() };
        });
        setChatInfo(messages);
      });

      return () => unsubscribe();
  }, [id]);
  return (
    <div
      onClick={() => {
        dispatch(
          setChat({
            chatId: id,
            chatName: chatName,
          })
        )
        console.log("Side",id)
        }
      }
      className="sidebarChat"
    >
      <Avatar src={chatInfo[0]?.data.photo} />
      <div className="sidebarChat__info">
        <h3>{chatName}</h3>
        <p>{chatInfo[0]?.data.message}</p>
        <small>
          {timeago.format(new Date(chatInfo[0]?.data.timestamp?.toDate()))}
        </small>
      </div>
    </div>
  );
}

export default SidebarChat;
