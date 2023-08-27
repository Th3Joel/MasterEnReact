import React, { useId } from 'react'

export const MiComponente = () => {
    let id = useId();
    let segundoid = useId();
    //alert(id+" "+segundoid);
  return (
    <div>
        
        {/**sirve para crear un identificador unico, que nos sirva
         * tanto para el cliente como para el servidor
         */}
        <h1>Use Id</h1>
        <input id={id} name='nombre' placeholder='Nombre'/>
    </div>
  )
}
