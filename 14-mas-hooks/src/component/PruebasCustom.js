import React, { useState } from 'react'
import { useMayus } from '../hooks/useMayus'

export const PruebasCustom = () => {
  
    const {estado,mayusculas, minusculas, concat} = useMayus("Joel Calderon");
 //Esto es un hook creado y perzonalizado
    /*console.log(mayusculas());
    console.log(minusculas());
    console.log(concat("Urbina"));*/
  return (
    <div>
        <h1>Probando componentes perzonalizados</h1>
        <h1>{estado}</h1>
        <button onClick={mayusculas}>Poner en mayusculas</button>
        <button onClick={minusculas}>Poner en minusculas</button>
        <button onClick={e => concat("- Probando hooks perzonalisados")}>Concatenar</button>
        
    </div>
  )
}
