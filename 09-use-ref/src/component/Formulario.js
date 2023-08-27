import React, { useRef } from 'react'

export const Formulario = () => {
    const nombreInput = useRef();
    const apellidoInput = useRef();
    const correoInput = useRef();

    const miCaja = useRef();

    const Mostrar = (e) =>{
        e.preventDefault();
        console.log(nombreInput.current.Input);
        console.log(apellidoInput.current.Input);
        console.log(correoInput.current.Input);

        //Mi caja

        console.log(miCaja);

        //miCaja.current.classList.add("fondo verde");
        // ó
        let {current: caja} = miCaja;

        caja.classList.add("fondoVerde");

        caja.innerHTML ="Formulario enviado";

      
    }
  return (
    <div>
        <h1>Formulario</h1>
        <div ref={miCaja} className='miCaja'>
            <h2>Pruebas con useRef</h2>
        </div>
        <form onSubmit={Mostrar}>
            <input type="text" placeholder='Nombre' ref={nombreInput}/><br/>
            <input type="text" placeholder='Apellidos' ref={apellidoInput}/><br/>
            <input type="text" placeholder='Correo' ref={correoInput}/><br/>
            <input type='submit' value="Enviar"/>
        </form>

        {/**Seleccionar o focus */}
        <button onClick={() => nombreInput.current.select()}>
            Empezar a llenar form
        </button>
    </div>
  )
}
