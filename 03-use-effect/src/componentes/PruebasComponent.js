import React,{useState, useEffect} from 'react'
import { AvisoComponent } from './AvisoComponent';

export const PruebasComponent = () => {

    const [usuario,setUsuario] = useState("Joel Urbina");
    const [fecha, setFecha] = useState("01-01-1998");

    const [contador, setContador] = useState(0);

    const modUsuario = e => {
        setUsuario(e.target.value);

        //console.log("Ha habido un cambio en usuario");
    }
    /**
     * El useEffect sirve para que se ejecute algo cuando
     * cambia algo o se incia o crea el componente, se ejecuta una
     * accion
     */
    const cambiarFecha = e =>{
        setFecha(Date.now());
    }
     //Solo se ejecuta una vez, solo al cargar el componente
    useEffect(() => {
        console.log("Has cargado el componente Prueba componente");
    }, []);
    //Solose ejecuta solo si cambio el usuario o fecha
    useEffect(() => {
        //Se suma el contador
        setContador(contador+1);
        console.log("Has modificado el usuario: "+contador);

    }, [fecha, usuario]);

    /**Esto se ejcuta varias veces
     * useEffect(() => {
        console.log("Has cargado el componente Prueba componente o has realizado un cambio en un stado");
        }, []);
     */
  return (
    <div>
        <h2>El effecto - Hook useEffect</h2>
        {/**
         * esto  es para que si el contador es mayor a 10
         * se cambia la clase css
         */}
        <strong className={contador >= 10 ? 'label label-green' : 'label'}>{usuario}</strong>
        <strong>{fecha}</strong>
        <p>
        <input 
            type='text'
            onChange={modUsuario} 
            placeholder='Cambia el nombre' 
            />
            <button onClick={cambiarFecha}> Cambiar fecha</button>
        </p>
        
        {//Esto es si llega a 20 se muestra un mensaje
        contador >= 20 && "Hemos superado el 20 en el contador"}
        {//Si esto de cumple se carga otro componente
        usuario == "Joel" && <AvisoComponent/>}
         
    </div>
  )
}
