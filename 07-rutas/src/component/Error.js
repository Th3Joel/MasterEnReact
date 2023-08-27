import React from 'react'
import { Link } from 'react-router-dom'

export const Error = () => {
  return (
    <div>
        <h1>Error 404</h1>
        <p>Esta pajina no existe</p>
        {/**Hacr un enlace suelto a otra parte del componente
         * es decir sin un menu de navegacion
         */}
        <Link to="inicio">Volver al inicio</Link>
    </div>
  )
}
