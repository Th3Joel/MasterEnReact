import React, { useEffect, useState } from 'react'


export const AjaxComponent = () => {
    const [usuarios, setUsuarios] = useState([]);
    //Nuevo estado loading;
    const [cargando,setCargando] = useState(true);

    const [errores, setErrores] = useState("");

    // Genérico o básico

    const getUsuarioEstaticos = () => {
        setUsuarios([
            {
                "id": 1,
                "email": "michael.lawson@reqres.in",
                "first_name": "Joel",
                "last_name": "Urbina",
                "avatar": "https://reqres.in/img/faces/7-image.jpg"
            },
            {
                "id": 2,
                "email": "lindsay.ferguson@reqres.in",
                "first_name": "Victor",
                "last_name": "Robles",
                "avatar": "https://reqres.in/img/faces/8-image.jpg"
            },
            {
                "id": 3,
                "email": "tobias.funke@reqres.in",
                "first_name": "Juan",
                "last_name": "Lopez",
                "avatar": "https://reqres.in/img/faces/9-image.jpg"
            }
        ]);
    }
    //Con fetch
    const getUsuarioAjaxPms = () => {
        fetch("https://reqres.in/api/users?page=1")
            .then(respuesta => respuesta.json())
            .then(resultadoFinal => {
                setUsuarios(resultadoFinal.data);
                console.log(usuarios);
            },
                error => {
                    console.log("error");
                })
    }
    //Con Async y Await
    const getUsuariosAjaxAW = async() => {
        //Un retardo de 5segundos para conprobar
        //que funciona el efecto de carga
        setTimeout(async() => {
            
            try{
                const peticion = await
                fetch("https://reqres.in/api/users?page=2");
                const {data} = await peticion.json();
                //console.log(data);
                setUsuarios(data);
                setCargando(false);  
            }catch(erro){
                console.log(erro);
                setErrores(erro.message);
            }
                 
        }, 1000);

    }
    //Una vez que se carga el compnente se ejecuta la funcion
    useEffect(() => {
        //getUsuarioEstaticos();
        //getUsuarioAjaxPms();
        
        getUsuariosAjaxAW();
    }, []);
    //Esta es para mostrar mas platillas con una condicion
    if(errores !== ""){
        //Cuando pasa un error
        return(
            <div className='errores'>
                {errores}
            </div>
        );
    }else if(cargando == true){
         //Cuando todo esta cargando
        return(
            <div className='cargando'>
               
                Cargando datos......
            </div>
        );
    }else if(cargando == false && errores === ""){
        //Cuando todo ha ido bien
        return (
            <div>
                <h2>Listado de usuarios via Ajax</h2>
                <ol className='usuarios'>
                    {
                        usuarios.map(user => {
                            console.log(user);
                            return (
                                
                                <li key={user.id}>
                                <img src={user.avatar} width='30'/>
                                &nbsp;
                                {user.first_name} {user.last_name}
                                </li>
                            )
                                
                        })
                    }
                </ol>
            </div>
        )
    }

   

    
}
