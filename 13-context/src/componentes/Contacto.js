import React, { useContext, useState } from 'react'
import { PruebaContext } from '../contexto/PruebaContext';

const Contacto = () => {

  
  const datoDelContexto = useContext(PruebaContext);

  console.log(datoDelContexto);
  return (
    <div>
      <h1>Contacto</h1>
      <p>Página de contacto</p>
      
      {/*<p>Valor compartido: <strong>{datoDelContexto.contenido}</strong></p>*/}
    </div>
  )
}

export default Contacto