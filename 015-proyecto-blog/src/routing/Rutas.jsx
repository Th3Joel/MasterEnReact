import React from "react";
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import {Inicio} from "../componentes/pages/Inicio";
import {Articulos} from "../componentes/pages/Articulos";
import {Crear} from "../componentes/pages/Crear";
import {Header} from "../componentes/layout/Header";
import {Nav} from "../componentes/layout/Nav";
import {Sidebar} from "../componentes/layout/Sidebar";
import {Footer} from "../componentes/layout/Footer";
import {Busqueda} from "../componentes/pages/Busqueda";
import {Articulo} from "../componentes/pages/Articulo";
import {Editar} from "../componentes/pages/Editar";

export const Rutas = () => {
	return (
		<BrowserRouter>
				{/*Layout*/}
			<Header/>
			<Nav/>

				{/*Contenido central y rutas*/}
			<section id="content" className="content">
			<Routes>
				<Route path="/" element={<Inicio/>} />
				<Route path="/inicio" element={<Inicio/>} />
				<Route path="/articulos" element={<Articulos/>} />
				<Route path="/crear-articulos" element={<Crear/>} />
				<Route path="/Inicio" element={<Inicio/>} />
				<Route path="/buscar/:busqueda" element={<Busqueda/>} />
				<Route path="/articulo/:id" element={<Articulo/>} />
				<Route path="/editar/:id" element={<Editar/>} />

							{/*Pajina 404*/}

				<Route path="*" element={
					<div className="jumbo">
					<h1>Error 404 pagina no existe</h1>
					</div>
				} />

			</Routes>
			</section>

			<Sidebar/>

			<Footer/>
		</BrowserRouter>
		);
}