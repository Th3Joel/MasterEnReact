import React from 'react';
import {Outlet,Navigate} from 'react-router-dom';
import {Header} from './Header';
import {Sidebar} from './Sidebar';

import useAuth from '../../../hooks/useAuth';

export const PrivateLayout = () => {
	const {auth,loading} = useAuth();

	//Si loading da true que diga cargando
	if (loading) {
		return <h1>Cargando......</h1>
	}

	return (
			<>
			{/* Layout */}
			
       			 <Header />
    	 	

			{/* Contenido principal */}

			<section className="layout__content">
				{/*Aqui se carga el contenido dentro del componente
						si auth.id existe que muestre la parte privada si no el login
				*/}
			{auth._id ?
        		<Outlet />
        		:
        		<Navigate to="/login"/>
			}
				
      		</section>

      		{/* Barra lateral */}

      		<Sidebar/>
			</>
		);
}