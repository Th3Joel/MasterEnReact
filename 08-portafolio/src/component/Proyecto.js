import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { trabajos } from '../data/trabajos';

export const Proyecto = () => {
    const params = useParams();
    const [proyecto,setProyecto] = useState({});

    useEffect(()=>{
        let proyectoj = trabajos.filter(trj => trj.id === params.id);
        setProyecto(proyectoj[0]);
    },[]);

  return (
    <div className='page page-work'>
        <div className='mask'>
            <img src={"/imajes/"+proyecto.id+".png"}/>
        </div>
        <h1 className='heading'>{proyecto.nombre}</h1>
        <p>{proyecto.tecnologias}</p>
        <p>{proyecto.descripcion}</p>
        <a href={"https://"+proyecto.url} target='_blank'>Ir al proyecto</a>
    </div>
  )
}
