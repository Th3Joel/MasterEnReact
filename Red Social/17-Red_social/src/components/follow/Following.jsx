import {useEffect,useState} from 'react';
import {UserList} from "../user/UserList";
import {global} from '../../helpers/global';
import {getProfile} from '../../helpers/getProfile';

import {useParams} from 'react-router-dom';
export const Following = () =>{

		const [users,setUsers] = useState([]);
	const [page,setPage] = useState(1);
	const [more,setMore] = useState(true);
	const [loading,setLoading] = useState(true);

	const [following,setFollowing] = useState([]);
	const [profile,setProfile] = useState({});

		const params = useParams();


	useEffect(()=>{
		getUsers(page);
		getProfile(params.userId,setProfile);
	},[]);

	const getUsers = async(next) =>{
		//Efecto  de carga 
		setLoading(true);
		//Sacar userId de la url
		const userId = params.userId;
		//Peticion para sacra usuarios
			const request = await fetch(global.url + 'follow/siguiendo/'+userId+"/"+next,{
				method:'POST',
				headers:{
					'Content-Type':'application/json',
					'Authorization':localStorage.getItem("token")
				}
			});

			let data = await request.json();
			let cleanU = [];

			//Recorrer y limpiar follows para quedarme con followed
			//console.log(data);
			if (data.status == "error") {
				setLoading(false);

			}else{
				data.usuarios.forEach(n => {
					cleanU = [...cleanU,n.followed];
				});
			}

			data.usuarios = cleanU;
			
			//console.log(data);
		//crear un estado para poder listarlos

			if (data.usuarios && data.status == "success") {
				let newUsers = data.usuarios;
				if (users.length >= 1) {
					newUsers = [...users, ...data.usuarios];
				}
				setFollowing(data.user_following);
				setUsers(newUsers);
					//Efecto de carga
				setLoading(false);
				//console.log(newUsers);
				//Paginacion
					//Para ocultar el nboton de ver mas usuario cuando ya no hay usuarios desde la api 
				if (users.length >= (data.totalItems - data.usuarios.length)) {
					setMore(false);
				}
			}
			
		
	}

	


	return (<>
			 <header className="content__header">
                <h1 className="content__title">Usuarios que sigue {profile.name} {profile.surname}</h1>
            </header>

          <UserList 
          		users={users}
          	 	getUsers={getUsers}
          	 	following={following}
          	 	setFollowing={setFollowing}
          	 	more={more}
          	 	page={page}
          	 	setPage={setPage}
          	 	loading={loading}
          	 />

            
            
            <br/>
		</>);

}