import React from 'react'

export const SegundoComponente = () => {
    const libros = ["harry Potter","Game of tronos","Clean Code"]
    //const libros = [];
    return (
    <div className='segundo-componente'>
        <h2>Listado de libros</h2>
        {/* Este es el tipo de if que se utiliza */}
        {libros.length >= 1 ? /* si se cumple */
            (<ul>
                    { /*Si se cumple su condicion
                        Map se utiliza para iterar (valor,clave)*/
                        libros.map((libro,indice) => {
                            return <li key={indice}>{libro}</li>
                        })
                    }
            </ul>)/* si no se cumple */
            : (<p>No hay libros</p>)
        }
    </div>
  )
}
