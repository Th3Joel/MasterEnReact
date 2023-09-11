import avatar from '../../assets/img/user.png';

import {global} from '../../helpers/global';
import useAuth from '../../hooks/useAuth';

import ReactTimeAgo from 'react-time-ago';


export const PublicationList =  ({publication,setPublication,getPublication,page,setPage,more,setMore}) => {
    const {auth} = useAuth();

	const nextPage = () => {
        let next = page + 1;
        setPage(next);
        getPublication(next);
    }

    const delPu = async(id) =>{
        const req = await fetch(global.url+"publication/remove/"+id,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("token")
                }
        });
        const data = await req.json();

        if (data.status == "success") {
            setPage(1);
            setMore(true);
            getPublication(1,true);

        }
    }

	return (<>
				<div className="content__posts">

            {publication.map(pu => {
                return(

                <article className="posts__post" key={pu._id}>

                    <div className="post__container"> 

                        <div className="post__image-user">
                            <a href="#" className="post__image-link">
                                {pu.user.imagen != "default.png" && 
                                    <img src={global.url + "user/avatar/"+pu.user.imagen} className="container-avatar__img" alt="Foto de perfil"/>
                                }

                                {pu.user.imagen == "default.png" && 
                                    <img src={avatar} className="container-avatar__img" alt="Foto de perfil"/>
                                }
                            </a>
                        </div>

                        <div className="post__body">

                            <div className="post__user-info">
                                <a href="#" className="user-info__name">{pu.user.name} {pu.user.surname}</a>
                                <span className="user-info__divider"> | </span>
                                <a href="#" className="user-info__create-date"><ReactTimeAgo date={pu.created_at} locale="es-Es" /></a>
                            </div>

                            <h4 className="post__content">{pu.text}</h4>
                            <div align="center">
                            {
                                pu.file && <img style={{width:'70%',borderRadius:"10px"}} src={global.url + "publication/media/"+pu.file} />
                            }
                            </div>
                        </div>

                    </div>

                    {auth._id == pu.user._id &&
                    <div className="post__buttons">

                        <button className="post__button" onClick={() => {delPu(pu._id)}}>
                            <i className="fa-solid fa-trash-can"></i>
                        </button>

                    </div>
                    }

                </article>
                )
                 })}

            </div>
            <div className="content__container-btn">
            {more &&
                <button className="content__btn-more-post" onClick={nextPage}>
                    Ver mas publicaciones
                </button>
            }
            </div>
            </>
	);
}