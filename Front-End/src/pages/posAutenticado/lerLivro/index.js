/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react';
import Scrollable from 'hide-scrollbar-react';
import {useHistory} from 'react-router-dom';
import Menu from '../../../components/menu';
import './lerlivro.css'
import api from '../../../services/api';
//import { BrowserHistory } from 'react-history'
import { RiArrowLeftLine,RiHeart2Line,RiStarLine } from "react-icons/ri";

function lerLivro() {

  const [value, setValue] = useState('');
  const [nomeLivro, setNomeLivro] = useState('');
  const [descricao,setDescricao] = useState('');
  const url = window.location.href;
  const splitURL = url.split('/');
  const history = useHistory();

  const [arr, setArr] = useState([])
  const [categoriaLivro,setCategoriaLivro] = useState([])
  const [curtidas,setCurtidas] = useState([])

  const [comenta,setComenta] = useState('');

   //Pegando o id do usuário e enviando para o headers na requisição post abaixo
   const id_usuario = localStorage.getItem('@Fluffy:usuario')
   const aux = JSON.parse(id_usuario)

  function createMarkup(){
    return {__html: value};
  }
 

  useEffect(()=>{

    async function buscaDadosLivro(){
      try{
        const response = await api.get(`/listarlivro/${splitURL[4]}`)
        setValue(response.data[0].conteudo);
        setNomeLivro(response.data[0].nome_livro);
        setDescricao(response.data[0].descricao_livro);
        setCategoriaLivro(response.data[0].categoria);
        setCurtidas(response.data[0].curtidas);

        const comentarioString = response.data[0].comentarios
        const convertParaObjeto = JSON.parse(comentarioString)
        setArr(convertParaObjeto);
      }catch(error){
        console.log(error);
      }

    }

    async function listaComentarios(){
      try{
        const response = await api.get(`/listacomentarios/${splitURL[4]}`)
        const comentarioString = response.data[0].comentarios
        const convertParaObjeto = JSON.parse(comentarioString)
      }catch(error){
        console.log(error)
      }
    }

      listaComentarios();
      buscaDadosLivro();
      
      
},[arr])

 async function addComentario(){

    const comentario = {comentarioNovo: comenta}

    try{
      const response = await api.put(`/comentario/${splitURL[4]}`, comentario ,{
        headers: {
          'user': `${aux.id}`
        },
      })
      console.log(response, "Comentario adicionado :D")
    }catch(error){
      console.log(error)
    }
  }

  return (
    <body>
      <Menu />

      <div className="livroCompleto">
        
        <button className="btnBack" onClick={() => history.goBack()}><RiArrowLeftLine color="#506EFA" size="20px" /> Voltar</button>
        <div className="Livros">
            <div className="headline" style={{marginBottom: 15, display: "flex", flexDirection: "column"}}>
              <h1 style={{fontSize: 22, width: "max-content"}}>{nomeLivro}</h1>
              <h2 style={{fontSize: 17, width: "70%", marginTop: 15}}>{descricao}</h2>
            </div>
        </div>
        <div className="conteudoLivro" dangerouslySetInnerHTML={createMarkup()}>
        </div>

      </div>

      <div className="aside">
        <div className="infoebtns">
          <button className="favorit">Favoritar <RiHeart2Line /></button>
      <div className="dados">
            <div style={{display: "flex", marginBottom: "5px"}}>
            <h1 style={{color:"#506efa",marginRight:"15px"}}>{curtidas} <RiStarLine color="#506efa" /></h1>
            <h1 style={{color:"#506efa",marginRight:"5px"}}>{curtidas} <RiHeart2Line color="#506efa" /></h1>
            </div>
            <div className="categoriaLivro">
              <h5>{categoriaLivro}</h5> <div style={{borderRadius: 100, background: "#A0616A", width:"20px", height:"20px"}}></div>
            </div>
          </div>
        </div>
        <Scrollable style={{height: '100%',paddingBottom: '75px'}} className="scrollbar">
        <div className="addComent">
        
          <div className="content">
            
          <div className="comentarioTitulo" ><h3>Comente</h3></div>
            <textarea cols="30" rows="10" className="fazerComentario" type="text" name="titulo" id="titulo" onChange={(valor)=>setComenta(valor.target.value)} />
            <button className="addComentario" onClick={addComentario} >Adiciona</button>
          </div>
          
        </div>
        
        { arr.map((res)=>{

          const data = res;

          return(

          <div className="comentarios">
      <div className="comentarioPerfil">
        <div className="comentarioPerfilImg">
          
        </div>
        <h3 className="comentarioUsuario">{data.usuario.nome}</h3>
      </div>
        <p className="comentarioMensagem">{data.comentario}</p>
    </div>
          )
        }) }    
</Scrollable>
      </div>

    </body>
  );
}

export default lerLivro;