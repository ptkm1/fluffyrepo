import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import './style.css';
import {RiArrowDownSLine,RiSearch2Line} from 'react-icons/ri';
import api from '../../services/api';
import Menu from '../../components/menu';
import Scrollable from 'hide-scrollbar-react';

function Dashboard() {
  const [feed, setFeed] = useState([])
  const [arr, setArr] = useState([])

  useEffect(()=>{

    async function ListarLivros(){
      try{
        const {data} = await api.get('/feed')
        setFeed(data);

          //data[1], eu pego o livro numero 1 da lista, e vou no objeto comentarios, dentro desse objeto haverá um array de comentarios
        const aux = JSON.parse(data[1].comentarios)
        const comentarios = aux['comments'] //mesma coisa q aux.comments
        setArr(comentarios);
      }catch(err){
        if(err.response)
        console.log(err.response.data);
      }
      
    }
    ListarLivros()
  },[])

  return (
    <>
    <body>
    
    <Menu />

    <div className="conteudoDashboard">

    <div className="Livros">
      <div className="headline">
      <h1>Descubra Livros</h1>
      <form style={{display:"flex",alignItems:"center"}}>
      <button type="submit"><RiSearch2Line className="search" color="white"/></button>
      <input type="search"/>
      </form>
      
      </div>


<div className="Feed">
<Scrollable className="scrollbar">
{ feed.map((res)=>{
    return(
      <div key={res.id} className="livro">
        <div className="livroInformacao">
          <h4>{res.nome_livro}</h4>
          <h3>{res.autor}</h3>
          <p>{res.descricao_livro}</p>
        </div>
      <Link className="linkBotao" to={`/listarlivro/${res.id}`}>Ler</Link>
    </div>)
}) }

    </Scrollable>
</div>

<div style={{color: "#506EFA"}}>
      <h3 style={{fontSize:15}}><RiArrowDownSLine size="25"/></h3>
    </div>

    </div>

    <div className="categorias">
      <h1>Categorias</h1>
        <ul>
          <li>Aventura<div className="color um"></div></li>
          <li>Comédia<div className="color dois"></div></li>
          <li>SCI-FI<div className="color tres"></div></li>
          <li>Romance<div className="color quatro"></div></li>
          <li>Fantasia<div className="color cinco"></div></li>
          <li>Política<div className="color seis"></div></li>
          <li>Filosofia<div className="color sete"></div></li>
        </ul>
    </div>

    </div>
    
    </body>
    </>
  );
}

export default Dashboard;