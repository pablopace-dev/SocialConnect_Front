import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useSocketStore } from "../../../hooks/useSocketStore";
import ScrollToBottom from "react-scroll-to-bottom";


export const ChatBox = ({ _id, name, show }) => {

  const { chats, chatActive } = useSelector((state) => state.socket);
  const { user } = useSelector((state) => state.auth);
  const { profiles } = useSelector((state) => state.users);

  const [chatIndex, setChatIndex] = useState(null);
  const [chat, setChat] = useState([]);
  const [lastLine, setLastLine] = useState(0)

  const { openChat, sendMsg, findChat } = useSocketStore();



  const prepChat = (data) => {

    const newChat = [];
    let lastSender;
    let orientation;

    const firstName = name.split(' ')[0];

    if (!data) return

    data.chat.forEach(ch => {

      orientation = ch.msgSender == _id ? "chLeft" : "chRight";

      if (ch.msgSender == lastSender) {

        newChat.push({
          type: 'msg',
          orientation,
          content: ch.msg
        });

        newChat.push({
          type: 'date',
          orientation,
          content: ch.date
        });

        lastSender = ch.msgSender;

      } else {

        newChat.push({
          type: 'spc',
          orientation,
          content: ' '
        });

        newChat.push({
          type: 'name',
          content: ch.msgSender == _id ? `${firstName}:` : 'Tú:',
          orientation
        });

        newChat.push({
          type: 'msg',
          content: ch.msg,
          orientation
        });

        newChat.push({
          type: 'date',
          content: ch.date,
          orientation
        });

        lastSender = ch.msgSender;

      }

    });

    if (data.userDeleted == data.sender || data.userDeleted == data.receiver) {

      newChat.push({
        type: 'spc',
        content: ' '
      });

      newChat.push({
        type: 'deleted',
        content: 'Usuario eliminado...'
      });
    }


    setChat({
      ...data,
      chat: newChat
    });

  };



  const handleOnSubmit = (ev) => {
    ev.preventDefault();

    if (ev.target.text.value == '') return
    console.log('send ', ev.target.text.value, chatIndex, _id, user._id)
    sendMsg(ev.target.text.value, chatIndex, _id, user._id);
    ev.target.reset();

    // prepChat(chats[chatIndex]);

  };



  const getIndex = () => {

    // const ind = openChat(user._id, _id);
    const ind = findChat(user._id, _id);
    console.log('getindex ind', ind)
    setChatIndex(ind);
    prepChat(chats[ind]);

  };

  useEffect(() => {
    console.log('effect chatindex', chatIndex)
    if (chatIndex == -1 || !chatIndex)
      getIndex();

  }, [chats]);


  useEffect(() => {

    prepChat(chats[chatIndex]);

  }, [chats[chatIndex]?.chat]);




  useEffect(() => {
    // getIndex();
    openChat(user._id, _id);

  }, []);


  return (

    <div className={`divChatBox ${show && 'mostrarChatBox'}`} >

      <div className="gridChatContainer">
        <p className="pChatName">{name}</p>

        <section className="chatTable">
          {(chat) ?

            (chat.chat) &&

            chat.chat.map((ch, ind) =>

              <p className={`pChat ${ch.orientation} chat-${ch.type}`}>
                {ch.content}
              </p>
            )
            :

            <h2>NO hay chats</h2>
          }

        </section>

        <form onSubmit={handleOnSubmit}>
          <input autoComplete="off" type="text" name="text" placeholder="Escribe algo..." />
          <input disabled={(chat.userDeleted) ? true : false} type="submit" value="Enviar" />
        </form>

      </div>

    </div >

  );

};