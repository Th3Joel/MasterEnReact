import React,{createContext,useState,useEffect} from 'react';
import {global} from '../helpers/global';

//Se crea el contexto para obtener datos globales
const AuthContext = createContext();

export const AuthProvider = ({children}) =>{//Se le pasa el componente hijo
	const [auth,setAuth] = useState({});
	const [contadores,setContadores] = useState({});
	const [loading,setLoading] = useState(true);

	useEffect(()=>{
		authUser();
	},[]);

	//Va hacer peticciones ajaz para comprobar las credenciales del usuario

	const authUser = async() =>{
		//Sacar datos del usuario identificado en el localStorge
			const token = localStorage.getItem("token");
			const user = localStorage.getItem("user");
		//Comprobar si tengo el token y el user

			if (!token || !user) {
				setLoading(false);
				return false;
			}

		//Transformar los datos a un objeto de javascript
			const userObj = JSON.parse(user);
			const userId = userObj.id;
		//Peticion ajax al backend que compruebe el token y
		//que me devuelva todos los datos del usuario
			const request = await fetch(global.url+"user/profile/"+userId,{
				method:"GET",
				headers:{
					"Content-Type":"application/json",
					"Authorization":token
				}
			});
			const data = await request.json();

			//Peticion para los contadores

			const requestCounter = await fetch(global.url+"user/contadores/"+userId,{
				method:"GET",
				headers:{
					"Content-Type":"application/json",
					"Authorization":token
				}
			});
			const dataCounter = await requestCounter.json();

			setContadores(dataCounter);

		//Setear el estado de auth
			setAuth(data.user);

			setLoading(false);

	}



	return (
			<AuthContext.Provider value={{
				auth,
				setAuth,
				contadores,
				setContadores,
				loading
			}}>
			{/*Se carga el AuthContext.Provider*/}
				{children}
			</AuthContext.Provider>
		);
}

export default AuthContext;