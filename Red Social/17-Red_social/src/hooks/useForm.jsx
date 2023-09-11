import {useState} from 'react';

export const useForm = (initial = {}) =>{
	const [form,setForm] = useState(initial);

	const changed = ({target}) => {
		const {name,value} = target;
		//Esto lo que hace es agregar un objeto
		//con clave y valor automaticamente
		//con su name y su valor a un objeto
		setForm({
			...form,
			[name]: value
		});

		
	}

	return {
		changed,
		form
	}

}