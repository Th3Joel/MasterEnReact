import React, { useState } from 'react'

export const Buscador = ({listadoState,setListadoState}) => {

    const [busqueda,setBusqueda] = useState('');
    const [noEncontrado,setNoEncontrado] = useState(false);

  const buscarPeli = (e) => {
    //Crear estado y actualizado
    setBusqueda(e.target.value);
    //Filtrar para buscar coincidencias

    /**Si el elemento que estamos recorriendo en este momento
     * si incluye lo que estamos buscando que es el stado busqueda
     * entonces esa peli está encontrada y se filtraria en el
     * array nuevo creado
     */
    let PelisEncontradas = listadoState.filter(peli => {
      return peli.titulo.toLowerCase().includes(busqueda.toLocaleLowerCase())
    });

    //Si se ingresa es una palabra que contenga una letra o nada
    //me filtra todas las peliculas
    if(busqueda.length <= 1 || PelisEncontradas <= 0){
      PelisEncontradas = JSON.parse(localStorage.getItem('pelis'));
      setNoEncontrado(true);
    }else{
      setNoEncontrado(false);
    }
   

      
    //Actualizar estado del listado principal con lo que he logrado
    //filtrar

    setListadoState(PelisEncontradas);
  }
  return (
    <>
        <div className="search">
          <h3 className="title">Buscador: {busqueda}</h3>
          {
            (noEncontrado == true && busqueda.length > 1) &&(
            <span className='noEncontrado'>No se ha encontrado ninguna coincidencia</span>
            )
          }
         <form>
            <input 
              type="text" 
              name="busqueda" 
              id="search_field"
              autoComplete='off'
              onChange={buscarPeli}
            />
              <button>Buscar</button>
          </form>
        </div>
    </>
  )
}
