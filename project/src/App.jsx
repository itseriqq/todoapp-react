import { useState } from "react";
import "./styles.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function App() {
  const [itemList, setItemList] = useState([]);
  const [input, setInput] = useState("");
  const [inputText, setInputText] = useState("");

  function handleAdicionaItem() {
    const textoSemEspacos = inputText.trim()
    if (textoSemEspacos === "") return;

    let newItem = {
      id: Date.now(),
      itemList: textoSemEspacos,
    };

    setItemList([...itemList, newItem]);
    setInputText("");
  }

  function handleExcluirItem(item) {
    setItemList((prevList) => prevList.filter((lista) => lista !== item));
  }

  return (
    <Container>
      <div className="forms">

      
      <Row>
        <Col xs={12}>
            <div  className="d-flex justify-content center align-items-center flex-column">
            <h1 className="mt-4">To-do App</h1>
            <a className="link" href="http://itseriqq.github.io/portfolio" rel="noreferrer" target="_blank"><h2>Erick.dev</h2></a>
          </div>
        </Col>
      </Row>

      <Row >
        <Col xs={6} sm={8} md={8} lg={8} className="ps-4 pe-0">
          <div className="w-100">
            <input className="w-100 tarefa" type="text" placeholder="Qual sua tarefa?" value={inputText} onChange={(e) => setInputText(e.target.value)} />
          </div>
        </Col>
        <Col xs={6} sm={4} md={4} lg={4}>
          <div className="pe-0 pe-4">
            <button className="botaoAdicionarItem" onClick={handleAdicionaItem}>Add</button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <div className="w-100">
            <ul className= "lista">
              {itemList.map((item) => (
                <Row>
                  <Col xs={12} className="pe-4 ps-4">
                    <li className="item" key={item.id}>
                      {item.itemList} <button className="excluirItem" onClick={() => handleExcluirItem(item)}>X</button>{" "}</li>
                  </Col>
                </Row>
              ))}
            </ul>
          </div>
                
        </Col>
      </Row>

      </div>
    </Container>
  );
}

export default App;
