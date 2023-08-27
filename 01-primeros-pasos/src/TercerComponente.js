import React from 'react';
import PropTypes from "prop-types";

//Los datos nombre, apellidos, ficha son los enviados desde
//el compoente padre

//Se igualan para tener un valor por defecto, 
//se le asigna algo o el las props default
export const TercerComponente = ({
        nombre, 
        apellidos, 
        ficha
    }) => {
    //console.log(props);
  return (
    <div>
        <h2>Comunicacion entre componentes</h2>
        <ul>
            {/* Estos son datos 
             recibidos del componente padre */}
            <li>{nombre}</li>
            <li>{apellidos}</li>
            <li>{ficha.estado}</li>
            <li>{ficha.grupo}</li>
        </ul>
    </div>
  )
}

//Aplicar prop types para validar datos que sean
//del tipo de datos indicado
TercerComponente.propTypes = {
    nombre: PropTypes.string.isRequired,
    apellidos: PropTypes.string.isRequired,
    fichas: PropTypes.object
}

//Para definir las propiedades o datos que vienen del
//componente padre y si no viene ningun dato
//Se le asigna un valor pro defecto
TercerComponente.defaultProps = {
    nombre: "Juan",
    apellidos: "Martinez"
}