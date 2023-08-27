import React from 'react'
import { Outlet,NavLink } from 'react-router-dom'

export const PanelControl = () => {
  return (
    <div>
        <h1>Panel de Control</h1>
        <p>Elige una de estas opciones (Subrutas)</p>
        <nav>
            <ul>
                <li>
                    <NavLink to='/panel/inicio'>Inicio</NavLink>
                </li>
                <li>
                    <NavLink to='/panel/crear-articulos'>Crear Artículos</NavLink>
                </li>
                <li>
                    <NavLink to='/panel/gestion-usuarios'>Gestión de usuarios</NavLink>
                </li>
                <li>
                    <NavLink to='/panel/acerca-de'>Acerca de</NavLink>
                </li>
            </ul>
        </nav>
        <div>
            {/**Quiero cargar los componentes de las subrutas o rutas anidadas 
             * Esto se nesesita para cargar los componentes de las rutas el <Outlet />
            */}

            <Outlet />
        </div>
    </div>
  )
}
