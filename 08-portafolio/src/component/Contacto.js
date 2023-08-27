import React from 'react'

export const Contacto = () => {
  return (
    <div  className='page'>
        <h1 className='heading'>Contacto</h1>
        <form className='contact' action='mailto:@j031fran@gmail.com'>
          <input 
            type='text'
            placeholder='Nombre'
          />

          <input
            type='text'
            placeholder='Apellidos'
          />

          <input
            type='email'
            placeholder='Correo'
          />

          <textarea 
            placeholder='Motivo del contacto'
          />

          <input 
            type='submit'
            value='Enviar'
          />
        </form>
    </div>
  )
}
