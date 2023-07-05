import { useSelector } from "react-redux";
import { People } from "./components";
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';

export const Meet = () => {

    const [myProfiles, setMyProfiles] = useState([]);
    const [isLoadingPic, setIsLoadingPic] = useState(true);

    const { profiles, invites } = useSelector((state) => state.users)
    const { user } = useSelector((state) => state.auth)


    const filterProfiles = () => {
        const tempProfiles = profiles.filter(prof => !user.friends.includes(prof._id))

        setMyProfiles(tempProfiles);
    };


    // useEffect(() => {
    //     filterProfiles();

    // }, [profiles]);

    useEffect(() => {
        filterProfiles();

    }, [invites, profiles, user?.friends]);

    // useEffect(() => {
    //     filterProfiles();

    // }, [user.friends]);

    const handleLoad = () => setIsLoadingPic(false);


    return (

        <section className="secMeet">

            <div className='divRoot'>
                <NavLink to='/'>&gt; Tu cuenta</NavLink><span> &gt; Conocer gente:</span>
            </div>

            <div className="divImgFront show" >
                {
                    (isLoadingPic) &&
                    <>
                        <span className="spin"></span>
                        <img className="imgSub" src="../../assets/no-pic-l.png" alt="Imagen de fallo de carga de imagenes" />
                    </>
                }
                <img src="../../assets/meet.png" className="show" onLoad={handleLoad} alt="Imagen de portada de conocer gente" />
                {
                    (!isLoadingPic) &&
                    <div>
                        <h2>...conoce gente</h2>
                    </div>
                }
            </div>

            <h3>Aquí los tienes:</h3>
            <div className="divMeetPeople">
                {
                    myProfiles.map(prof => (
                        (prof._id != user._id) && < People key={prof._id} profile={prof} />
                    ))
                }
            </div>

        </section>
    )
}
