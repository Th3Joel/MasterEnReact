import React, { useState } from 'react'
import { useForm } from '../hooks/useForm'

export const MiFormulario = () => {
//Hook perzonalizado
   const {formulario,cambiado,enviado} = useForm({});
  return (
    <div>
        <h1>Formulario</h1>
        <p>Formulario para guardar un curso</p>
        <p>Curso guardado: {formulario.titulo}</p>

        <pre className='codigo'>{JSON.stringify(formulario)}</pre>
        <form onSubmit={enviado} className='MiFormulario'>
            <input
                type='text'
                placeholder='Titulo'
                name='titulo'
                onChange={cambiado}
                />

            <input 
                type='number'
                name='anio'
                placeholder='Año de publicacion:'
                onChange={cambiado}
                />
            <textarea
                name='descripcion'
                placeholder='Descripcion:'
                onChange={cambiado}
                />
            <input
                type='text'
                name='autor'
                placeholder='Autor:'
                onChange={cambiado}
                />
            <input
                type='email'
                name='email'
                placeholder='Correo de contacto'
                onChange={cambiado}
                />
            <input
                type='submit'
                value='Enviar'
                />
        </form>
    </div>
  )
}
