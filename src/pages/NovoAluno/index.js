import React, { useEffect, useState } from "react";
import './styles.css';
import { FiCornerDownLeft, FiUserPlus } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import api from '../../services/api';

export default function NovoAluno(){

    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const {alunoId} = useParams();
    const history = useHistory();

    const token = localStorage.getItem('token');
    const authorization = {
        headers: {
           Authorization : `Bearer ${token}`
        }
    }

    useEffect(()=>{
        if(alunoId === '0'){
            return; 
        }else{
            loadAluno();
        }
    }, alunoId)

    async function loadAluno(){
        try{

            const response = await api.get(`api/student/${alunoId}`,authorization);
            setId(response.data.id);
            setName(response.data.name);
            setEmail(response.data.email);

        }catch(error){
            alert('Erro ao recuperar aluno' + error);
            history.push('/alunos');
        }
    }

    async function saveOrUpdate(event){
        event.preventDefault();

        const data = {
            name, 
            email,
        }

        try{
            if(alunoId === '0'){
                await api.post('api/student/create', data, authorization);
            }else{
                data.id = id;
                await api.put(`api/student/${id}`,data,authorization);
            }
            
        }catch(error){
            alert('Erro ao savar ' + error);
        }
        history.push('/alunos');
    }

    return(
        <div className="novo-aluno-container">
            <div className="content">
                <section className="form">
                    <FiUserPlus size="105" color="#17202a"/>
                    <h1>{alunoId === '0'? 'Incluir Novo Aluno' : 'Atualizar Aluno'}</h1>
                    <Link className="back-link" to="/alunos">
                        <FiCornerDownLeft size="25" color="#17202a" />
                        Retornar
                    </Link>
                </section>
                <form onSubmit={saveOrUpdate}>
                    <input type="text" placeholder="Nome" value={name} 
                    onChange={e=> setName(e.target.value)}/>

                    <input type="email" placeholder="Email" value={email}
                    onChange={e=> setEmail(e.target.value)}/>
                    
                    <button className="button" type="submit">
                        {alunoId === '0' ? 'Incluir' : 'Atualizar'}
                    </button>
                </form>
            </div>
        </div>
    );
}