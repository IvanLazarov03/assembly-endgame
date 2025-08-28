import { languages } from "./language.js";
import { useState } from "react";
import clsx from "clsx";
import { getFarewellText } from "./utils.js";
import { getRandomWord } from "./utils.js";
import Confetti from "react-confetti-boom";
import GameSwitch from "./GameSwitch.jsx";
import Footer from "./Footer.jsx";
function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState(() => getRandomWord()); // vaka go inicijalizirame stejtot za samo pri prviot render da se izvrsi funkcijata

  const [guesedLetters, setGuesedLetters] = useState([]);

  const [farewellMessage, setFarewellMessage] = useState(""); // 👈 state za cuvanje na poslednata poraka samo koga e pogresna

  //Derived values
  //broime kolku pogresni pogodoci ima
  const incorrectGuesses = guesedLetters.filter(
    (letter) => !currentWord.toLocaleUpperCase().includes(letter) //vo nizata gi izvdvojuvame samo bukvite koi ne se del od zborot
  ).length;
  console.log(incorrectGuesses);

  //ovde proveruvame dali igrata e pobedena
  const isGameWon = currentWord
    .toUpperCase()
    .split("")
    .every((letter) => guesedLetters.includes(letter));

  //proveruvame dali igrata e izgubena
  const isGameLost = incorrectGuesses >= languages.length;

  //ovde gledame dali igrata e zavrsena
  let isGameOver;
  if (isGameWon || isGameLost) {
    isGameOver = true;
  } else {
    isGameOver = false;
  }

  //funkcija so koja zapocnuvame nova igra
  //ovde samo ja praznime nizata guesedLetters
  function newGame() {
    setCurrentWord(getRandomWord());
    setGuesedLetters([]);
  }

  const lastGuesedLetter = guesedLetters[guesedLetters.length - 1];
  const isLastGuessIncorect =
    lastGuesedLetter && !currentWord.toUpperCase().includes(lastGuesedLetter);

  function handleGuess(letter) {
    setGuesedLetters((prevItems) => {
      if (prevItems.includes(letter)) return prevItems;

      const updated = [...prevItems, letter];

      //ako e pogresna bukvata, samo togash setirame farewellMessage
      if (!currentWord.toUpperCase().includes(letter)) {
        const nextIncorrect = updated.filter(
          (l) => !currentWord.toUpperCase().includes(l)
        ).length;

        const revealedLang = languages[nextIncorrect - 1];
        if (revealedLang) {
          setFarewellMessage(getFarewellText(revealedLang.name) + " 👋");
        }
      }

      return updated;
    });
  }

  //ova isto taka moze da se napravi i so cssx i koristenje na klasi no na toj nacin sekogas ke bidat vcitani bukvite
  //a so ovoj nacin bukvite ke se vcituvat samo koga se pogodeni
  const letters = currentWord.split("").map((letter, index) => (
    <span className="letter" key={index}>
      {isGameOver
        ? letter.toLocaleUpperCase()
        : guesedLetters.includes(letter.toLocaleUpperCase())
        ? letter.toLocaleUpperCase()
        : ""}
    </span>
  ));

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const keyboardLetters = alphabet.split("").map((letter, index) => (
    <button
      aria-label={`letter ${letter}`}
      aria-disabled={guesedLetters.includes(letter)}
      disabled={isGameOver}
      onClick={() => handleGuess(letter)}
      className={clsx("keyboard-letter", {
        //a ovde na pocetokot ja davamame osnovnata klasa koja e keyboard-letter
        //ovde ja proveruvame dali bukvakata koja ja ima vo guesedLetters ja ima i vo currentWord i vo zavisnost od toa ja dodeluvame odredenata klasa
        correct:
          guesedLetters.includes(letter) &&
          currentWord.toLocaleUpperCase().includes(letter),
        //ovde go pravime sprotivnoto
        wrong:
          guesedLetters.includes(letter) &&
          !currentWord.toLocaleUpperCase().includes(letter),
      })}
      key={index}
    >
      {letter}
    </button>
  ));

  //imeto na variablata i imeto vo map funkcijata ne smee da e isto
  const languagesList = languages.map((language, index) => {
    const isRevealed = index < incorrectGuesses; //pri sekoja greska incorectGuesses se zgolemuva za 1 i so toa se otkriva edna nova jazik so toa shto incorectGuesses sekogas e pogolemmo od indeksot vo nizata
    return (
      <span
        className={clsx("chip", { lost: isRevealed })}
        key={language.name}
        style={{
          backgroundColor: language.backgroundColor,
          color: language.color,
        }}
      >
        {language.name}
      </span>
    );
  });

  return (
    <>
      {isGameWon && <Confetti mode="fall" />}
      <header>
        <h1>Assembly-Endgame</h1>
        <p>
          Guess the word within 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>

      <section
        aria-live="polite"
        role="status"
        className={clsx("game-status", {
          won: isGameWon,
          lost: isGameLost,
          farewell: isLastGuessIncorect,
        })}
      >
        {isGameOver ? (
          <>
            <h2>{isGameWon ? "You win 🎉" : "You lose!"}</h2>
            <p>
              {isGameWon ? "Well done!" : "Better start learning Assembly 💀"}
            </p>
          </>
        ) : (
          // 👇 sega prikazuvame samo ako poslednata pogodena bukva e pogresna
          isLastGuessIncorect && farewellMessage && <h2>{farewellMessage}</h2>
        )}
      </section>

      <section className="language-chips">{languagesList}</section>

      <section className="word">{letters}</section>

      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {currentWord.includes(lastGuesedLetter)
            ? `Correct the letter ${lastGuesedLetter} is in the word`
            : `Sorry the letter ${lastGuesedLetter} is not in the word`}
          You have {languages.length - 1} guesses left.
        </p>
        <p>
          Current word :{" "}
          {currentWord
            .split("")
            .map((letter) =>
              guesedLetters.includes(letter) ? letter + "." : "blank."
            )
            .join(" ")}
        </p>
      </section>

      <section className="keyboard">{keyboardLetters}</section>

      {isGameOver && (
        <section className="newGame">
          <button className="newGameBtn" onClick={newGame}>
            New Game
          </button>
        </section>
      )}
      <GameSwitch />
      <Footer />
    </>
  );
}

export default AssemblyEndgame;
