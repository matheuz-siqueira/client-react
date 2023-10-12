import React, {useState, useSyncExternalStore} from "react";
import './styles.css';
import authImage from '../../assets/authentication-icon.png';
import api from '../../services/api';
import { useHistory } from "react-router-dom";

export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function login(event){
        event.preventDefault();

        const data = {
            email, password
        };

        try{
            const response = await api.post('api/authentication/login',data);
            localStorage.setItem('email',email);
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('expiration',response.data.expiration);

            history.push('/alunos');
        }catch(error){
            alert('login falhou' + error)
        }
    
    }


    return(
        <div className="login-container">
            <section className="form">  
                <img src={authImage} alt="Login" id="img1"/>
                <form onSubmit={login}>
                    <h1>Cadastro de Alunos</h1>

                    <input type="email" placeholder="Seu email"
                    value={email} onChange={e=>setEmail(e.target.value)}/>
                    
                    <input type="password" placeholder="Sua senha" 
                    value={password} onChange={e=>setPassword(e.target.value)}/>
                    
                    <button className="button" type="submit">Login</button>
                </form>
            </section>
        </div>


    );
}