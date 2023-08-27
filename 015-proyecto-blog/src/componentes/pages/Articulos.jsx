import React, {useState, useEffect} from "react";
import {Global} from "../../helpers/Global";
import {Peticion} from "../../helpers/Peticion";
import {Listado} from "./Listado";

export const Articulos = () => {

	const [articulos, setArticulos] = useState([]);

	const [cargando,setCargando] = useState(true);

	useEffect(()=>{
		

		conseguirArticulos();
	},[]);

	const conseguirArticulos = async() => {
		//Global traido de helpers
		const url = Global.url+"articulos";

		const {datos,cargando} = await Peticion(url,"GET");

		/* esto se convirtio en helper
		let peticion = await fetch(url,{
			method:"GET"
		});
		let datos = await peticion.json();
		*/

		if(datos.status == "success"){
			setArticulos(datos.articulos);
		}
		setCargando(cargando);

		
		

	}

	return (
		<>
		{cargando ? "Cargando...." : 
			(
				articulos.length >= 1 ? 
				//Se le pasa propiedades al componente listado
				<Listado 
					articulos={articulos} 
					setArticulos={setArticulos}
				/>
				: 
				(
					<h1>No hay articulos</h1>
				)
			)
		}   
		</>
	)
}