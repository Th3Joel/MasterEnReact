import { useState } from "react";

export const useForm = (objetoInicial = {}) => {
    const [formulario, setFormulario] = useState(objetoInicial);

    //Desectructurar e.target en target
    const enviado = (da) => {
        
        /*
        let curso = {
            titulo:e.target.titulo.value,
            anio:e.target.anio.value,
            descripcion:e.target.descripcion.value,
            autor:e.target.autor.value,
            email:e.target.email.value
        };*/
        //Una forma mas rapida
       setFormulario(da);
    }

    const serializarFormulario = (form) => {
        const formData = new FormData(form);
        const ObjCompleto = {};
        //Recorrer el fomr data para sacar name, value
        //y crear el objeto
        for (let [name, value] of formData) {
            ObjCompleto[name] = value;
        }

        return ObjCompleto;
    }

    const cambiado = ({ target }) => {
        const { name, value } = target;

        //Obtiene los datoos anteriores y modifica
        //segun las claves que le pongamos
        setFormulario({
            ...formulario,
            [name]: value
        });
    }
    return {
        formulario,
        enviado,
        cambiado
    }
}