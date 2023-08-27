import React,{useEffect} from 'react'

export const AvisoComponent = () => {
    useEffect(() => {
        //Cuando el componente se monta
        alert("El componente AvisoComponent está montado");
        //Cunado el componente se desmonta
        return () => {
            alert("Componente desmontado");
        }
    },[]);//Se ejecuta una vez por que le paso el array vacio
  return (
    <div>
        <hr/>
        <h3>Saludos joel</h3>
        <h3>Hemos superado los 20 cambios</h3>
        <button onClick={e => {
            alert("Bienvenido");
        }}>Mostrar alerta</button>
    </div>
  )
}
