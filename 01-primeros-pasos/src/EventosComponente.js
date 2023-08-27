import React from 'react'

export const EventosComponente = () => {

    //Funcion anonoma para dar click
    const hasDadoClick = (e,nombre) =>{
        alert("Has dado click al boton !! "+nombre);
    }

    function HasDadoDobleClick(e){
        alert("Has dado doble click !!");
    }
    
     const hasEntrado = (e, accion) => {
        //alert('Has '+accion+' a las caja con el mouse!!');   
        console.log('Has '+accion+' a las caja con el mouse!!');
     }

     const estasDentro = e => {
        //alert("Estas dentro del input, introduce tu nombre");
        console.log("Esta dentro del input");
     }

     const estasFuera = e =>{
        alert("Estas fuera del input");
     }

  return (
    <div>
        <h1>Eventos en react</h1>
        <p>
            {/** Evento click */}
             <button onClick={ e => hasDadoClick(e, "Joel")}>Dame click</button>
        </p>
        <p>
            {/**Evento doble click */}
            <button onDoubleClick={HasDadoDobleClick}>Dame click doble</button>
        </p>
       
       <div id='caja' 
                onMouseEnter={e => hasEntrado(e, "entrado")}
                onMouseLeave={e => hasEntrado(e,"salido")}>
            {/**Evento onMouseEnter onMouseLeave */}
            Pasa el mouse
       </div>
       <p>
        {/**On focus es cuando esta dentro de un input
         * y on blur cuando se sale
         */}
        <input type='text' 
        onFocus={estasDentro} 
        onBlur={estasFuera}
        placeholder='Introduce tu nombre' />
       </p>
    </div>
  )
}
