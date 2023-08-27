import React, { useEffect, useRef, useState } from 'react'

export const Ejemplo = () => {
    const [numeroSaludo,setNumeroSaludo] = useState(0);

    const saludoEnCOla = useRef(numeroSaludo);

        //Cada vez que se ejecute numerosaludo
        //poner mensajes en cola
    useEffect(()=>{

        saludoEnCOla.current = numeroSaludo;
        setTimeout(()=>{
            console.log("Saludo en cola: "+saludoEnCOla.current);
        },2000);
    },[numeroSaludo]);

    const enviarSaludo = (e) => {
        

        setNumeroSaludo(numeroSaludo+1);
    }


  return (
    <div>
        <h1>Ejemplo con useRef</h1>

        <h2>Saludos enviados: {numeroSaludo}</h2>
        <button onClick={enviarSaludo}>Enviar saludo</button>

        <hr/>
    </div>
  )
}
