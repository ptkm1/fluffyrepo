import React from 'react';
import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom";
//PÁGINAS || PAGES
import Login from '../pages/autenticar/index';
import Home from '../pages/home/index';
import Cadastro from '../pages/cadastrar/index';

export default function NaoAutenticado(){
  const link = window.location.pathname;


    if(link === "/dashboard" || link === "/meuslivros" || link === "/novolivro" || link === "/listarlivro"){
      return <Redirect to="/"/>
    } 
  

  return (
    <Router>
      <Redirect to="/" />
    <Switch>
        <Route path="/" exact component={Home} />
          <Route path="/cadastro" component={Cadastro} />
            <Route path="/autenticar"  component={Login} />
      </Switch>
    </Router>
  );
}