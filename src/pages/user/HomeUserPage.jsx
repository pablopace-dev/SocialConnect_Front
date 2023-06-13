import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { Profile, Invites, Friends, PrivateProfile } from "./components";
import { useEffect } from 'react';

export const HomeUserPage = () => {

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);


  const checkProfile = () => {


    if (user.profile.length == 0) navigate('editPublicProfile');

  };

  useEffect(() => {
    checkProfile();

  }, []);

  return (

    <section className='secHomeUser'>

      <div className='divRoot'>
        <p>&gt; Tu cuenta</p>
      </div>

      <h1>Hola, {user.name}!</h1>

      <section className='secUserProfiles'>

        <h2>Tus Perfiles:</h2>

        <section className='secUserProfile  show'>

          <h3 className='h3HomeUser'>Público:</h3>
          <Profile profile={user.profile} {...user} />
          {/* <Profile profile={user.profile} name={user.name} image={user.image} _id={user._id} /> */}

          <NavLink className={'aHomeUser'} to='/editPublicProfile'>Edita tu perfil público</NavLink>

        </section>

        <section className='secUserProfile'>

          <h3 className='h3HomeUser'>Privado:</h3>
          <PrivateProfile profile={user.privateProfile} {...user} />

          <NavLink className={'aHomeUser'} to='/editPrivateProfile'>Edita tu perfil privado</NavLink>

        </section>

      </section>

      <Invites />



    </section>

  )
}
