import { useEffect, useState } from "react";
import { Profile, PrivateProfile, Msgs, ChatBox } from "./";
import { useFriends } from "../hooks/useFriends";
import { NavLink } from "react-router-dom";


export const BigPeople = ({ _id, profile, email, privateProfile, dateMod, privateDateMod, name, image, msgs }) => {

    const [show, setShow] = useState({ msgs: false, chat: false, warning: false })

    const {
        handleRemoveFriend,
        msg
    } = useFriends();



    const handleOnMsgs = () => {

        setShow({
            msgs: !show.msgs,
            chat: false,
            warning: false
        });

    };


    const handleOnChat = () => {

        setShow({
            msgs: false,
            chat: !show.chat,
            warning: false
        });

    };


    const handleOnWarning = () => {

        setShow({
            msgs: false,
            chat: false,
            warning: !show.warning
        });

    };


    return (

        <section className="secBigPeople">

            <div className="divUserName">
                <p className="pDate">Ult. mod.: {dateMod} hrs.</p>
                <h3>{name}</h3>
            </div>

            <div className="divUserImage">
                <NavLink to={`/detail/${_id}`} >
                    <img src={image} alt={`Imagen de ${name}`} />
                </NavLink>
            </div>

            <div className="divBtns">
                <button onClick={handleOnMsgs}><i className="fa-solid fa-envelope-circle-check"></i> Mensajes</button>
                <button onClick={handleOnChat}><i className="fa-regular fa-comments"></i> Chat</button>
                <button onClick={handleOnWarning}><i className="fa-solid fa-heart-crack"></i> Romper</button>

            </div>

            {
                (show.warning) &&
                <div className="divWarning">
                    <p>¿Estas seguro de romper este vínculo?</p>
                    <button onClick={() => handleRemoveFriend(_id)}><i className="fa-solid fa-heart-crack"></i> Sí, romperlo</button>
                    <button onClick={handleOnWarning} >No, Cancelar</button>
                </div>
            }

            {
                (show.msgs) &&
                <Msgs _id={_id} msgs={msgs} name={name} handleOnMsgs={handleOnMsgs} />
            }

            {
                (show.chat) &&
                <ChatBox _id={_id} name={name} />
            }

        </section>

    );
};