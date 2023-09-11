import React,{useState} from 'react';
import {useForm} from '../../hooks/useForm';
import {global} from '../../helpers/global';


export const Registro = () =>{
	const {form,changed} = useForm({});
	const [saved,setSaved] = useState();

	const saveUser = async(e) =>  {
		e.preventDefault();

		//Reccoger datos del formulario
		let newUser = form;
		//Enviar
		const request = await fetch(global.url + "user/registro",{
			method:'POST',
			body:JSON.stringify(newUser),
			headers:{
				"Content-Type":"application/json"
			}
		});

		const data = await request.json();
			if (data.mensaje === "Usuario registrado correctamente") {
				setSaved(1);
			}else if (data.mensaje === "El usuario ya existe") {
				setSaved(data.mensaje);
			}

	}


	return (
			<>
			<header className="content__header">
                <h1 className="content__title">Registro</h1>
            </header>

            <div className="content__posts">
            {saved == "1" ?
            <strong className="alert alert-success">Usuario registrado</strong>
        	: ""}
        	{saved == "El usuario ya existe" ?
            <strong className="alert alert-danger">{saved}</strong>
            : ""}
            	<form className="register-form" onSubmit={saveUser}>
            		<div className="form-group">
            			<label htmlFor="name">Nombre</label>
            			<input
            				type="text"
            				name="name"
            				onChange={changed}
            			/>
            		</div>
            		<div className="form-group">
            			<label htmlFor="surname">Apellido</label>
            			<input
            				type="text"
            				name="surname"
            				onChange={changed}
            			/>
            		</div>
            		<div className="form-group">
            			<label htmlFor="nick">Nick Name</label>
            			<input
            				type="text"
            				name="nick"
            				onChange={changed}
            			/>
            		</div>
            		<div className="form-group">
            			<label htmlFor="email">Correo electrónico</label>
            			<input
            				type="email"
            				name="email"
            				onChange={changed}
            			/>
            		</div>
            		<div className="form-group">
            			<label htmlFor="password">Contraseña</label>
            			<input
            				type="password"
            				name="password"
            				onChange={changed}
            			/>
            		</div>
            		<input
            			type="submit"
            			value="Resgístrate"
            			className='btn btn-success'
            			/>
            	</form>
            </div>
			</>
		);
}