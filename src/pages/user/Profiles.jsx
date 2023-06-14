import { useSelector } from "react-redux";
import { PrivateProfile, Profile } from "./components";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export const Profiles = () => {

    const { profiles } = useSelector((state) => state.users);
    const { user } = useSelector((state) => state.auth);

    const [isLoadingPic, setIsLoadingPic] = useState(true);


    const handleLoad = () => setIsLoadingPic(false);


    useEffect(() => {
        console.log('private profile', profiles)
    }, []);

    return (

        <section className="secProfiles">

            <div className='divRoot'>
                <NavLink to='/'>&gt; Tu cuenta</NavLink><span> &gt; Perfiles:</span>
            </div>

            <div className="divImgFront show">
                {
                    (isLoadingPic) &&
                    <>
                        <span className="spin"></span>
                        <img src="../../assets/no-pic-l.png" alt="Imagen de fallo de carga de imagenes" />
                    </>
                }
                <img className="show" onLoad={handleLoad} src="../../assets/profiles.png" alt="Imagen de portada de perfiles" />
                {
                    (!isLoadingPic) &&
                    <div>
                        <h2>...perfiles</h2>
                    </div>
                }
            </div>

            {profiles.map(profile =>
                (profile._id != user._id) &&
                <>
                    <Profile key={'prf' + profile._id} {...profile} />
                    {
                        (profile.privateProfile) &&
                        (profile.privateProfile.length > 0) &&
                        <PrivateProfile key={'pp' + profile._id} {...profile} />
                    }
                </>
            )}

        </section>

    );
};
