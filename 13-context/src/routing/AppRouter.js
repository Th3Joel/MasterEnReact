import React, { useContext } from 'react';
import { Routes, Route, NavLink, BrowserRouter } from 'react-router-dom';
import Inicio from '../componentes/Inicio';
import Acerca from '../componentes/Acerca';
import Articulos from '../componentes/Articulos';
import Contacto from '../componentes/Contacto';
import Login from '../componentes/Login';
import { PruebaContext } from '../contexto/PruebaContext';

const AppRouter = () => {

    const {usuario,setUsuario} = useContext(PruebaContext);
    return (
        <BrowserRouter>
            <header className='header'>
                {/**Menu de navegacion */}

                <nav>
                    <div className='logo'>
                        <h2>Aprendiendo useContext</h2>
                    </div>
                    <ul>
                        <li>
                            <NavLink to="/inicio">Inicio</NavLink>
                        </li>
                        <li>
                            <NavLink to="/articulos">Articulos</NavLink>
                        </li>
                        <li>
                            <NavLink to="/acerca-de" >Acerca de</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contacto" >Contacto</NavLink>
                        </li>
                       
                            { //Si el usuario existe imprime esto, si no imprime
                            //Si esa propiedad esxiste ne el objeto si existe la clave
                            usuario.hasOwnProperty("nick") && usuario.nick !== null ? (
                                <>
                                <li>
                                 <NavLink to="/">{usuario.nick}</NavLink>
                                </li>

                                <li>
                                    <a href='#' onClick={e => {
                                        //Cierra la session y cambia los valores
                                        
                                        e.preventDefault();
                                        setUsuario({});
                                    }}>Cerrar sessión</a>
                                </li>
                                
                                </>
                               
                            ):(
                                <li>
                                     <NavLink to="/login">Identifícate</NavLink>
                                </li>
                               
                            )}
                            
                        

                        {/*<li>
                            <NavLink to="/login">{usuario.nick}</NavLink>
                        </li>*/}
                    </ul>
                </nav>
            </header>

            <section className='content'>

                {/**Configurar rutas */}
                <Routes>
                    <Route path='/' element={<Inicio />} />
                    <Route path='/inicio' element={<Inicio />} />
                    <Route path='/acerca-de' element={<Acerca />} />
                    <Route path='/articulos' element={<Articulos />} />
                    <Route path='/contacto' element={<Contacto />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='*' element={(
                        <h1>Error esta pagina no existe</h1>
                    )} />
                </Routes>
            </section>
        </BrowserRouter>

    )
}

export default AppRouter