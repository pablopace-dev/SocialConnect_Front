import { useEffect, useState } from "react"

export const Msg = ({ date, msg, read, name, from }) => {

    const [dateShort, setDateShort] = useState(null);

    const short = () => setDateShort(new Date(date).toLocaleString());

    useEffect(() => {
        short();

    }, []);

    return (

        <div className="divMessage show">

            <div className="divHeader">
                <p>{(from) ? `Para: ${name}` : 'De: tú'}</p>
                <p className="msgDate">{dateShort} hrs</p>
            </div>

            <div className="divMsg">
                <p>{msg}</p>
            </div>

        </div>
    )
}
