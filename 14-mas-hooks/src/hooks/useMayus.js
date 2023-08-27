import { useState } from 'react'
//hook perzonalizado
export const useMayus = (texto) =>{
    const [mitexto,setMiTexto] = useState(texto);
    const mayusculas = () => {
       setMiTexto( texto.toUpperCase());
    }
    const minusculas = () => {
        setMiTexto( texto.toLowerCase());
    }
    const concat = (added) =>{
        setMiTexto( texto+added);
    }
    return {
        estado:mitexto,
        mayusculas,
        minusculas,
        concat
    };
}