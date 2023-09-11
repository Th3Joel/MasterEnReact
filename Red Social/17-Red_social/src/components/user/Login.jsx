import React,{useState} from 'react';
import {useForm} from '../../hooks/useForm';
import {global} from '../../helpers/global';

import useAuth from '../../hooks/useAuth';

export const Login = () => {
	const {form,changed} = useForm({});
	const [saved,setSaved] = useState();

	//Auth para setear el nuevo login
	const {setAuth} = useAuth();

	const loginUser = async(e) => {
		e.preventDefault();
		//Datos del formulario
		let userToLogin = form;

		//Peticion al backend

		const request = await fetch(global.url+"user/login",{
			method:'POST',
			body:JSON.stringify(userToLogin),
			headers: {
				'Content-Type':'application/json'
			}
		});

		const data = await request.json();

		

		if (data.status == "succes") {
			//Persistir los datos en el navegador
			localStorage.setItem("token",data.token);
			localStorage.setItem("user",JSON.stringify(data.user));

			setSaved(1);

			//Setear datos en el auth
				setAuth(data.user);
			//Redireccion
				setTimeout(function(){
					window.location.reload();
				},2000);
		}else if (data.status == "error") {
			setSaved(0);
		}

		

	}

	return (
			<>
			<header className="content__header">
                <h1 className="content__title">Login</h1>
            </header>

            <div className="content__posts" onSubmit={loginUser}>
            {saved == 1 ?
          	  <strong className="alert alert-success">Usuario identificcado</strong>
        	: ""}
        	{saved == 0 ?
           		<strong className="alert alert-danger">Credenciales erroneos</strong>
            : ""}
            	<form className="form-login">
            		<div className="form-group">
            			<label htmlFor="email">Correo</label>
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
            			value="Identificate"
            			className="btn btn-success"
            		/>
            	</form>
            </div>
			</>
		);
}