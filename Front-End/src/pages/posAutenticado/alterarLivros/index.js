/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState, useEffect} from 'react';
import Menu from '../../../components/menu';
import {useHistory} from 'react-router-dom';
import './style.css'
import api from '../../../services/api';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { RiArrowLeftLine } from "react-icons/ri";



function alterarLivros() {

    const [value, setValue] = useState('');
    const [nomeLivro, setNomeLivro] = useState('');
    const [descricaoLivro, setDescricaoLivro] = useState('');
    const [categoria, setCategoria] = useState('');
    const data = {nome_livro:nomeLivro, descricao_livro:"descriçaodeteste", datapostagem:"09/07/2020",conteudo:value}
    //Pegando o id do usuário e enviando para o headers na requisição post abaixo
    const id_usuario = localStorage.getItem('@Fluffy:usuario')
    const aux = JSON.parse(id_usuario)
    const history = useHistory();

    const url = window.location.href;
    const splitURL = url.split('/');

    function voltar(){
      history.goBack()
    }



    async function atualizaLivros(){
      try{
        await api.put(`atualizarlivro/${splitURL[4]}`, data ,{
          headers: {
            'user': `${aux.id}`
          },
        });
        return voltar();

      }catch(error){
        console.log(error);
      }
    }

useEffect(()=>{

    async function buscaDadosLivro(){
        

      try{
        const response = await api.get(`/listarlivro/${splitURL[4]}`)

        console.log(response.data[0].conteudo);
        setValue(response.data[0].conteudo)
        setNomeLivro(response.data[0].nome_livro)
        setCategoria(response.data[0].categoria)
        setDescricaoLivro(response.data[0].descricao_livro)
    
      }catch(error){
        console.log(error);
      }

    }
      buscaDadosLivro();

},[])
   


  function editorMuda(e, editor){
    setValue(editor.getData());
    console.log(value)
  }


  return(
    <>
    <body>
    <Menu />

      <div className="editor">
  <div className="toRow">
        
        <button className="btnBack" onClick={() => history.goBack()}><RiArrowLeftLine color="#506EFA" size="20px" /></button>
        <div className="conteudoEditor">
        
        

          <div id="historia" className="historia">


            <CKEditor
              editor={ClassicEditor}
              onChange={editorMuda}
              data={value}
            />

          </div>

        </div>

      <div className="alterarInformacoes">
      <div className="atualizarInformacoes">
         
          <div className="inputsAlterar">
          <div className="infoInputAlterar"><h6>Título do seu livro</h6></div>
          <input className="inputAlterar" type="text" value={nomeLivro} id="titulo" onChange={(valor)=>setNomeLivro(valor.target.value)} />

        </div>
        <div className="inputsAlterar">
          <div className="infoInputAlterar" ><h6 >Categoria</h6></div>
          <input className="inputAlterar" type="text" value={categoria} id="titulo" onChange={(valor)=>setCategoria(valor.target.value)} />
        </div>
        

        <div className="inputsAlterar">
          <div className="infoInputAlterar"><h6>Descrição do seu Livro</h6></div>
          <textarea className="descricaoAlterar" type="text" value={descricaoLivro} id="titulo" onChange={(valor)=>setDescricaoLivro(valor.target.value)} />
        </div>
          <button className="btnAlterar" onClick={atualizaLivros}>Atualizar o Livro</button>
        </div>
      </div>
  </div>

      </div>
    </body>
    </>
  );
}

export default alterarLivros;