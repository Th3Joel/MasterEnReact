import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const Persona = () => {
    //const parametrosURL = useParams();
    //console.log(parametrosURL);

    //Utilizar la deseptructuracion de objetos
    //Es cuando se especifica la clave de un objeto dentro de {nombre}
    //Para usar es variable y evitar esto: parametroURL.nombre

    //Se le puede asignar un valor por defecto nombre = "algo"
    //Valores por defectos en parametros opcionales
    //let {nombre="Nombre: no viene", apellido="Apellido: no viene"} = useParams();

    /*
    //Asignar datos a los parametros en caso de que no vengan de una url

    if(!nombre){
        nombre = "Nombre";
    }
    if(!apellido){
        apellido = "Apellido";
    }
    */

    const {nombre,apellido} = useParams();
    const navegar = useNavigate();
    const enviar = e => {
        e.preventDefault();

        let nombre = e.target.nombre.value;
        let apellido = e.target.apellido.value;
        let url = `/persona/${nombre}/${apellido}`;

            //SI viene vacio del formulario

        if(nombre.length <= 0 && apellido.length <= 0){
            navegar("/inicio");
        }else if(nombre === "contacto"){
            navegar("/contacto");
        }
        else{
            navegar(url);
        }
  
    };
  return (
    <div>
        {!nombre && <h1>No hay ningun dato de persona pasado por la url</h1>}
        {nombre && <h1>Persona: {nombre} {apellido}</h1>}
       
        <p>Esta es la pajina de Persona</p>

        <form onSubmit={enviar}>
            <input 
            type='text'
            name='nombre'
            />

            <input
                type='text'
                name='apellido'
            />

            <input 
            type='submit'
            name='enviar'
            value='Enviar'
            />
        </form>
    </div>
  )
}
