import React from 'react'

export const Servicios = () => {
  return (
    <div className='page'>
      <h1 className='heading'>Servicios</h1>

      <section className='services'>
        <article className='service'>
            <h2>Diseño web</h2>
            <p>Hago que tu web se vea mas bonita</p>
        </article>

        <article className='service'>
          <h2>Desarrollo web</h2>
          <p>Creo tu pajina web desde cero</p>
        </article>
        <article className='service'>
          <h2>Posicionamiento web</h2>
          <p>Hago que tu web aparezca en Google y al vea las personas</p>
        </article>
      </section>
    </div>
  )
}
