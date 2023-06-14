import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { LittlePeople, Msgs } from "./components";
import { getUserData } from '../user/helpers/getUserData'


export const Messages = () => {


  const [myUsers, setMyUsers] = useState([]);
  const { profiles, invites } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);
  const [show, setShow] = useState({});
  const [isLoadingPic, setIsLoadingPic] = useState(true);


  const filterProfiles = () => {

    let newUsers = [];
    user.msgs.forEach(msg => {

      const _id = msg.to || msg.from;
      const exists = newUsers.find(user => user.to == _id || user.from == _id)

      if (!exists) {
        const { name, image } = getUserData(_id, profiles);
        newUsers.push({ ...msg, name, image });

      }

    });

    setMyUsers(newUsers);
  };

  const handleOnClick = (usr) => {

    const _id = usr.to || usr.from;
    const newUsr = myUsers.find(u => u.to == _id || u.from == _id);
    newUsr.show = true;
    newUsr._id = _id;
    setShow(newUsr);

  };


  const handleLoad = () => setIsLoadingPic(false);


  useEffect(() => {
    filterProfiles();

  }, [profiles]);


  return (
    <section className="secMessages">

      <div className='divRoot'>
        <NavLink to='/'>&gt; Tu cuenta</NavLink><span> &gt; Mis mensajes:</span>
      </div>

      <div className="divImgFront show">
        {
          (isLoadingPic) &&
          <>
            <span className="spin"></span>
            <img src="../../assets/no-pic-l.png" alt="Imagen de fallo de carga de imagenes" />
          </>
        }
        <img className="show" src="../../assets/msg.png" onLoad={handleLoad} alt="Imagen de portada de mensajes" />
        {
          (!isLoadingPic) &&
          <div>
            <h2>...tus mensajes</h2>
          </div>
        }
      </div>


      <h3>Aquí los tienes:</h3>

      <div className="divCont">
        {
          myUsers.map(usr => (
            <div key={usr.date} className="divChild1">
              < LittlePeople {...usr} />
              <button onClick={() => handleOnClick(usr)}>ver</button>

            </div>
          ))
        }

        {
          (show.show) &&
          <Msgs _id={show._id} msgs={user.msgs} name={show.name} />
        }
      </div>

    </section>
  )

}
