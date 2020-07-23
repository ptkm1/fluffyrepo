import React,{ useContext } from 'react';

import Vetor from '../../media/vetor_cadastro.svg'
import './style.css'
import {Link} from 'react-router-dom';
import { RiArrowLeftLine } from "react-icons/ri";

import ContextoDeAutenticacao from '../../contexts/auth';

function Login() {
  //O use state é importado por context lá do auth.js do /contexts
  
  
  const { logado, Logar, setEmail, setSenha  } = useContext(ContextoDeAutenticacao);
  console.log(logado);

  


  function handleLogin(){
    Logar()
  }

  return (
    <>
    <div className="botaoVoltar">
    <Link className="btnVoltar" to="/"><RiArrowLeftLine className="butt"/></Link>
    </div>
    <body>
      <div className="container">
      <img src={Vetor} alt="FluffyCadastro"/>
      <div className="containerInfo">
        <h1>Cadastre-se agora mesmo</h1>
      </div>

      <form onSubmit={handleLogin}>
      <div className="containerInputs">

          <div className="inputMedio">
          <div className="infoInput"><h6>Email</h6></div>
          <input type="email" placeholder="Use o seu email" onChange={(valor)=>setEmail(valor.target.value)}/>
          </div>

          <div className="inputMedio">
          <div className="infoInput"><h6>Senha</h6></div>
          <input type="password" placeholder="Digite a sua senha" onChange={(valor)=>setSenha(valor.target.value)}/>
          </div>

        <Link style={{color:"#96A8FC", marginTop: 30,fontWeight:"500"}} to="/cadastro">Ainda não tenho conta</Link>

          <Link className="linkBotao" style={{marginTop: 30,fontWeight: "500"}} to="/dashboard" onClick={handleLogin}>Autenticar</Link>
      </div>
    </form>
    </div>
   
    </body>
    </>
  )
}

export default Login;