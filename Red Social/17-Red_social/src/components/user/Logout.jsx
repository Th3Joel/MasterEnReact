import React,{useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useAuth from '../../hooks/useAuth';


export const Logout = () =>{
	const {setAuth,setContadores} = useAuth();
	const navigate = useNavigate();

	useEffect(()=>{
		//Vaciar el localStorage
		localStorage.clear();
		//Setear estados globales o Vaciar
		setAuth({});
		setContadores({});
		//navigate (redireccion) al login
		navigate("/login");
	});

	return (<h1>Cerrando session.....</h1>);
}