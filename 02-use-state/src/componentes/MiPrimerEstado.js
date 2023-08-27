import React,{useState} from 'react'

export const MiPrimerEstado = () => {
    /*
    //Problema solucionar
    let nombre = "Joel";
    const cambiarNombre = e =>{
        nombre = "Paquito Fernandez";
    }
    */

        const [nombre, setNombre] = useState("Joel Urbina");
    const cambiarNombre = (e,nombreFijo) =>{
        setNombre(nombreFijo);
    }

    /**
     * El use state es para que cuando se cambie un valor
     * de alguna variable
     * se actualize el contenido don la estas mostrando
     */
  return (
    <div>
        <h3>Componente: MiPrimerEstado</h3>
        <strong className='label'>
            {nombre}
        </strong>
        &nbsp;

        <button onClick={e => cambiarNombre(e,"Frank")}>Cambiar nombre por frank</button>
        
        <input type='text' onChange={e => cambiarNombre(e,e.target.value)} placeholder='cambiar el nombre'/>
    </div>
  )
}
