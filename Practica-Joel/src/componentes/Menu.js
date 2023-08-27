//Importar modulos de react / dependencias

//Se importa fragment para utilizar la etiqueta <Fragment>
import React , {Fragment} from "react";
import './Menu.css'
//Funcion del componente
const Menus = () => {
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
            apellidos:"Calderon",
            web:'exe.x10.mx'
           }
           console.log(usuario);
            return (
                <div className="caja">
                    <h3>Inicio</h3>
                    <h3>Productos</h3>
                    <h3>Contacto</h3>
                    <h3>Acerca de</h3>
                </div>
                );
}
// Exportar para poder usarlo desde otros componentes
export default Menus;