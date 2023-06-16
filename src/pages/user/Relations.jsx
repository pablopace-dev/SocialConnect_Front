import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { BigPeople } from "./components"
import { useEffect, useState } from "react"


export const Relations = () => {


    const { profiles, invites } = useSelector((state) => state.users)

    const [isLoadingPic, setIsLoadingPic] = useState(true);
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


    const handleLoad = () => setIsLoadingPic(false);


    useEffect(() => {
        filterProfiles();

    }, [profiles]);

    return (

        <section className="secRelations">

            <div className='divRoot'>
                <NavLink to='/'>&gt; Tu cuenta</NavLink><span> &gt; Mis relaciones:</span>
            </div>

            <div className="divImgFront show">
                {
                    (isLoadingPic) &&
                    <>
                        <span className="spin"></span>
                        <img className="imgSub" src="../../assets/no-pic-l.png" alt="Imagen de fallo de carga de imagenes" />
                    </>
                }
                <img className="show" onLoad={handleLoad} src="../../assets/relations.png" alt="Imagen de portada de relaciones" />
                {
                    (!isLoadingPic) &&
                    <div>
                        <h2>...tus relaciones</h2>
                    </div>
                }
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
