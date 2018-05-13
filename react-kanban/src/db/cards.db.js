const cardsDB = [
  {
    id: 1,
    title: "Bla",
    priority: "low",
    status: "queue",
    createdBy: "Bob Blabson",
    assignedTo: ""
  },
  {
    id: 2,
    title: "BlaBla",
    priority: "medium",
    status: "prog",
    createdBy: "Hoopy Frood",
    assignedTo: "Some Dude"
  },
  {
    id: 3,
    title: "BlaBlaBla",
    priority: "high",
    status: "done",
    createdBy: "Banana Man",
    assignedTo: "Ally McBlab"
  },
  {
    id: 4,
    title: "BlaBlaBlaBla",
    priority: "block",
    status: "prog",
    createdBy: "Lady Blabla",
    assignedTo: "Fiddlydinks"
  }
];

let newID = 5;

export const getAllCards = () =>
  new Promise((resolve, reject) => {
    resolve(cardsDB.slice());
  });

export const addCardToDB = card =>
  new Promise((resolve, reject) => {
    card.id = newID;
    newID++;
    cardsDB.push(card);
    resolve(cardsDB);
  });
