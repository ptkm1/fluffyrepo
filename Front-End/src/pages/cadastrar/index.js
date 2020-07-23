import React,{useState} from 'react';
import Vetor from '../../media/vetor_cadastro.svg'
import './style.css'
import {Link} from 'react-router-dom';
import api from '../../services/api';
import { RiArrowLeftLine } from "react-icons/ri";
import { render } from '@testing-library/react';



function Home() {
  const [nome,setNome] = useState('');
  const [email,setEmail] = useState('');
  const [senha,setSenha] = useState('')
  const [dataN,setDataN] = useState('');

  async function Cadastrar(){
    try{
 
     const response = await api.post('/cadastro',{
       nome:nome,
       email:email,
       senha:senha,
       datanascimento:dataN
     })
     
     //alert(`Voce foi cadastrado, seu nome: ${nome}`);
     return window.location.href = "/dashboard"
    }
    catch(error){ //DEBUG do ERRO
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
   }
  

  return (
    <>
    <div className="botaoVoltar">
      <Link className="btnVoltar" to="/"><RiArrowLeftLine className="butt"/></Link>
    </div>
    <body>
      <div className="containerC">
      <img src={Vetor} alt="FluffyCadastro"/>
      <div className="containerInfo">
        <h1>Cadastre-se agora mesmo</h1>
      </div>

      <form onSubmit={Cadastrar}>
      <div className="containerInputs">

          <div className="inputMedio">
          <div className="infoInput"><h6>Nome</h6></div>              
          <input type="text" name="nome" id="nome"  onChange={ e => setNome(e.target.value) } />
          </div>

          <div className="inputMedio">
          <div className="infoInput"><h6>Email</h6></div>
          <input type="email" name="email" id="email"  onChange={ e=>setEmail(e.target.value) } />
          </div>

          <div className="inputMedio">
          <div className="infoInput"><h6>Senha</h6></div>
          <input type="password" name="senha" id="senha" onChange={ e=>setSenha(e.target.value) }/>
          </div>

          <div className="inputMedio">
          <div className="infoInput"><h6>Aniversário</h6></div>
          <input type="date" name="dataNascimento" style={{paddingLeft:30, width:"315px"}}  onChange={ e=>setDataN(e.target.value) }/>
          </div>

          <Link className="linkBotao" style={{marginTop: 30,fontWeight: "400"}} to="#" onClick={Cadastrar} >Realizar Cadastro</Link>
      </div>
      </form>
      </div>
      </body>

    </>
  )
}

export default Home;