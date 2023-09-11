import {global} from './global';

export const getProfile = async(userId,setProfile) =>{
	const req = await fetch(global.url+"user/profile/"+userId,{
			method:"GET",
			headers:{
				"Content-Type":"application/json",
				"Authorization":localStorage.getItem("token")
			}
		});

		const data = await req.json();

		if (data.status == "success") {
				//console.log(data);
				setProfile(data.user)
		}
		return data;
}