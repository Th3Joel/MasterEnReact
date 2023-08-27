import React, {useReducer, useEffect} from 'react'
import { JuegoReducer } from '../reducer/JuegoReducer';

const init = () => {
    return JSON.parse(localStorage.getItem("juegos")) || [];
}

const MisJuegos = () => {

        const [juegos,dispatch] = useReducer(JuegoReducer,[], init);
        
        useEffect(()=>{
            localStorage.setItem("juegos",JSON.stringify(juegos));
        },[juegos]);

        const conseguirDatosForm = e =>{
            e.preventDefault();

            let juego ={
                id:new Date().getTime(),
                titulo:e.target.titulo.value,
                descripcion:e.target.descripcion.value
            }

            //console.log(juego);
            
            //Ejecutar accion del reducer
            //type : crear
            //Payload son los datos el objeto
            const accion = {
                type:"crear",
                payload:juego
            };

            dispatch(accion);

            console.log(juegos)
        }

        const borrar = id =>{
            const accion = {
                type:"borrar",
                payload:id
            }

                //Ejecutar una funcion del
                //reducer dependiendo del typo
                //que quiero ejecutar
                //En este caso es borrar
            dispatch(accion);
        }

       const editar = (e,id) =>{
            let juego = {
                id,
                titulo:e.target.value,
                descripcion:e.target.value
            };

            const accion = {
                type:"editar",
                payload:juego
            }
            //Dispatch -> disparador
            dispatch(accion);

        }
  return (
    <div>
        <h1>Estos son mis video juegos</h1>
        <p>Numero de videojuegos: {juegos.length}</p>
        <ul>
            {
                juegos.map(juego => (
                    <li key={juego.id}>
                        {juego.titulo}

                        &nbsp;
                            <button onClick={e => borrar(juego.id)}>Borrar</button>
                            <input type='text' 
                            onBlur={e => editar(e,juego.id)}
                            onKeyPress={e => {
                                if(e.key == "Enter"){

                                    //Al presionar enter se ejecuta
                                    //la funcion
                                    editar(e,juego.id)
                                    console.log("Presionado enter");
                                }
                            }}
                            />
                    </li>
                ))
            }
        </ul>

        <h3>Agregar Juego</h3>

        <form onSubmit={conseguirDatosForm}>
            <input
                type='text'
                placeholder='Título'
                name='titulo'
            />
            <textarea
                name='descripcion'
                placeholder='Descripcion'
            />
            <input 
            type='submit' 
            value="Guardar"
            />
        </form>
    </div>
  )
}

export default MisJuegos