import React,{useState} from 'react'
import useAuth from '../../hooks/useAuth'
import {global} from '../../helpers/global';
import avatar from '../../assets/img/user.png';
import {SerializeForm} from '../../helpers/SerializeForm';

export const Config = () => {
	const {auth, setAuth} = useAuth();
	const [saved, setSaved] = useState("not_saved");
	const updateUser = async(e) =>{
		e.preventDefault();
		//console.log(auth)
		//Recoger datos del formulario
		let newDataUser = SerializeForm(e.target);
		//Borrar propiedad innecesaria
		delete newDataUser.file0;
		//Actuaizar usuario en la base de datos
		let request = await fetch(global.url+"user/update",{
			method:"PUT",
			body: JSON.stringify(newDataUser),
			headers: {
				"Content-Type":"application/json",
				"Authorization":localStorage.getItem("token")
			}
		});

		let data = await request.json();
		if(data.status == "success" && data.user){
			delete data.user.password;
			setAuth(data.user);
			setSaved(1);
		}else{
			setSaved(0);
		}
		setTimeout(function(){
			setSaved(2345);
		},2000);
		//console.log(data);
		//Subbida de imagen
		let fileInput = document.querySelector("#file");
		if (data.status == "success" && fileInput.files[0]) {
			//Reccoger imagenn
			let formData = new FormData();
			formData.append("file0",fileInput.files[0]);

			//Peticion ajax

			let uploadRe = await fetch(global.url+"user/upload",{
				method:"POST",
				body:formData,
				headers:{
					"Authorization":localStorage.getItem("token")
				}
			});

			let uploadDa = await uploadRe.json();

			console.log(uploadDa);

			if (uploadDa.status == "success" && uploadDa.user) {
				delete uploadDa.user.password;
				setAuth(uploadDa.user);
				setSaved(1);
			}
		}

	}
	return (
				<>
					<header className="content__header">
	               		 <h1 className="content__title">Configuración</h1>
	            	</header>

	            	<div className="content__posts">
			            		
		            {saved == 1 ?
		            <strong className="alert alert-success">Usuario actualizado</strong>
		        	: ""}
		        	{saved == 0 ?
		            <strong className="alert alert-danger">Ha ocurrido un error</strong>
		            : ""}
		            	<form className="config-form" onSubmit={updateUser}>
		            		<div className="form-group">
		            			<label htmlFor="name">Nombre</label>
		            			<input
		            				type="text"
		            				name="name"
		            				defaultValue={auth.name}
		            			/>
		            		</div>
		            		<div className="form-group">
		            			<label htmlFor="surname">Apellido</label>
		            			<input
		            				type="text"
		            				name="surname"
		            				defaultValue={auth.surname}
		            			/>
		            		</div>
		            		<div className="form-group">
		            			<label htmlFor="nick">Nick Name</label>
		            			<input
		            				type="text"
		            				name="nick"
		            				defaultValue={auth.nick}
		            			/>
		            		</div>
		            		<div className="form-group">
		            			<label htmlFor="bio">Biografía</label>
		            			<textarea
		            				name="bio"
		            				defaultValue={auth.bio}
		            			/>
		            		</div>
		            		<div className="form-group">
		            			<label htmlFor="email">Correo electrónico</label>
		            			<input
		            				type="email"
		            				name="email"
		            				defaultValue={auth.email}
		            			/>
		            		</div>
		            		<div className="form-group">
		            			<label htmlFor="password">Contraseña</label>
		            			<input
		            				type="password"
		            				name="password"
		            			/>
		            		</div>
		            		<div className="form-group">
		            			<label htmlFor="file0">Avatar</label>
		            			<div className="general-info__container-avatar">
                            {auth.imagen != "default.png" && 
                                <img src={global.url + "user/avatar/"+auth.imagen} className="container-avatar__img" alt="Foto de perfil"/>
                            }

                            {auth.imagen == "default.png" && 
                                <img src={avatar} className="container-avatar__img" alt="Foto de perfil"/>
                            }
                        </div><br/>
		            			<div className="avatar">
		            				<input
		            					type="file"
		            					name="file0"
		            					id="file"
		            				/>
		            			</div>
		            		</div><br/>
		            		<input
		            			type="submit"
		            			value="Resgístrate"
		            			className='btn btn-success'
		            			/>
		            	</form>
		            </div>
	            	<br/>
				</>
			);
}