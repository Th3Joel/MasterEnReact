import React, { useCallback, useEffect, useRef, useState } from 'react';
import Empleados from './Empleados';



export const Gestion = () => {

    const [nombre,setNombre] = useState("");
    const [pagina,setPagina] = useState(1);
   
   

    const asignarGestor = e => {
    setNombre(e.target.value);
}


    useEffect(()=>{
        console.log("Renderizado de Gestion");
    },[nombre,pagina]);

    //UseCallback //Este es para memoriza metodos  funciones
    //Y el useMemo para propiedades de componentes y componentes
    //Esto se ejecuta varias veces solo si cambia el estado pagina
    const mostrarMensaje = useCallback(() =>{
        console.log("Hola soy un mensaje desde el componente Empleados");
    },[pagina])

  return (
    <div>
        <p>Mostrado la pagina: {pagina}</p>
        <h1>Nombre del gestor: {nombre}</h1>

        <input type='text' onChange={asignarGestor}
        placeholder='Introducir nombre de gestor'/>

        <h2>LIstado de empledos:</h2>
        <p>Los usuarios son gestionados por: {nombre} vienen de jsonPlaceHolder....</p>
            <button onClick={() => setPagina(1)}>Pagina 1</button>
            <button onClick={() => setPagina(2)}>Pajina 2</button>
        <Empleados pagina={pagina} mensaje={mostrarMensaje}/>
    </div>
  )
}
