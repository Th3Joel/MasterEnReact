import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {Global} from "../../helpers/Global";
import {Peticion} from "../../helpers/Peticion";
import {Listado} from "./Listado";

export const Busqueda = () => {

	const [articulos, setArticulos] = useState([]);

	const [cargando,setCargando] = useState(true);

	const params = useParams();

	useEffect(()=>{
		
			conseguirArticulos();
		
	},[]);

		//Se va refrescar la pantalla cuando el parametro de la url cambie
	useEffect(()=>{
		
			conseguirArticulos();
		
	},[params]);

	const conseguirArticulos = async() => {

		//Global traido de helpers
		let url = Global.url+"buscar/"+params.busqueda;

		const {datos,cargando} = await Peticion(url,"GET");

		/* esto se convirtio en helper
		let peticion = await fetch(url,{
			method:"GET"
		});
		let datos = await peticion.json();
		*/

		if(datos.status == "success"){
			setArticulos(datos.articulos);
		}else{
			setArticulos([]);
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