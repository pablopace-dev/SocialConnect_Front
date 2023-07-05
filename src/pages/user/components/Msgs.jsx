import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Message, Msg } from "./";

export const Msgs = ({ msgs, _id, name, handleOnMsgs }) => {

    const [userMsgs, setUserMsgs] = useState([]);
    const [showMsgs, setShowMsgs] = useState(false);
    const [foldMsgs, setFoldMsgs] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const { profiles } = useSelector((state) => state.users);


    const filterMessages = () => {
        const newMsgs = msgs.filter(msg => msg.from == _id || msg.to == _id);

        setUserMsgs(newMsgs);
    };


    const handleFold = () => setFoldMsgs(!foldMsgs);


    useEffect(() => {

        if (msgs)
            filterMessages();

    }, [msgs]);


    useEffect(() => {
        setTimeout(() => {
            setShowMsgs(true);
        }, 1000);

    }, []);


    return (

        <div className="divMsgs show">

            <Message _id={_id} name={name} handleOnMsgs={handleOnMsgs} />

            {
                (showMsgs) &&
                <section className="fall secMsgs" >

                    <div className="gridContainer">
                        <p>Mensajes:</p>
                        <button
                            onClick={handleFold}
                            className="btnFold">
                            <i className={`${(foldMsgs) ? "fa-regular fa-circle-up" : "fa-regular fa-circle-up fa-rotate-180"}`}></i>
                        </button>
                    </div>

                    <div className={`divMsgsList ${(foldMsgs) ? "unfold" : "fold"}`}>
                        {
                            (userMsgs?.length > 0) ?
                                userMsgs.map(msg =>
                                    <Msg key={msg.date + Date.now()} {...msg} name={name} />
                                )
                                :
                                <p className="pNoMsgs">
                                    Aún no tienes mensajes
                                </p>
                        }
                    </div>

                </section>
            }

        </div>
    )
}
