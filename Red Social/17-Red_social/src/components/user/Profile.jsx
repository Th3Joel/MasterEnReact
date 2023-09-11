import avatar from '../../assets/img/user.png';
import {Link,useParams} from 'react-router-dom';
import {useEffect,useState} from 'react';
import {getProfile} from '../../helpers/getProfile';
import {global} from '../../helpers/global';
import useAuth from '../../hooks/useAuth';

import {PublicationList} from '../publication/PublicationList';

export const Profile = () => {
	const [user,setUser] = useState({});
	const [contadores,setContadores] = useState({});
	const [siFollow,setSiFollow] = useState(false);
    const [publication,setPublication] = useState([]);
    const [page,setPage] = useState(1);
    const [more,setMore] = useState(true);
	const params = useParams();
    const {auth} = useAuth();
    


	const getCounters = async() =>{
		const req = await fetch(global.url+"user/contadores/"+params.userId,{
			method:"GET",
			headers:{
				"Authorization":localStorage.getItem("token")
			}
		});

		const data = await req.json();
		setContadores(data);
		//console.log(data);
	}

    const follow = async(id) =>{
        //Peticion al backend para guardar el follow
        const req = await fetch(global.url+"follow/save",{
            method:"POST",
            body:JSON.stringify({followed:id}),
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("token")
            }
        });

        const data = await req.json();
        //Cuando este todo correcto
        if(data.status == "success"){
            setSiFollow(true);
        }
        //Acutalizar estado de following, agrengando el nuevo follow
    }
    const unfollow = async(id) =>{
        //Peticion al backend para borrar el follow
            const req = await fetch(global.url + "follow/unfollow/"+id,{
                method:"DELETE",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":localStorage.getItem("token")
                    }
            });
        //Cuando este todo correcto
                const data = await req.json();
        //Acutalizar estado de following, filtrado los datos para eliminar el antiguo follow
            if(data.status == "success"){
                setSiFollow(false);
            }
    }

	useEffect(function(){
		setup();
	},[]);

	useEffect(function(){
		setup();
	},[params]);

	const setup = async() =>{
		let dataUser = await getProfile(params.userId,setUser);
		if(dataUser.following && dataUser.following._id) setSiFollow(true);
        getCounters();
        setMore(true);
        getPublication(1,true);

	}

    //Metodo para traer la publicaciones
    const getPublication = async(nextPage = 1,newProfile = false) =>{

        const req = await fetch(global.url+"publication/user/"+params.userId+"/"+nextPage,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("token")
            }
        });

        const data = await req.json();
        console.log(data);
        if (data.status == "success") {
            if (data.publicaciones) {
                let newPub = data.publicaciones;

                if (!newProfile && publication.length >= 1) {
                    newPub = [...publication,...data.publicaciones];
                }
                if (newProfile) {
                    newPub = data.publicaciones;
                    setMore(true);
                    setPage(1);
                }
                setPublication(newPub);
                //Para ocultar el boton
                if (!newProfile && publication.length >= (data.totalItems - data.publicaciones.length)) {
                    setMore(false)
                }

                if (data.totalPaginas <= 1) {
                    setMore(false);
                }
            }
            

        }
    }

    

    
	return (
		<>
			 
                <header className="aside__profile-info">

                    <div className="profile-info__general-info">
                        <div className="general-info__container-avatar">
                            {user.imagen != "default.png" && 
                                <img src={global.url + "user/avatar/"+user.imagen} className="container-avatar__img" alt="Foto de perfil"/>
                            }

                            {user.imagen == "default.png" && 
                                <img src={avatar} className="container-avatar__img" alt="Foto de perfil"/>
                            }
                        </div>

                        <div className="general-info__container-names">
                            <div className="container-names__name">
                            	<h1>{user.name} {user.surname}</h1>
                				{user._id != auth._id &&
                					(siFollow ?
                						<button className="content__button post__button content__button--rigth"
                                         onClick={function(){unfollow(user._id)}}>Dejar de Seguir</button>
                					:
                						<button className="content__button content__button--rigth"
                                        onClick={function(){follow(user._id)}}>Seguir</button>)

								}
                            </div>
                            <div className="container-names__nickname">
                            	<h2>{user.nick}</h2>
                            </div>
                            <p>{user.bio}</p>

                        </div>
                    </div>

                    <div className="profile-info__stats">

                        <div className="stats__following">
                            <Link to={"/social/siguiendo/"+user._id} className="following__link">
                                <span className="following__title">Siguiendo</span>
                                <span className="following__number">{contadores.following}</span>
                            </Link>
                        </div>
                        <div className="stats__following">
                            <Link to={"/social/seguidos/"+user._id} className="following__link">
                                <span className="following__title">Seguidores</span>
                                <span className="following__number">{contadores.followed}</span>
                            </Link>
                        </div>


                        <div className="stats__following">
                            <Link to={"/social/perfil/"+user._id} className="following__link">
                                <span className="following__title">Publicaciones</span>
                                <span className="following__number">{contadores.publication}</span>
                            </Link>
                        </div>


                    </div>
                </header>

            <PublicationList
                publication={publication}
                setPublication={setPublication}
                getPublication={getPublication}
                more={more}
                setMore={setMore}
                page={page}
                setPage={setPage}
            />

            
		</>
		);
}