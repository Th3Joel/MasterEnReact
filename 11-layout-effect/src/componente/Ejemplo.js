import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

const Ejemplo = () => {
    /**El use effect se ejecuta despues de cargar
     * todo el componente y el useLayout antes
     * de que se ejecute el componente
     */

    const [mostrar,setMostrar] = useState(false);
    const caja = useRef();
    const boton = useRef();

    useLayoutEffect(()=>{
        console.log("UseLayoutEffect: Componente cargado");
    },[]);

    useEffect(()=>{
        console.log("UseEffect: Componente cargado !!");
        console.log(boton.current.innerHTML);
        if(caja.current == null){
            return;
        }

        const {bottom} = boton.current.getBoundingClientRect();
        /**Sumandole al boton 45 px */
        setTimeout(()=>{
            caja.current.style.Top = `${bottom + 45}px`
             caja.current.style.left = `${bottom + 45}px`

        },1000);
        
    },[mostrar]);
  return (
    <div>
        <h1>Ejemplo useEffect y useLayoutEffect</h1>
        <button ref={boton} onClick={() => setMostrar(prev => {
            console.log(!prev);
            return !prev;
        })}>Mostrar mensaje</button>
        {mostrar && (
             <div id='caja' ref={caja}>
                Hola soy un mensaje, {mostrar}
             </div>
        )}
       
   </div>
  )
}

export default Ejemplo