import React, { useContext } from 'react'
import { PruebaContext } from '../contexto/PruebaContext';

const Login = () => {

  const {setUsuario} = useContext(PruebaContext);
  const guardarDatos = e =>{
    e.preventDefault();

    let usuarioNew = {
      nick:e.target.nick.value,
      nombre:e.target.nombre.value,
      web:e.target.web.value
    }
    //console.log(usuario);

    setUsuario(usuarioNew);
  }
  return (
    <div>
      <h1>Identifícate</h1>
      <p>Página de login</p>

      <form className='login' onSubmit={guardarDatos}>
        <input
           type='text'
           name='nick'
           placeholder='Nickname:'
        />

        <input
          type="text"
          name='nombre'
          placeholder='Nombre:'
        />
        <input  
          type='text'
          name='web'
          placeholder='Web:'
        />

        <input
          type='submit'
          value="Enivar"
        />
      </form>
    </div>
  )
}

export default Login