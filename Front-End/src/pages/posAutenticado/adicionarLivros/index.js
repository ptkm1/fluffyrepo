/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState} from 'react';
import Menu from '../../../components/menu';
import './style.css';
import api from '../../../services/api';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { RiArrowLeftLine } from "react-icons/ri";
import {useHistory} from 'react-router-dom';

function adicionarLivros() {
    const [value, setValue] = useState('');
    const [nomeLivro, setNomeLivro] = useState('');
    const [descricaoLivro, setDescricaoLivro] = useState('');
    const [categoria, setCategoria] = useState('');
    const url = "/livro"
    const timeInMs = Date.now();
    const data = {nome_livro:nomeLivro, descricao_livro:descricaoLivro, datapostagem:timeInMs,conteudo:value,categoria:categoria}
    //Pegando o id do usuário e enviando para o headers na requisição post abaixo
    const id_usuario = localStorage.getItem('@Fluffy:usuario')
    const aux = JSON.parse(id_usuario)



    const history = useHistory();

    async function criarLivro(){
      try{
        const response = await api.post(url, data ,{
          headers: {
            'user': `${aux.id}`
          },
        });

        console.log(response);
        return window.location.href = "/meuslivros"
        

      }catch(error){
        console.log(error);
      }
      


    }
     function editorMuda(e, editor){
      setValue(editor.getData());
      console.log(value)
    }

  return (
    <>
    <body>
    <Menu />

      <div className="editor">
    <div className="toRow">

        <button className="btnBack" onClick={() => history.goBack()}><RiArrowLeftLine color="#506EFA" size="20px" /></button>
        <div className="conteudoEditor">

        <div id="historia" className="historia" >
            <CKEditor
              editor={ClassicEditor}
              onChange={editorMuda}
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
          <button className="btnAlterar" onClick={criarLivro}>Atualizar o Livro</button>
        </div>
      </div>
  </div>

      </div>
    </body>
    </>
  );
}

export default adicionarLivros;