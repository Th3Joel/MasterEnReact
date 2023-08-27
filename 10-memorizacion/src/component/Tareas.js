import React, { useMemo, useState } from 'react'

const Tareas = () => {

    const [tareas,setTareas] = useState([]);
    const [contador,setContador] = useState(1000);

    const guardarTareas = e =>{
        e.preventDefault();

        let tarea_up = [...tareas, e.target.descripcion.value];

        setTareas(tarea_up);
        console.log(tareas);
    }

    const borrarTarea = id =>{
        //Filtrar las tareas pera borrar lod que no quiero
        let nuevas_tareas = tareas.filter((tarea,indice) => indice !== id);
        //console.log(nuevas_tareas);

        //setState, guardar el nuevo listado de tareas en el estado
        setTareas(nuevas_tareas);
    }

    const sumarContador = () => {
        setContador(contador+1);
    }

    const contadoresPasados = (acumulacion) =>{
        for(let i=0; i <= acumulacion; i++){
            console.log("Ejecutando acumuacion de contadores pasados....");
        }
        return `Contador manual de tareas: ${contador}`;
    }

        //Esto solo se va a ejecutar cuando se actualize el contador

        /**El use memo siver para memorizar algo que se ejecute
         * varias veces en la aplicacion, esto solo sucede cuando
         * cambia el algo que tiene y no cuando se renderize la aplicacion
         * evitando que se ajecute el mismo varias veces
         * Para evitar cargas de rendimiento
         */
        
    const memoContadores = useMemo(() => {
        return contadoresPasados(contador);
    },[contador]);
  return (
    <div className='tareas-container'>
        <h1>Mis Tareas</h1>

        <form  onSubmit={guardarTareas}>
            <input 
                type='text'
                name='descripcion'
                placeholder='Descrive la tarea'
            />
            <input 
                type='submit'
                value='Guardar'
            />
        </form>
                <h3>{memoContadores}</h3>
        <br/>
             <button onClick={sumarContador}>Sumar</button>
        
        <h3>Lista de tareas</h3>
        <ul>
            {
                tareas.map((task,i) => (
                    <li key={i}>
                        {task} 
                        &nbsp;
                        <button onClick={() => borrarTarea(i)}>X</button>
                    </li>
                    
                ))
            }
        </ul>
        
    </div>
  )
}

export default Tareas