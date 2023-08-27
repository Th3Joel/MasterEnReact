import React, {useState} from "react";
import {useForm} from "../../hooks/useForm";
import {Peticion} from "../../helpers/Peticion";
import {Global}  from "../../helpers/Global";
import {useNavigate} from "react-router-dom";

export const Crear = () => {
	const navegar = useNavigate();

	const {formulario,enviado,cambiado} = useForm();
	const [resultado,setResultado] = useState("");
	const guardarArticulos = async(e) => {
		e.preventDefault();

		//Recoger datos formulario
		let nuevoArticulo = formulario;
		//console.log(nuevoArticulo);

		//Guardar articulo en el backend
		const {datos,cargando} = await Peticion(Global.url+"crear","POST",nuevoArticulo);
		if(datos.mensaje == "success"){
			setResultado("si");

			//Subir la imagen
			let fileInput = document.querySelector("#file");
			if(fileInput.files.length !== 0){
				const formData = new FormData();
				formData.append('file0',fileInput.files[0]);

				const subida = await Peticion(Global.url+"subir-imagen/"+datos.datos._id,"POST",formData,true);
				console.log(subida);
			}
			
			navegar("/articulos",{replace:true});
			
		}else{
			setResultado(datos.status+" ("+datos.mensaje+")");
		}
		
		console.log(datos);
	}

	return (
		<div className="jumbo">
			<h1>Crear artículos</h1>
			
			<strong>{resultado == "si" ? "Articulo guardado" : resultado}</strong>

			{/*Montar fomulario*/}
			<form className="formulario" onSubmit={guardarArticulos}>
				<div className="form-group">
					<label htmlFor="titulo">Título</label>
					<input
						type="text"
						name="titulo"
						onChange={cambiado}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="contenido">Contenido</label>
					<textarea
						type="text"
						name="contenido"
						onChange={cambiado}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="file0">Imagen</label>
					<input
						type="file"
						name="file0"
						id="file"
					/>
				</div>

				<input
					type="submit"
					value="Guardar"
					className="btn btn-success"
				/>
			</form>
		</div>
	)
}