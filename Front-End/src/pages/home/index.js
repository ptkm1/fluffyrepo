import React from 'react';
import Logo from '../../media/Logo.svg'
import Vetor from '../../media/vetor_home.svg'
import './style.css'
import {Link} from 'react-router-dom';

function Home() {
  return (
    <>
    <header>
      <img src={Logo} alt="Fluffy"/>
      <div className="menuHome">
        <Link className="linkComum" to="/">Início</Link>
        <Link className="linkComum" to="/">Como Funciona?</Link>
        <Link className="linkComum" to="/">Preços</Link>
        <Link className="linkBotao" to="/autenticar">Entrar</Link>
      </div>
    </header>

    <div className="conteudosH">

    <div className="esquerda">
    <h1><strong style={{color:"#506EFA"}}>Mostre seu talento</strong> de escritor para uma comunidade apaixonada por leitura totalmente de graça!</h1>
    <p>Aqui você pode publicar suas melhores histórias ou ler ótimos livros escrito por pessoas apaixonadas por leitura, criar metas e pedir ajuda aos que gostarem das suas histórias para doarem e ajudar você, e claro, ajudar outros escritores :)</p>
    <Link className="linkBotao" style={{marginTop: 15}} to="/cadastro">Conhecer melhor</Link>
    </div>

    <div className="direita">
      <img src={Vetor} alt="Fluffy"/>
    </div>
      


    </div>

    </>
  )
}

export default Home;