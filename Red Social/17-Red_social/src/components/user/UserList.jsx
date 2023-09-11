import avatar from '../../assets/img/user.png';
import useAuth from "../../hooks/useAuth";
import {global} from '../../helpers/global';
import {Link} from 'react-router-dom';
import {useEffect} from 'react';

import ReactTimeAgo from 'react-time-ago';


export const UserList = ({users,getUsers,following,setFollowing,more,loading,setLoading,page,setPage}) =>{
	const {auth} = useAuth();


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
			setFollowing([...following,id]);
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
				let filtrar = following.filter(user_id => id !== user_id);
				setFollowing(filtrar);
			}
	}
	const nextPage = () => {
		let next = page + 1;
		setPage(next);
		getUsers(next);
		//console.log(following);
	}


	return (<>
			  <div className="content__posts">
            {
            	users.length > 0 ?
            	users.map(use => {
            	return (
            		<article className="posts__post" key={use._id}>

                    <div className="post__container"> 

                        <div className="post__image-user">
                            <Link to={"/social/perfil/"+use._id} className="post__image-link">
                            {use.imagen != "default.png" && 
                                <img src={global.url + "user/avatar/"+use.imagen} className="post__user-image" alt="Foto de perfil"/>
                            }

                            {use.imagen == "default.png" && 
                                <img src={avatar} className="post__user-image" alt="Foto de perfil"/>
                            }
                            </Link>
                        </div>

                        <div className="post__body">

                            <div className="post__user-info">
                                <Link to={"/social/perfil/"+use._id} className="user-info__name">{use.name} {use.surname}</Link>
                                <span className="user-info__divider"> | </span>
                                <a href="#" className="user-info__create-date"><ReactTimeAgo date={use.create_at} locale="es-ES" /></a>
                            </div>

                            <h4 className="post__content">{use.bio ? use.bio : '---No tiene biografia---'}</h4>

                        </div>

                    </div>
                    	{/*Si es el usuario logeado no muestra el boton de seguir*/}
                    	{use._id != auth._id &&
                    	
                    <div className="post__buttons">

                        {/*Si se incluye en lo que sigo*/}
                    
                        {following.includes(use._id) ?
                        
                        <button onClick={() => {unfollow(use._id)}} className="post__button">
                            Dejar de seguir
                        </button>
                        
                        :
	                        <button onClick={() => {follow(use._id)}} className="post__button post__button--green">
	                            Seguir
	                        </button>
                    		}

                    
                

                    </div>
                    }

                </article>
                );
            })
            	:
            	<div align="center"><h2>No tiene nada</h2></div>
            }

                

            </div>
            {loading && (<h2>Cargando...</h2>)}

            {more && users.length > 0 &&
            	<div className="content__container-btn">
                	<button className="content__btn-more-post" onClick={nextPage}>
                    		Ver mas personas
               		 </button>
            	</div>
        	}
        	</>
		)
}