import React from 'react';
import Menu from '../../../components/menu';
import './style.css'
import img from '../../../media/404.svg'

function notificacoes() {
  return (
    <body>
      <Menu />
      
      <div className="favoritos">
        <img className="vetor404" src={img} alt="Fluffy"/>
        <h1 style={{marginTop: 15}}>pagina em construção</h1>
      </div>
    </body>
  )
}

export default notificacoes;