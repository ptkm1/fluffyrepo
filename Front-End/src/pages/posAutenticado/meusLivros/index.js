/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import api from '../../../services/api';
import Scrollable from 'hide-scrollbar-react';
import Menu from '../../../components/menu';
import ContextoDeAutenticacao from '../../../contexts/auth';

import {RiDeleteBin2Line} from 'react-icons/ri';


function myLivros() {

  const {usuario, setIdLivro} = useContext(ContextoDeAutenticacao);
  const nome = usuario.nome;
  const [meusLivros, setMeusLivros] = useState([]);

  //const idUser = localStorage.getItem('@Fluffy:usuario');
  //console.log(usuario.id)
 

  useEffect(() => { 
   async function ListaMeusLivros(){
    try{
        const response = await api.get('/perfil')
        const livro = response.data.livros;
        setMeusLivros(livro);
      }catch(erro){
        if(erro){
          console.log(erro);
        }
      }

    }
   
    ListaMeusLivros();
  }, [meusLivros])

      function alteraLivro(params){
        setIdLivro(params)
      }


      async function deletarLivro(params){
        console.log(params)
        try{
          const response = await api.delete(`deletarlivro/${params}`,{ headers:{
            user: usuario.id,
          } })
          console.log(response, "deletado com sucesso!");
        }catch(error){
          console.log(error);
        }
      }

  return (
    <>
      <body>
      <Menu />

        <div className="conteudoMeusLivros">

          <div className="Livros">
            <div className="headline" style={{marginBottom: 15}}>
              <h1>Minhas Escrituras</h1>
            </div>
          </div>


          <div className="Feed" style={{marginTop: 15}}>
          <div className="addLivro">
            <Link className="addLivroBtn" to="/novolivro">AddLivro</Link>
          </div>
            <Scrollable className="scrollbar">
              { meusLivros.filter(e=> e.autor === nome).map((res) => {
                console.log(res.id)
                return (
                  <div key={res.id} className="meuslivros">
                    <div className="livroInformacao">
                      <button className="btnDeleta" onClick={() => deletarLivro(res.id)}><RiDeleteBin2Line fontSize="20px" color="#506EFA" /> </button>
                     
                      <h4>{res.nome_livro}</h4>
                      <h3>{res.autor}</h3>
                      <p>{res.descricao_livro}</p>
                    </div>
                    <div>
                    <Link className="linkBotao"style={{marginBottom: 15}} onClick={alteraLivro(res.id)} to={`/alterarlivro/${res.id}`}>Editar</Link>
                    <Link className="linkBotao" to={`/listarlivro/${res.id}`}>Ler</Link>
                    </div>
                  </div>)
              }) }

            </Scrollable>
          </div>


        </div>
      </body>
    </>
  );
}

export default myLivros;