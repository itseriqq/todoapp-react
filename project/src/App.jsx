import { useState } from "react";
import "./styles.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function App() {
  const [itemList, setItemList] = useState([]);
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
    <Container fluid>
      <div className="forms">

      
      <Row>
        <Col xs={12} className="d-flex justify-content center align-items-center flex-column">
          <h1 className="mt-4">To-do App</h1>
          <a className="link" href="http://itseriqq.github.io/portfolio" rel="noreferrer" target="_blank"><h2>Erick.dev</h2></a>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col xs={8} className="ps-4 pe-0">
          <div className="w-100">
            <input className="w-100 tarefa" type="text" placeholder="Qual sua tarefa?" value={inputText} onChange={(e) => setInputText(e.target.value)} />
          </div>
        </Col>
        <Col xs={4} className="ps-3 pe-0">
          <button className="botaoAdicionarItem" onClick={handleAdicionaItem}>Add</button>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <div className="w-100">
            <ul className= "lista">
              {itemList.map((item) => (
                <Row>
                  <Col p-0  xs={12}>
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
