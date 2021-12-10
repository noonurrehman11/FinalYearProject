import { IconButton } from "@material-ui/core";
import MicNoneIcon from "@material-ui/icons/MicNone";
import React, { useEffect, useState } from "react";

import "./Chat.css";
import { db } from "../../firebase";
import { collection, serverTimestamp, onSnapshot, query,orderBy, addDoc } from "firebase/firestore";
import Message from '../Messages/Message'
import FlipMove from "react-flip-move";
import { useSelector } from "react-redux";

function Chat() {
  // const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const chatName = useSelector(state => state.chat.chatName);
  const chatId = useSelector(state => state.chat.chatId);
  const [messages, setMessages] = useState([]);


  useEffect(() => {

    if (chatId) {
      const chatsRef = collection(db, "chats", chatId, "messages");
      const q=query(chatsRef,orderBy("timestamp","desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          return { id: doc.id, data: doc.data() };
        });
        setMessages(messages);
      });

      return () => unsubscribe();

      // db.collection("chats")
      //   .doc(chatId)
      //   .collection("messages")
      //   .orderBy("timestamp", "desc")
      //   .onSnapshot((snapshot) =>
      //     setMessages(
      //       snapshot.docs.map((doc) => ({
      //         id: doc.id,
      //         data: doc.data(),
      //       }))
      //     )
      //   );
    }


  }, [chatId]);
  // console.log("Messages", messages);
  // console.log("Chat Id", chatId)

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("Send")

    const MessagesRef = collection(db, "chats", chatId, "messages");
    const unsubscribe = addDoc(MessagesRef, {
      timestamp: serverTimestamp(),
      message: input,
      uid: 'admin123',
      photo:'https://firebasestorage.googleapis.com/v0/b/filmy-geek.appspot.com/o/user.png?alt=media&token=1cfeafd4-2847-4e09-a6c9-c7249cd54f27',
      email: 'admin@gmail.com',
      displayName: 'admin',

    });
    setInput("");
    return () => unsubscribe();
    

    // db.collection("chats").doc(chatId).collection("messages").add({
    //   timestamp: serverTimestamp(),
    //   message: input,
    //   uid: user.uid,
    //   photo: user.photo,
    //   email: user.email,
    //   displayName: user.displayName,
    // });

    // setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <h4 style={{color:'white'}}>
          To: <span className="chat__name">{chatName}</span>
        </h4>
        <strong>Details</strong>
      </div>

      {/* chat messages */}
      <div className="chat__messages">
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} contents={data} />
          ))}
        </FlipMove>
      </div>

      <div className="chat__input">
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type Message "
            type="text"
          />
          <button onClick={sendMessage}>Send Message</button>
        </form>

        <IconButton>
          <MicNoneIcon className="chat__mic" />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
