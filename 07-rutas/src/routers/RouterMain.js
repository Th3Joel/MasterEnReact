import React from 'react';
import { Routes, Route, NavLink, BrowserRouter, Navigate, } from 'react-router-dom';
import { Inicio } from '../component/Inicio';
import { Articulos } from '../component/Articulos';
import { Contatco } from '../component/Contatco';
import { Error } from '../component/Error';
import { Persona } from '../component/Persona';
import { PanelControl } from '../component/PanelControl';
import { InicioPanel } from '../component/panel/Inicio';
import { Crear } from '../component/panel/Crear';
import { Gestion } from '../component/panel/Gestion';
import { Acerca } from '../component/panel/Acerca';

export const RouterMain = () => {
    return (
        <BrowserRouter>
            <h1>Cabecera</h1>
            <hr />
            {/**Navegaciion sin recargo de pagina */}
            <nav>
                <ul>
                    <li>
                        <NavLink 
                        to="/inicio"
                        className={
                            ({isActive}) => {
                                return isActive ? "activado" : ""
                            }
                        }>Inicio</NavLink>
                    </li>
                    <li>
                        <NavLink 
                        to="/articulos"
                        className={
                            ({isActive}) => isActive ? "activado" : ""
                            //Esto es para cambiar la clase de un boton para aplicar estilo si la
                            //Pajina esta activa
                        }>Artículos</NavLink>
                    </li>
                    <li>
                        <NavLink 
                        to="/contacto"
                        className={
                            ({isActive}) => {
                                return isActive ? "activado" : ""
                            }
                        }>Contacto</NavLink>
                    </li>
                    <li>
                        <NavLink 
                        to="/persona"
                        className={
                            ({isActive}) => {
                                return isActive ? "activado" : ""
                            }
                        }>Personas</NavLink>
                    </li>
                    <li>
                        <NavLink 
                        to="/redirigir"
                        className={
                            ({isActive}) => {
                                return isActive ? "activado" : ""
                            }
                        }>Redirigir</NavLink>
                    </li>
                    <li>
                        <NavLink 
                        to="/panel"
                        className={
                            ({isActive}) => {
                                return isActive ? "activado" : ""
                            }
                        }>Panel de control</NavLink>
                    </li>
                </ul>
            </nav>
            <hr />
           
            <section className='contenidoPrincipal'>
                 {/**Cargar componentes
                 * Cuando hay una coincidencia aqui se carga el componente que coincide
                 * con el path
                 */}
                <Routes>
                    <Route path='/' element={<Inicio />} />
                    <Route path='/inicio' element={<Inicio />} />
                    <Route path='/articulos' element={<Articulos />} />
                    <Route path='/contacto' element={<Contatco />} />
                    {/**Para pasar parametros atravez de URL */}
                    <Route path='/persona/:nombre/:apellido' element={<Persona />}/>
                    <Route path='/persona/:nombre' element={<Persona />}/>
                    <Route path='/persona' element={<Persona />}/>

                    {/**Para redirigir ruta a otra */}
                    <Route path='/redirigir'  element={<Navigate to="/persona/Joel/Urbina"/>}/>

                    {/**Rutas anidadas */}
                    <Route path='/panel/*' element={<PanelControl/>} >
                        {/**Ruta por defecto 
                         * index es solo para subrutas
                        */}
                        <Route index element={<InicioPanel/>}/>

                        <Route path='inicio' element={<InicioPanel/>}/>
                        <Route path='crear-articulos' element={<Crear/>}/>
                        <Route path='gestion-usuarios' element={<Gestion/>}/>
                        <Route path='acerca-de' element={<Acerca/>}/>
                    </Route>

                    <Route path='*' element={<Error />} />
                </Routes>
            </section>
                 <hr/>
            <footer>
                Este es el pie de pajina
            </footer>
        </BrowserRouter>
    )
}
