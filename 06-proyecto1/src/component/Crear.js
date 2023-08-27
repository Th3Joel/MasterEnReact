import React, { useState } from 'react';
//Archivo del helper
import { GuardarEnStorage } from '../helper/GuardarEnStorage';

export const Crear = ({setListadoState}) => {

  const [peliState,setPeliState] = useState({
    titulo:'',
    descripcion:''
  });

  const tituloComponente = "Añadir película";

  //Deseptructuracionn de datos
  const {titulo,descripcion} = peliState;
  const conseguirDatosForm = e=>{
    e.preventDefault();

    //Conseguir datos del formulario
    let target =  e.target;
    let titulo = target.titulo.value;
    let descripcion = target.descripcion.value;

    //Crear objeto de la peicula a guardar
    let peli = {
      id: new Date().getTime(),
      titulo,
      descripcion
    }

    //Guardar estado para mirar cambios en el stado y en la web
    setPeliState(peli);

    //Actualiza el estado del listado principal

    setListadoState(elementos => {
      //Una copia de los elementos que ya aya
      // mas el nuevo elemento
      return [...elementos,peli]
    });

    //Metodo de alamacenamiento local
      GuardarEnStorage("pelis",peli);

    
  }


  return (
    <>
      <div className="add">
        <h3 className="title">
          {tituloComponente}
        </h3>
        <strong>
        {
          //Codicion si titulo y descripcion existe entonces
          //Muestrame el titulo
          titulo && descripcion && "Has creado la pelicula: "+titulo
        }
        </strong>
        <form onSubmit={conseguirDatosForm}>
          <input
            type="text"
            name="titulo"
            placeholder="Título" 
            id="titulo" />

          <textarea 
          id='descripcion'
          name='descripcion'
          placeholder="Descripción"
          ></textarea>

          <input 
          type="submit" 
          value="Guardar" />
        </form>
      </div>
    </>
  )
}
