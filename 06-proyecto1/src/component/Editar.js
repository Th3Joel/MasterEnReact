import React from 'react'


export const Editar = ({peli,conseguirPelis,setEditar,setListadoState}) => {
    const tituloComponente = "Editar película";

    const guardarEdicion = (e,id) => {
        e.preventDefault();
        //Conseguir el target del evento
        let target = e.target;
        /**Buscar el indice del objeto de la pelicula a actualizar */
        const pelis_amacen = conseguirPelis();
        //Encuentra el indicce en base a una condicion
        //la cual es si es igual al id
        const indice = pelis_amacen.findIndex(peli => peli.id === id);

        /**Crear objeto con ese id de ese indice, con titulo
         * y descripcion del formulario
         */

        let peli_Up = {
            id,
            titulo:target.titulo.value,
            descripcion:target.descripcion.value
        };
        //Actualizar el elemento con ese indice
        pelis_amacen[indice] = peli_Up;

        //Guaradr el nuevo array objeto en el localStorage
        localStorage.setItem('pelis',JSON.stringify(pelis_amacen));
        //Actualizar estados
        setListadoState(pelis_amacen);
        setEditar(0);
    }

  return (
    <div className='edit_form'><hr/>
        <h3 className='title'>{tituloComponente}</h3>
        <form onSubmit={e => guardarEdicion(e,peli.id)}>
            <input 
                type='text'
                name='titulo'
                className='titulo_editado'
                defaultValue={peli.titulo}
            />
            <textarea 
                name='descripcion'
                defaultValue={peli.descripcion}
                className='descripcion_editado'
            />
            <input 
                type='submit'
                className='editar'
                value='Actualizar'
            />
        </form>
    </div>
  )
}
