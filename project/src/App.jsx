import { useState } from "react";
import "./styles.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from "uuid";
import { BiX } from 'react-icons/bi';
import { BiPencil } from 'react-icons/bi';
import { BiCheck } from 'react-icons/bi';


function App() {
  const [itemList, setItemList] = useState(JSON.parse(localStorage.getItem("itemList")) || []);
  const [inputText, setInputText] = useState("");
  const [editedItem, setEditedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [itemCategory, setCategoryItem] = useState("");
  const [categoryColor, setCategoryColor] = useState("");

  function handleAdicionaItem() {
    const textoSemEspacos = inputText.trim()
    if (textoSemEspacos === "") return;

    let newItem = {
      id: uuidv4(),
      itemList: textoSemEspacos,
      title: inputText,
      completed: false,
      category: itemCategory,
      color: categoryColor
    };

    setItemList([...itemList, newItem]);
    setInputText("");
    setCategoryColor("");
    setCategoryItem("");

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
    setInputText(item.itemList)
    setCategoryItem(item.category);
    setCategoryColor(item.color);
  };

  const handleUpdateItem = () => {
    const updatedList = itemList.map((item) =>
      item.id === editedItem.id
        ? {
          ...item,
          itemList: inputText,
          category: itemCategory,
          color: categoryColor,
        }
        : item
    );
    setItemList(updatedList);
    setIsEditing(false);
    setInputText("");
    setEditedItem(null);
    setCategoryItem("")
    setCategoryColor("");
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

        <Row className="mb-3">
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="w-100 tarefainput pe-3">
              <input
                className="w-100 tarefa"
                type="text"
                placeholder="Qual sua tarefa?"
                value={isEditing ? editedItem.itemList : inputText}
                onChange={(e) => {
                  if (isEditing) {
                    setEditedItem({ ...editedItem, itemList: e.target.value });
                  } else {
                    setInputText(e.target.value);
                  }
                }}
              />
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={10} sm={10} md={10} lg={10}>
            <div className="categoriainput w-100 pe-3">
              <input
                className="w-100 tarefa"
                type="text"
                placeholder="Qual categoria?"
                value={isEditing ? editedItem.category : itemCategory}
                onChange={(e) => {
                  if (isEditing) {
                    setEditedItem({ ...editedItem, category: e.target.value });
                  } else {
                    setCategoryItem(e.target.value);
                  }
                }}
              />
            </div>
          </Col>
          <Col>
            <input type="color" className="form-control form-control-color" id="exampleColorInput" value="#000" 
          
            onChange={(e) => {
              if (isEditing) {
                setEditedItem({ ...editedItem, color: e.target.value});
              } else {
                setCategoryColor(e.target.value);
              }
            }}

            title="Cor da categoria"></input>
          </Col>
        </Row>

        <Row >
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="pe-4">
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

                      <li className={`${item.completed ? 'concluido' : ''}`} key={item.id}>

                        <div className="categoria" style={{backgroundColor: item.color ? item.color : "#e5fec5", }}>
                          <div className="texto" style={{color: item.color ? "white" : "black"}}>
                            {item.category}
                          </div>
                        </div>

                        <div className="item">
                          <div className="texto">:
                            {item.itemList}
                          </div>

                          <div className="botoesTask">
                            <button className="concluirItem" onClick={() => handleConcluirItem(item.id)}>
                              <BiCheck />
                            </button>

                            <button className="editarItem" onClick={() => handleEditarItem(item)}>
                              <BiPencil />
                            </button>

                            <button className="excluirItem" onClick={() => handleExcluirItem(item)}>
                              <BiX />
                            </button>
                          </div>
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
