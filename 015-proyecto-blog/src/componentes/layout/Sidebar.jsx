import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export const Sidebar = () => { 
    const [buscar, setBuscar] = useState("");
    const navegar = useNavigate();

    const hacerBusqueda = (e) =>{
            e.preventDefault();
            //console.log(e.target.search.value);
            let mi_busqueda = e.target.search.value;
            //Redireccionar a la pajina de busqueda
                navegar("/buscar/"+mi_busqueda,{replace:true});
    }
	return (
		 <aside className="lateral">
                <div className="search">
                    <h3 className="title">Buscador</h3>
                    <form onSubmit={hacerBusqueda}>
                        <input type="text" name="search" id=""/>
                        <button>Buscar</button>
                    </form>
                </div>
                {/*<div className="add">
                    <h3 className="title">
                        Añadir pelicula
                    </h3>
                    <form>
                        <input type="text" name="" 
                        placeholder="Título" id=""/>
                        <textarea placeholder="Descripción"></textarea>
                        <input type="submit" value="Guardar"/>
                    </form>
                </div>*/}
            </aside>
	)
}