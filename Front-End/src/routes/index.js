import React, {useContext} from 'react';
import NaoAutenticado from './usuarioSemAutorizacao';
import Autorizado from './usuarioAutenticado';
import ContextoDeAutenticacao from '../contexts/auth';

export default function Rotas(){
const { logado } = useContext(ContextoDeAutenticacao);
  return logado ? <Autorizado /> :  <NaoAutenticado/>
}