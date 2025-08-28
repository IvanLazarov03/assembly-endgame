import { useState } from "react";
import "./tenzies.css";
import Die from "./Dice.jsx";
import { nanoid } from "nanoid"; // Import nanoid for unique IDs
import Confetti from "react-confetti-boom"; // Import Confetti for celebration effect
import { useRef, useEffect } from "react";
import GameSwitch from "./GameSwitch.jsx";
import Footer from "./Footer.jsx";

function App() {
  const [dice, setDice] = useState(generateAllNewDice());

  //checking is the game is won
  const isGameWon = dice.every(
    (die) => die.isHeld && die.value === dice[0].value
  );

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.floor(Math.random() * 6) + 1, //gerirame random vrednost od 1 do 6
      isHeld: false,
      id: nanoid(10), // generirame uniken ID za sekoja kocka vo zagradite izbirame od kolku karakteri da se sostoi ID-to
    }));
  }

  function rollDice() {
    setDice(
      dice.map((die) => {
        if (die.isHeld) {
          return die; // ako kockata ja drzime, ne ja menuvame
        }
        return {
          ...die,
          value: Math.floor(Math.random() * 6) + 1, // ako ne ja drzime, ja menuvame so nova vrednost
        };
      })
    );
  }

  function hold(id) {
    setDice(
      dice.map((die) => {
        if (die.id === id) {
          return { ...die, isHeld: !die.isHeld }; // vrakjame nov die objekt so promenuvanje na isHeld na sprotivno na toa shto e sega
        }
        return die; // vrati go originalniot objekt ako ID-to ne se pokriva
      })
    );
  }

  //na ovoj nacin se mapirat elementi od niza vo komponenta
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={hold}
      id={die.id}
    />
  ));

  //So useRef moze da izbereme element od DOM-ot i da mu pristapime direktno
  //so ovoj efekt se fokusira na newGame kopceto koga ke se zavrshi igrata
  //za da moze korisnikot da go izbere so tastaturata
  const newGameBtnRef = useRef(null); // Create a ref for the New Game button

  useEffect(() => {
    if (isGameWon && newGameBtnRef.current) {
      newGameBtnRef.current.focus(); //
    }
  }, [isGameWon]);

  return (
    <>
      {isGameWon ? ( //proveruvame dali igrata e zavrshena ako e zavrshena, ja prikazuvame poraka za pobeda
        <main>
          <Confetti mode="fall" />
          <div aria-live="polite" className="sr-only">
            {isGameWon && (
              <p>
                Congratulations ! You won ! Press "New Game " to start again.
              </p>
            )}
          </div>
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Congrats you won!</p>

          <div className="dices">{diceElements}</div>

          <button
            ref={newGameBtnRef}
            className="roll-dice"
            onClick={() => setDice(generateAllNewDice())}
          >
            New Game
          </button>
        </main>
      ) : (
        //a ovde go prikazuvame glavniot del na igrata
        <main>
          <h1 className="title">Tenzies</h1>
          <p className="instructions">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>

          <div className="dices">{diceElements}</div>

          <button className="roll-dice" onClick={rollDice}>
            Roll
          </button>
        </main>
      )}
      <GameSwitch />
      <Footer />
    </>
  );
}

export default App;
