import React from 'react'
import {PublicationList} from './PublicationList';
import avatar from '../../assets/img/user.png';
import {Link,useParams} from 'react-router-dom';
import {useEffect,useState} from 'react';
import {global} from '../../helpers/global';
import useAuth from '../../hooks/useAuth';
export const Feed = () => {

    const [publication,setPublication] = useState([]);
    const [page,setPage] = useState(1);
    const [more,setMore] = useState(true);
    const params = useParams();
    const {auth} = useAuth();

    //Metodo para traer la publicaciones
    const getPublication = async(nextPage = 1, showNews = false) =>{

        if (showNews) {
            setPublication([]);
            setPage(1);
            nextPage = 1;
        }

        const req = await fetch(global.url+"publication/feed/"+nextPage,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("token")
            }
        });

        const data = await req.json();
        console.log(data);
        if (data.status == "success") {
            if (data.publication) {
                let newPub = data.publication;

                if (!showNews && publication.length >= 1) {
                    newPub = [...publication,...data.publication];
                }
                setPublication(newPub);
                //Para ocultar el boton
                if (!showNews && publication.length >= (data.totalItems - data.publication.length)) {
                    setMore(false)
                }

                if (data.totalPaginas <= 1) {
                    setMore(false);
                }
            }
            

        }
    }

    useEffect(function(){
        getPublication(1,false);
    },[]);
    

	return (<>
			 <header className="content__header">
                <h1 className="content__title">Timeline</h1>
                <button className="content__button" onClick={() => {getPublication(1,true)}}>Mostrar nuevas</button>
            </header>

            <PublicationList
                publication={publication}
                setPublication={setPublication}
                getPublication={getPublication}
                more={more}
                setMore={setMore}
                page={page}
                setPage={setPage}
            />

		</>);
}