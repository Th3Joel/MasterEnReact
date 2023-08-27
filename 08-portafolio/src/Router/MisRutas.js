import React from 'react';
import {Routes,Route,BrowserRouter, Navigate} from 'react-router-dom';
import { Curriculum } from '../component/Curriculum';
import {Inicio} from '../component/Inicio';
import {Portafolio} from '../component/Portafolio';
import {Servicios} from '../component/Servicios';
import {Contacto} from '../component/Contacto';
import { Footer } from '../component/layout/Footer';
import { HeaderNav } from '../component/layout/HeaderNav';
import { Proyecto } from '../component/Proyecto';

export const MisRutas = () => {
  return (
    <BrowserRouter>
        {/**Header y navegación */}
            <HeaderNav/>
         {/**Contenido central */}
         <section className='content'>
          <Routes>
                <Route path='/' element={<Navigate to="inicio"/>}/>
                <Route path='/inicio' element={<Inicio/>}/>
                <Route path='/portafolio' element={<Portafolio/>}/>
                <Route path='/servicios' element={<Servicios/>} />
                <Route path='/curriculum' element={<Curriculum/>}/>
                <Route path='/contacto' element={<Contacto/>}/>
                <Route path='/proyecto/:id' element={<Proyecto/>}/>
                <Route path='*' element={
                <div className='page'>
                  <h1 className='heading'>Error 404</h1>
                </div>
                }/>
            </Routes> 
         </section>
              
        {/**Footer */}
        
        <Footer/>
    </BrowserRouter>
  )
}
