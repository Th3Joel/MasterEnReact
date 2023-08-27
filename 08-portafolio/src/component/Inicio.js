import React from 'react'
import { Link } from 'react-router-dom'
import { ListadoTrabajos } from './ListadoTrabajos'
import 'animate.css';

export const Inicio = () => {
  return (
    <div className='home animate__animated animate__lightSpeedInLeft'>
      <h1 className='bg-primary'>
        Hola, soy <strong>Joel Urbina</strong> y soy Desarrollador Web en Nicaragua,
        y ofrezco mis servicios de <strong>programacion</strong> y <strong>desarrollo</strong> en todo
        tipo de proyectos web.
      </h1>
      <h2 className='title'>
        Te ayudo a crear tu sitio o aplicacion web, tener más
        visibilidad y relevancia en internet. <Link to="/contacto">Contacta conmigo.</Link>
      </h2>
      <section className='last-works'>
        <h2 className='heading'>Algunos de mis proyectos</h2>
        <p>Estos son algunos de mis trabajos de desarrolo web</p>

        <ListadoTrabajos limite="2"/>
      </section>
    </div>
  )
}
