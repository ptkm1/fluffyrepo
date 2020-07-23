import React from 'react';
import Dashboard from '../pages/dashboard/index';
import myLivros from '../pages/posAutenticado/meusLivros';
import adicionarLivros from '../pages/posAutenticado/adicionarLivros';
import alterarLivros from '../pages/posAutenticado/alterarLivros';
import listarlivro from '../pages/posAutenticado/lerLivro';
import notificacoes from '../pages/posAutenticado/notificacoes'
import favoritos from '../pages/posAutenticado/favoritos';

import {BrowserRouter as Router,Switch,Route, Redirect} from "react-router-dom";


export default function Autorizado(){
  const link = window.location.pathname;
  
  if(link === "/" || link === "/autenticar" || link === "/cadastro"){
    return <Redirect to="/dashboard" />
  }
  
  return (
    <Router>
    <Switch>
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/listarlivro" component={listarlivro} />
          <Route path="/meuslivros" component={myLivros} />
          <Route path='/novolivro' component={adicionarLivros} />
          <Route path='/alterarlivro' component={alterarLivros} />
          <Route path='/favoritos' component={favoritos} />
          <Route path='/notificacoes' component={notificacoes} />
      </Switch>
    </Router>
  );
}