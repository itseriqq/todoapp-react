import { useState } from "react";
import "./styles.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { v4 as uuidv4 } from "uuid";
import { BiTrash } from 'react-icons/bi';
import { BiPencil } from 'react-icons/bi';
import { BiCheck } from 'react-icons/bi';


function App() {
  const [itemList, setItemList] = useState( JSON.parse(localStorage.getItem("itemList")) || []);
  const [inputText, setInputText] = useState("");
  const [editedItem, setEditedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  function handleAdicionaItem() {
    const textoSemEspacos = inputText.trim()
    if (textoSemEspacos === "") return;

    let newItem = {
      id: uuidv4(),
      itemList: textoSemEspacos,
      title: inputText,
      completed: false
    };

    setItemList([...itemList, newItem]);
    setInputText("");
    localStorage.setItem("itemList", JSON.stringify([...itemList, newItem]));
  }

  function handleExcluirItem(item) {
    const updatedList = itemList.filter((lista) => lista !== item);
    setItemList(updatedList);
    localStorage.setItem("itemList", JSON.stringify(updatedList));
  }

  function handleConcluirItem(id) {
    const updatedList = itemList.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItemList(updatedList);
    localStorage.setItem("itemList", JSON.stringify(updatedList));
  }

  const handleEditarItem = (item) => {
    setEditedItem(item);
    setIsEditing(true);
  };

  const handleUpdateItem = () => {
    const updatedList = itemList.map((item) =>
      item.id === editedItem.id ? { ...item, itemList: editedItem.itemList } : item
    );
    setItemList(updatedList);
    setIsEditing(false);
    setInputText("");
    setEditedItem(null);
    localStorage.setItem("itemList", JSON.stringify(updatedList));
  };

  return (
    <Container>
      <div className="forms">

        <Row>
          <Col xs={12}>
            <div className="d-flex justify-content center align-items-center flex-column">
              <h1 className="mt-4">To-do App</h1>
              <a className="link" href="http://itseriqq.github.io/portfolio" rel="noreferrer" target="_blank"><h2>Erick.dev</h2></a>
            </div>
          </Col>
        </Row>

        <Row >
          <Col xs={6} sm={8} md={8} lg={8} className="ps-4 pe-0">
            <div className="w-100">
              <input className="w-100 tarefa" type="text" placeholder="Qual sua tarefa?" value={isEditing ? editedItem.itemList : inputText}
                onChange={(e) => {
                  if (isEditing) {
                    setEditedItem({ ...editedItem, itemList: e.target.value });
                  } else {
                    setInputText(e.target.value);
                  }
                }} />
            </div>
          </Col>
          <Col xs={6} sm={4} md={4} lg={4}>
            <div className="pe-0 pe-4">
              <button className="botaoAdicionarItem" onClick={isEditing ? handleUpdateItem : handleAdicionaItem}>{isEditing ? "Ok" : "Add"}</button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <div className="w-100">
              <ul className="lista">
                {itemList.map((item) => (
                  <Row>
                    <Col xs={12} className="pe-4 ps-4">
                      <li className={`item ${item.completed ? 'concluido' : ''}`} key={item.id}>
                        {item.itemList}
                        <div className="botoesTask">
                          <button className="concluirItem" onClick={() => handleConcluirItem(item.id)}>
                            <BiCheck />
                          </button>

                          <button className="editarItem" onClick={() => handleEditarItem(item)}>
                            <BiPencil />
                          </button>

                          <button className="excluirItem" onClick={() => handleExcluirItem(item)}>
                            <BiTrash />
                          </button>

                        </div>
                      </li>
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
