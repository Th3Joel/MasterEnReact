import {useEffect,useState} from 'react';
import {UserList} from "./UserList";
import {global} from '../../helpers/global';


export const People = () =>{

	const [users,setUsers] = useState([]);
	const [page,setPage] = useState(1);
	const [more,setMore] = useState(true);
	const [loading,setLoading] = useState(true);

	const [following,setFollowing] = useState([]);

	useEffect(() => {
		getUsers(page);
	},[]);

	const getUsers = async(next) =>{
		//Efecto  de carga 
		setLoading(true);
		//Peticion para sacra usuarios
			const request = await fetch(global.url + 'user/listado/'+next,{
				method:'GET',
				headers:{
					'Content-Type':'application/json',
					'Authorization':localStorage.getItem("token")
				}
			});

			const data = await request.json();
			
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
                <h1 className="content__title">Gente</h1>
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
          	 	setLoading={setLoading}
          	 />

            
            
            <br/>
		</>);
} 