import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import logo from "./logo.svg";
import "./App.css";
import { getAllCards, addCardToDB, moveCardInDB } from "./db/cards.db";
import CardForm from "./CardForm";
const cardColor = "#fff1b3";
const hoverColor = "#dfd19c";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      selectedCard: { title: "" }
    };
    this.addCard = this.addCard.bind(this);
    this.getCardByID = this.getCardByID.bind(this);
    this.getCardsByStatus = this.getCardsByStatus.bind(this);
    this.setCard = this.setCard.bind(this);
  }

  componentDidMount() {
    getAllCards().then(cards => {
      this.setState({ cards });
    });
  }

  addCard(card) {
    addCardToDB(card).then(cards => {
      this.setState({ cards });
    });
  }

  getCardByID(cardID) {
    return this.state.cards.find(card => card.id === cardID);
  }

  getCardsByStatus(status) {
    return this.state.cards.filter(card => card.status === status);
  }

  setCard(card) {
    this.setState({ selectedCard: card });

    const selCardID = card.id;
    this.state.cards.forEach(aCard => {
      if (aCard.id === selCardID) {
        document.getElementById(aCard.id).style.backgroundColor =
          "rgb(255, 213, 73)";
      } else {
        document.getElementById(aCard.id).style.backgroundColor = cardColor;
      }
    });
  }

  moveCard(direction) {
    if (this.state.selectedCard) {
      const { selectedCard } = this.state;
      const selStatus = selectedCard.status;
      const cardID = selectedCard.id;
      let newStatus = "";

      if (direction === "left") {
        switch (selStatus) {
          case "queue":
            newStatus = "queue";
            break;
          case "prog":
            newStatus = "queue";
            break;
          case "done":
            newStatus = "prog";
            break;
        }
      } else if (direction === "right") {
        switch (selStatus) {
          case "queue":
            newStatus = "prog";
            break;
          case "prog":
            newStatus = "done";
            break;
          case "done":
            newStatus = "done";
            break;
        }
      }
      moveCardInDB(cardID, newStatus).then(cards => {
        this.setState({ cards });

        this.state.cards.forEach(aCard => {
          if (aCard.id === cardID) {
            document.getElementById(aCard.id).style.backgroundColor =
              "rgb(255, 213, 73)";
          } else {
            document.getElementById(aCard.id).style.backgroundColor = cardColor;
          }
        });
      });
    }
  }

  render() {
    const qCards = this.getCardsByStatus("queue");
    const pCards = this.getCardsByStatus("prog");
    const dCards = this.getCardsByStatus("done");

    let displayStatus = "";
    switch (this.state.selectedCard.status) {
      case "queue":
        displayStatus = ":  Queue";
        break;
      case "prog":
        displayStatus = ":  In Progress";
        break;
      case "done":
        displayStatus = ":  Done";
        break;
      default:
        displayStatus = "";
        break;
    }

    return (
      <div className="boardWrapper">
        <div className="wrapper">
          <div className="queue">
            <div className="colTitle">Queue</div>
            <div className="listBox" id="qList">
              <ListCards cards={qCards} setCard={this.setCard} />
            </div>
          </div>
          <div className="prog">
            <div className="colTitle">In Progress</div>
            <div className="listBox" id="pList">
              <ListCards cards={pCards} setCard={this.setCard} />
            </div>
          </div>
          <div className="done">
            <div className="colTitle">Done</div>
            <div className="listBox" id="dList">
              <ListCards cards={dCards} setCard={this.setCard} />
            </div>
          </div>
        </div>
        <img
          src="http://www.crschemicalcorp.com/uploads/bg_black_gradient.jpg"
          alt=""
          className="gradBar"
          id="gradBar1"
        />
        <div className="formWrapper">
          <img
            onClick={() => {
              this.moveCard("left");
            }}
            id="moveLeft"
            className="arrow"
            // src="http://pixsector.com/cache/8ed3eed7/avb6b6c2625bcda563bf1.png"
            src="http://pixsector.com/cache/85c25e82/av668d1791f7ab43c8268.png"
            alt=""
          />
          <div id="cardDisplay">
            <h2 id="displayText">
              {this.state.selectedCard.title + displayStatus}
            </h2>
          </div>
          <img
            onClick={() => {
              this.moveCard("right");
            }}
            id="moveRight"
            className="arrow"
            // src="http://pixsector.com/cache/d317f9c9/avefdb1ad8fbf8d8b72a2.png"
            src="http://pixsector.com/cache/fdcadf05/avd5f611c08d803886a54.png"
            alt=""
          />
        </div>
        <img
          src="http://www.crschemicalcorp.com/uploads/bg_black_gradient.jpg"
          alt=""
          className="gradBar"
          id="gradBar2"
        />
        <div id="cardForm">
          <CardForm addCard={this.addCard} />
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img
            src="https://cdn.dribbble.com/users/1539273/screenshots/3889575/banana.gif"
            alt="logo"
            className="App-logo"
          />
          <h1 className="App-title">KANBANANA</h1>
        </header>
        <Board />
      </div>
    );
  }
}

function ListCards(props) {
  const { setCard } = props;
  console.log("props ", props);
  return props.cards.map(card => (
    <div
      onClick={() => {
        setCard(card);
      }}
      className="card"
      key={card.id}
      id={card.id}
    >
      <ul>
        <h3 className="cardTitle">{card.title}</h3>
      </ul>
      <ul>Priority: {card.priority}</ul>
      <ul>Created By: {card.createdBy}</ul>
      <ul>Assigned To: {card.assignedTo}</ul>
    </div>
  ));
}
export default App;
