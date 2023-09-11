import React from 'react';
import {Routes, Route, BrowserRouter, Navigate,Link} from 'react-router-dom'
import {PublicLayout} from '../components/layout/public/PublicLayout'
import {Login} from '../components/user/Login'
import {Registro} from '../components/user/Registro'

import {PrivateLayout} from '../components/layout/privado/PrivateLayout';
import {Feed} from '../components/publication/Feed';

import {Logout} from '../components/user/Logout';
import {People} from '../components/user/People';
import {Config} from '../components/user/Config';

import {Following} from '../components/follow/Following';
import {Followers} from '../components/follow/Followers';

import {Profile} from '../components/user/Profile';


//Importacion de Autenticacion para que funcione el login
import {AuthProvider} from '../context/AuthProvider';

export const Routing = () => {
	return(
			<BrowserRouter>
				<AuthProvider>
					<Routes>
							
						<Route path="/" element={<PublicLayout/>}>
							<Route index element={<Login/>} />
							<Route path="login" element={<Login/>} />
							<Route path="registro" element={<Registro/>} />
						</Route>

						<Route path="/social" element={<PrivateLayout/>}>
							<Route index element={<Feed/>} />
							<Route path="feed" element={<Feed />} />
							<Route path="logout" element={<Logout/>} />
							<Route path="people" element={<People/>} />
							<Route path="ajustes" element={<Config/>} />
							<Route path="siguiendo/:userId" element={<Following/>} />
							<Route path="seguidos/:userId" element={<Followers/>} />
							<Route path="perfil/:userId" element={<Profile />} />

						</Route>

						<Route path="*" element={
							<>
							<p>
								<h1>Error 404</h1>
								<Link to="/">Vover al inicio</Link>
							</p>
							</>
						}/>
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		);
}