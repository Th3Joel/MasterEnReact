import { useState,useEffect } from "react";

export const useAjax = (url) =>{
    const [estado,setEstado] = useState({
        datos:null,
        cargando:true
    });

    const getData = async() => {
        setEstado({
            ...estado,
            cargando:true
        });

        /*Para ver el efecto cargando
        setTimeout(async()=>{
            const peticion = await fetch(url);
            const {data} =  await peticion.json();
            console.log(data);
    
            setEstado({
                datos:data,
                cargando:false
            });
        },2000);*/

        const peticion = await fetch(url);
            const {data} =  await peticion.json();
            console.log(data);
    
            setEstado({
                datos:data,
                cargando:false
            });

       
    }

    //Cada vez que se modifique url 
    //por que ya va estar con un
    useEffect(()=>{
        getData();
        console.log(url);
    },[url]);

    return {
        datos:estado.datos,
        cargando:estado.cargando
    }
}