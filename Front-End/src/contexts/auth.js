import React,{ createContext, useState, useEffect } from 'react';
import api from '../services/api';
const ContextoDeAutenticacao = createContext({ logado: false, usuario: {} });
export function AuthProvider({children}){
  //Variaveis de estado
  const [usuario, setUsuario] = useState(null);
  const [email,setEmail] = useState('');
  const [senha,setSenha] = useState('');
  const [idLivro, setIdLivro] = useState('');
  //const [tituloLivro, setTituloLivro] = useState('');
  useEffect(()=>{
    async function verificaAutenticacao(req,res) {
    const usuario = localStorage.getItem('@Fluffy:usuario')
    const token = localStorage.getItem('@Fluffy:token')

        if(usuario && token){
          setUsuario(JSON.parse(usuario));
        } }    
    verificaAutenticacao()
  },[])
//Funções e Requisições
async function Logar() {
  try{
    const response = await api.post('/login', { email: email,senha: senha } )
    const {usuario, token} = response.data;
        localStorage.setItem('@Fluffy:usuario', JSON.stringify(usuario))
        localStorage.setItem('@Fluffy:token', token)
    setUsuario(usuario);
  }catch(err) {
      console.log(err.response.data);
  } }

  return (
  <ContextoDeAutenticacao.Provider 
  value={{ 
    logado:!! usuario,
    usuario,
    Logar, // <- Importando as variaveis de setState pelo context
    setEmail,
    setSenha, 
    setIdLivro,
    idLivro,
   }}>
    {children}
  </ContextoDeAutenticacao.Provider>
  );
}

export default ContextoDeAutenticacao;