import React, { useState } from 'react';

export const FormularioComponent = () => {
    const [usuario,setUsuario] = useState({});
    const conseguirDatosForm = e =>{
        e.preventDefault();

        let datos = e.target;
        //Obtiene el valor del input text con el evento
        //console.log(datos.nombre.value);
        let usuario = {
            nombre:datos.nombre.value,
            apellido:datos.apellido.value,
            genero:datos.genero.value,
            bio:datos.bio.value,
            enviar:datos.enviar.value
        }
        //Se agrega enviar para que solo
        //Se muestre el contenido al darle click
        //al boton
        console.log(usuario);
         setUsuario(usuario);
    }

   const cambiarDatos = e =>{
        let name_input = e.target.name;
        let usuario_modificar = usuario;
        //usuario_modificar[name_input] = e.target.value;

        //Actualizar un estado que 
        //es un objeto con varias propiedades.
        
            //Se pone entre parentesis para que se
            //aga un return automatico
        setUsuario(estado_previo => ({
             
                //Capturar el estado previo
                //Los tres puntos tieene que ver con los 
                //pararmetros anteriores
                //Una especio de lo clonado de lo anterior
                ...estado_previo,
                //Despues se sobreeescribe la propiedad utilizada
                [name_input]: e.target.value
            
        }));
    }
  return (
    <div>
        <h1>Formularios con React</h1>
        {
            usuario.enviar &&
            (<div className='info_usuario label label-gray'>
                {usuario.nombre} {usuario.apellido} es un {usuario.genero} y su Biografía es esta: <p>{usuario.bio}</p>
            </div>)
        }
        
        <form onSubmit={conseguirDatosForm}>
            <input 
            type='text' 
            name='nombre' 
            placeholder='Nombre'
            onChange={cambiarDatos}/>

            <input 
            type='text' 
            onChange={cambiarDatos} 
            name='apellido' placeholder='Apellido' />

            <select 
            name='genero' 
            onChange={cambiarDatos}>
                <option value='hombre'>Hombre</option>
                <option value='mujer'>Mujer</option>
            </select>

            <textarea 
            onChange={cambiarDatos} 
            placeholder='Biografía'
             name='bio'>
            </textarea>

            <input type='submit' value='enviar' name='enviar'/>
        </form>
    </div>
  )
}
