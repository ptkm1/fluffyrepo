/* eslint-disable react-hooks/rules-of-hooks */
import React, {useContext} from 'react';
import {Link, NavLink, Redirect} from 'react-router-dom';
import Logo from '../../media/Logo.svg'
import {RiLogoutCircleLine,RiBookOpenLine,RiBookLine,RiHeartLine,RiNotification2Line} from 'react-icons/ri';
import ContextoDeAutenticacao from '../../contexts/auth';
import './menu.css';
function menu() {
const {usuario} = useContext(ContextoDeAutenticacao);


  function deslogar(){
    localStorage.clear() 
    return window.location.href = "/"
  }

  return (
    <div className="menu">
      <div className="perfil">
          <div className="img">
            <img src='https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShaggyMullet&accessoriesType=Prescription02&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Side&eyebrowType=UnibrowNatural&mouthType=Smile&skinColor=Pale' style={{resize:"both", width: "100%", height: "100%"}} alt="Fluffy"/>
          </div>
            {usuario.nome}
            <button className="botaoDeslogar" onClick={deslogar} ><RiLogoutCircleLine size="20px" /> Sair</button>
          </div>
      <div className="botoesMenu">
        <NavLink className="btnMenu" activeClassName="btnMenuActive" id="selecionado" to="/dashboard"> <RiBookOpenLine className="iconMenu" /> Descobrir</NavLink>
        <NavLink className="btnMenu" activeClassName="btnMenuActive" to="/meuslivros"><RiBookLine className="iconMenu"/>Meus Livros</NavLink>
        <NavLink className="btnMenu" activeClassName="btnMenuActive" to="/favoritos"><RiHeartLine className="iconMenu"/>Favoritos</NavLink>
        <NavLink className="btnMenu" activeClassName="btnMenuActive" to="/notificacoes"><RiNotification2Line className="iconMenu"/>Notificações</NavLink>
      </div>
      <img src={Logo} alt="Fluffy"/>  
    </div>
  );
}

export default menu;