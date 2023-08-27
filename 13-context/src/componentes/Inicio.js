import React, { useContext } from 'react'
import { PruebaContext } from '../contexto/PruebaContext';

const Inicio = () => {

  const {usuario} = useContext(PruebaContext);
  //console.log(compartida);
  return (
    <div>
      <h1>Inicio</h1>
      <p>Página de inicio</p>
      <p>Nombre: {usuario.nombre} {usuario.web}</p>
      {/*<p>Valor compartido: <strong>{compartida.titulo}</strong></p>*/}
    </div>
  )
}

export default Inicio