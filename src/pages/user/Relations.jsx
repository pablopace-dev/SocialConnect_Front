import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { BigPeople } from "./components"
import { useEffect, useState } from "react"


export const Relations = () => {


    const { profiles, invites } = useSelector((state) => state.users)
    const { user } = useSelector((state) => state.auth)
    const { chats } = useSelector((state) => state.socket)

    const [myProfilesI, setMyProfilesI] = useState([]);
    const [myProfilesD, setMyProfilesD] = useState([]);


    const filterProfiles = () => {
        const tempProfilesI = profiles.filter((prof, ind) => user.friends.includes(prof._id) && ind % 2 === 0);
        const tempProfilesD = profiles.filter((prof, ind) => user.friends.includes(prof._id) && ind % 2 !== 0);

        setMyProfilesI(tempProfilesI);
        setMyProfilesD(tempProfilesD);
    };


    useEffect(() => {
        filterProfiles();

    }, [profiles]);

    return (

        <section className="secRelations">

            <div className='divRoot'>
                <NavLink to='/'>&gt; Tu cuenta</NavLink><span> &gt; Mis relaciones:</span>
            </div>

            <h2>Mis Relaciones:</h2>

            <div className="imgContainer">
                <img src="../../assets/relations.png" alt="Imagen de portada de perfiles" />
            </div>

            <div className="divGridPeople">
                <div className="divCols">
                    {
                        myProfilesI.map(prof =>
                            (prof._id != user._id) && < BigPeople key={prof._id} {...prof} msgs={user.msgs} />
                        )
                    }
                </div>
                <div className="divCols">
                    {
                        myProfilesD.map(prof =>
                            (prof._id != user._id) && < BigPeople key={prof._id} {...prof} msgs={user.msgs} />
                        )
                    }
                </div>
            </div>

        </section >

    )
}
