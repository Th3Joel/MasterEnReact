import React from 'react';
import {Outlet,Navigate} from 'react-router-dom';
import {Header} from './Header';
import useAuth from '../../../hooks/useAuth'

export const PublicLayout = () => {
	//Controlar el acceso de identificacion
	const {auth,loading} = useAuth();
	if (loading) {
		return <h1>Cargando.......</h1>;
	}
	return (
			<>
			{/* Layout */}
			
       			 <Header />
    	 	

			{/* Contenido principal */}

			<section className="layout__content">

				{/*Aqui se carga el contenido dentro del componente
						Si no existiera auth.id mostrar la parte publica,
						si si existe que haga un navgate to a la parte privada
				*/}
			{!auth._id ?
        		<Outlet />
        		: 
        		<Navigate to="/social" />
			}
				
      		</section>
			</>
		);
}