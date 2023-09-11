import React,{useState} from 'react';
import avatar from '../../../assets/img/user.png';
import useAuth from '../../../hooks/useAuth';
import {useForm} from '../../../hooks/useForm';

import {global} from '../../../helpers/global';

import {Link} from 'react-router-dom';

export const Sidebar = () => {
    const {auth,contadores} = useAuth();
    console.log(auth);
    const {form,changed} = useForm({});
    const [saved,setSaved] = useState();

    const savePublication = async(e) =>{
        e.preventDefault();
        //Recoger datos del formulario
        let newPublication = form;
        newPublication.user = auth._id;
        //Hacer peticion en la bd
        const req = await fetch(global.url+"publication/save",{
            method:"POST",
            body:JSON.stringify(newPublication),
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("token")
            }
        });

        const data = await req.json();

        //Mostrar mensaje de exito o error
        if (data.status == "succes") {
            setSaved(1);
            imagen(data);
        }else{
            setSaved(0);
        }
        setTimeout(function(){setSaved(null)},2000);

        //Para resetar el campo
        document.querySelector("#formPu").reset();
        //console.log("hola");
    }

    const imagen = async(data) =>{
            //subir imagen
        const fileInput = document.querySelector("#file");
        if (fileInput.files[0]) {
            const formData = new FormData();
            formData.append("file0",fileInput.files[0]);
            const reqUp = await fetch(global.url+"publication/upload/"+data.publicacion._id,{
                method:"POST",
                body:formData,
                headers:{
                    "Authorization":localStorage.getItem("token")
                }
            });

            const dataUp = await reqUp.json();
            //console.log(dataUp);
            if (dataUp.status == "success") {
                setSaved(1);
            }else{
                setSaved(0);
            }

        }
        }

	return (
			 <aside className="layout__aside">

            <header className="aside__header">
                <h1 className="aside__title">Hola, {auth.name}</h1>
            </header>

            <div className="aside__container">

                <div className="aside__profile-info">

                    <div className="profile-info__general-info">
                        <div className="general-info__container-avatar">
                            {auth.imagen != "default.png" && 
                                <img src={global.url + "user/avatar/"+auth.imagen} className="container-avatar__img" alt="Foto de perfil"/>
                            }

                            {auth.imagen == "default.png" && 
                                <img src={avatar} className="container-avatar__img" alt="Foto de perfil"/>
                            }
                        </div>

                        <div className="general-info__container-names">
                            <Link to={"perfil/"+auth._id} className="container-names__name">{auth.name} {auth.surname}</Link>
                            <p className="container-names__nickname">{auth.nick}</p>
                        </div>
                    </div>

                    <div className="profile-info__stats">

                        <div className="stats__following">
                            <Link to={"siguiendo/"+auth._id} href="#" className="following__link">
                                <span className="following__title">Siguiendo</span>
                                <span className="following__number">{contadores.following}</span>
                            </Link>
                        </div>
                        <div className="stats__following">
                            <Link to={"seguidos/"+auth._id} href="#" className="following__link">
                                <span className="following__title">Seguidores</span>
                                <span className="following__number">{contadores.followed}</span>
                            </Link>
                        </div>


                        <div className="stats__following">
                            <Link to={"perfil/"+auth._id} className="following__link">
                                <span className="following__title">Publicaciones</span>
                                <span className="following__number">{contadores.publication}</span>
                            </Link>
                        </div>


                    </div>
                </div>


                <div className="aside__container-form">
                {saved == 1 ?
                    <strong className="alert alert-success">Publicacion guardada</strong>
                    : ""}
                    {saved == 0 ?
                    <strong className="alert alert-danger">Ha ocurrido un error</strong>
                    : ""}
                    <form id="formPu" className="container-form__form-post" onSubmit={savePublication}>

                        <div className="form-post__inputs">
                            <label htmlFor="text" className="form-post__label">¿Que estas pesando hoy?</label>
                            <textarea name="text" className="form-post__textarea" onChange={changed} />
                        </div>

                        <div className="form-post__inputs">
                            <label htmlFor="file" className="form-post__label">Sube tu foto</label>
                            <input type="file" name="file0" id="file" className="form-post__image" />
                        </div>

                        <input type="submit" value="Enviar" className="form-post__btn-submit" />

                    </form>

                </div>

            </div>

        </aside>
		);
}