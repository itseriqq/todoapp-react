import { useState } from "react";
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./styles.css"

function App() {
  const [itemList , setItemList] = useState([]);
  const [inputText , setInputText] = useState("");

  function handleAdicionaItem(){
    const textoSemEspacos = inputText.trim()
    if(textoSemEspacos === "") return; 

    let newItem = {
      id: Date.now(),
      itemList: textoSemEspacos,
    };

    setItemList([...itemList, newItem]);
    setInputText("");
  }

  function handleExcluirItem(item){
    setItemList((prevList) => prevList.filter((lista) => lista !== item));
  }

  return (
    <Container>
    <div className="container">
      <h1>To-do App</h1>
      <a className="link" href="http://itseriqq.github.io/portfolio" rel="noreferrer" target="_blank"><h2>Erick.dev</h2></a>
    </div>
      <div>
      <Row>
      <Col xs={4} md={4} lg={4}>
      <input type="text" placeholder="Qual sua tarefa?" value={inputText} onChange={(e) => setInputText(e.target.value)}/>
      </Col>
      <Col xs={4} md={4} lg={4}>
      <button className="botaoAdicionarItem" onClick={handleAdicionaItem}>Add</button>
      </Col>
      </Row>
    </div>
    <div className="container">
    <ul className="lista">
      {itemList.map((item) =>(
        <li className="item" key={item.id}>
          {item.itemList} <button className="excluirItem" onClick={() => handleExcluirItem(item)}>X</button>{" "}</li>

      ))}
    </ul>
    </div>
    </Container>
  );
}

export default App;
