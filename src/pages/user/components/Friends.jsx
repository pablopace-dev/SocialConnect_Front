import { LittlePeople } from "./";
import { useEffect } from "react";
import { useFriends } from "../hooks/useFriends";


export const Friends = ({ friends, show, msg, handleGetFriends, handleOnOpenChat }) => {

  // const {
  //   handleOnOpenChat,
  //   handleGetFriends,
  //   msg,
  //   show,
  //   friends
  // } = useFriends();


  useEffect(() => {
    handleGetFriends();

  }, []);

  return (

    <section className="secUserFriends">

      {
        friends.map(fr =>
          <>
            <article className="artFriends" key={`fr-${Date.now() + fr.name}`} >
              <LittlePeople name={fr.name} image={fr.image} />

              {
                (fr.name) &&
                <div className="divBtnsChat">

                  {(show?._id === fr._id)
                    ?
                    <button onClick={() => handleOnOpenChat(fr._id, false)}><i className="fa-solid fa-rectangle-xmark"></i></button>
                    :
                    <button onClick={() => handleOnOpenChat(fr._id, true)}><i className="fa-solid fa-comment-dots"></i></button>
                  }
                </div>
              }

              <p className="pChatMsg">{msg}</p>

            </article>
          </>
        )
      }


    </ section>

  );

};
