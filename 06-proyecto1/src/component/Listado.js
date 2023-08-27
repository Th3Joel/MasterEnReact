import React, { useEffect, useState } from 'react'
import { Editar } from './Editar';

export const Listado = ({listadoState, setListadoState}) => {

 // const [listadoState,setListadoState] = useState([]);
  const [editar,setEditar] = useState(0);

  useEffect(() => {
    console.log("Componente cargado de peliculas");
    conseguirPelis();
  }, []);

  const conseguirPelis = () =>{
    let peli = JSON.parse(localStorage.getItem('pelis'));
    setListadoState(peli);
    //console.log(peli);
    return peli;
  }

  const borrarPeli = (id) => {
     //Conseguir peliculas almacenadas
      let pelis_alamcenadas = conseguirPelis();
     //Filtrar esas peliculas para que elimine del array
      let nuevo_array = pelis_alamcenadas.filter(peli => peli.id !== parseInt(id));
     
      console.log("Pelis almacenadas: ");
      console.log(pelis_alamcenadas);
      console.log("Nuevo array: ");
      console.log(nuevo_array);
      //Actualizar estado del listado
        setListadoState(nuevo_array);
     //Actualizar los datos en el localStorage
     localStorage.setItem('pelis',JSON.stringify(nuevo_array));
  }


  return (
    <>
    {
      listadoState != null ? 
        listadoState.map(pel => {
          return(
            <article className="peli-item" key={pel.id}>
              <h3 className="title">
                {pel.titulo}
              </h3>
                
                <p className="description">
                  {pel.descripcion}
                </p>

                <button 
                className="edit"
                onClick={() => {
                  setEditar(pel.id)
                }}
                >Editar</button>

                <button 
                className="delete"
                 onClick={() => borrarPeli(pel.id)}
                 >Borrar</button>
              
              {/**Aparece un formulario editar
               * Si tiene el mismo id del estado
               */}

                {editar === pel.id && (
                  <Editar 
                  peli={pel}
                  conseguirPelis={conseguirPelis}
                  setEditar={setEditar}
                  setListadoState={setListadoState}
                  />//Se carga el componente
                )}

            </article>
          )
        })
      : <h1>No hay películas</h1>
    }
    </>
  )
}
