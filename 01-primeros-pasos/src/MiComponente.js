//Importar modulos de react / dependencias

//Se importa fragment para utilizar la etiqueta <Fragment>
import React , {Fragment} from "react";
//Funcion del componente
const MiComponente = () => {
    //Esto es para utilizar varias etiquetas, 
    //se llama fragment para contener varias etiquetas
    //Fragment abreviado
    /*return (
        <>
        <hr/>
        <h2>componente creado</h2>
        <p>Este es el primer componente</p>
        <ul>
            <li>React</li>
            <li>Angular</li>
            <li>Vue</li>
        </ul>
        </>
        );
        */
        //Ffragment no abreviado
        /*return (
            <Fragment>
            <hr/>
            <h2>componente creado</h2>
            <p>Este es el primer componente</p>
            <ul>
                <li>React</li>
                <li>Angular</li>
                <li>Vue</li>
		<li>php</li>
            </ul>
            </Fragment>
            );
            */
           //Esto es con un div (Se utiliza mas)

           let nombre = "Joel";
           let web =  "exe.x10.mx";

           let usuario = {
            nombre:"Joel",
            apellidos:"Calderon Urbina",
            web:'exe.x10.mx'
           }
           console.log(usuario);
            return (
                <div className="mi-componente">
               
                <h2>componente creado</h2>
                <h3>Datos del usuario:</h3>
                <ul>
                    <li>Nombre: <strong>{usuario.nombre}</strong></li>
                    <li>Apellidos: <strong>{usuario.apellidos}</strong></li>
                    <li>Web: <strong>{usuario.web}</strong></li>
                </ul>
                <p>Este es el primer componente</p>
                <ul>
                    <li>React</li>
                    <li>Angular</li>
                    <li>Vue</li>
		            <li>php</li>
                </ul>
                </div>
                );
}
// Exportar para poder usarlo desde otros componentes
export default MiComponente;