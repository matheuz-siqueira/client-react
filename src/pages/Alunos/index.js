import React from "react";  
import { Link, useHistory } from "react-router-dom";
import './styles.css'; 
import api from '../../services/api';

import {FiEdit, FiUserX, FiXCircle} from 'react-icons/fi';

import registerIcon from '../../assets/register.png';
import { useEffect, useState } from "react";



export default function Alunos(){

    const [searchInput, setSearchInput] = useState('');
    const [filtro, setFiltro] = useState([]);

    const[alunos, setAlunos] = useState([]);

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const history = useHistory();

    const authorization = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    const searchAlunos = (searchValue) => {
        setSearchInput(searchValue);
        if(searchInput !== ''){
            const dadosFiltrados = alunos.filter((item) => {
                return Object.values(item).join('').toLowerCase()
                    .includes(searchInput.toLowerCase())
            });
            setFiltro(dadosFiltrados);
        }else{
            setFiltro(alunos);
        }
    }

    useEffect(()=> {
        api.get('api/student/get-all',authorization).then(
            response=> {setAlunos(response.data);
            }, token)
    })

    async function logout(){
        try{
            localStorage.clear();
            localStorage.setItem('token', '');
            authorization.headers = '';
            history.push('/');
        }catch(error){
            alert('Não foi possível fazer logout ' + error);
        }
    }

    async function editAluno(id){
        try{
            history.push(`aluno/novo/${id}`)
        }catch(error){
            alert('Não foi possível editar o aluno');
        }
    }

    async function deleteAluno(id)
    {
        try{
            if(window.confirm('Deseja deletar o aluno de id = ' + id + '?')){
                await api.delete(`api/student/${id}`, authorization);
                setAlunos(alunos.filter(aluno => aluno.id !== id));
            }
        }catch(error){
            alert('Não foi possível excluir o aluno');
        }   
    }

    return(
        <div className="aluno-container">
            <header>
                <img src={registerIcon} alt="Cadastro" />
                <span>Bem vindo, <strong>{email}</strong>!</span>
                <Link className="button" to="aluno/novo/0">Novo Aluno</Link>
                <button onClick={logout} type="button">
                    <FiXCircle size={35} color="#17202a" />
                </button>   
            </header>
            <form>
                <input  type="text" placeholder="Nome..."
                onChange={(e)=>searchAlunos(e.target.value)}/>
            </form>

            <h1>Relação de Alunos</h1>
            {searchInput.length >= 1 ? (
            <ul>
                {filtro.map(aluno=>(
                <li key={aluno.id}>
                        <b>Nome:</b>{aluno.name}<br/><br/>
                        <b>Nome:</b>{aluno.email}<br/><br/>
                <button onClick={()=>editAluno(aluno.id)} type="button">
                    <FiEdit size="25" color="#17202a" />
                </button>
                
                <button type="button" onClick={()=>deleteAluno(aluno.id)}> 
                    <FiUserX size="25" color="#172202a" />
                </button>
                </li>   
                ))}
            </ul>
            ) : (
            <ul>
                {alunos.map(aluno=>(
                    <li key={aluno.id}>
                            <b>Nome:</b>{aluno.name}<br/><br/>
                            <b>Nome:</b>{aluno.email}<br/><br/>
                    <button onClick={()=>editAluno(aluno.id)} type="button">
                        <FiEdit size="25" color="#17202a" />
                    </button>
                    
                    <button type="button" onClick={()=>deleteAluno(aluno.id)}> 
                        <FiUserX size="25" color="#172202a" />
                    </button>
                    </li>   
                    ))} 
            </ul>
            )}
        </div>
    );
}