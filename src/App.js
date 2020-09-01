import React, { useState, useRef } from "react";
import { Holes } from "./Components/Holes";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [selectedHole, setSelectedHole] = useState(null);
  const [countdown, setCountdown] = useState(20);
  const [difficulty, setDifficulty] = useState("easy");

  let holes = [0, 1, 2, 3, 4, 5];

  const countdownRef = useRef(countdown);
  countdownRef.current = countdown;

  const difficultyRef = useRef(difficulty);
  difficultyRef.current = difficulty;

  // time for next mole to pop up
  const randomTime = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  // calculate hole for next mole
  const randomHole = () => {
    const newHole = Math.floor(Math.random() * 6);
    if (newHole === selectedHole) {
      randomHole(holes);
    } else {
      setSelectedHole(newHole);
    }
  };

  const peep = () => {
    if (countdownRef.current > 0) {
      let maxTime = 1000;
      if (difficultyRef.current === "medium") {
        maxTime = 800;
      } else if (difficultyRef.current === "hard") {
        maxTime = 600;
      }
      const time = randomTime(200, maxTime);
      randomHole();
      setTimeout(() => {
        peep();
      }, time);
    }
  };

  // update countdown timer
  const updateCountdown = () => {
    if (countdownRef.current > 0) {
      setTimeout(() => {
        setCountdown(countdownRef.current - 1);
        updateCountdown();
      }, 1000);
    } else {
      setSelectedHole(null);
    }
  };

  // start game
  const startGame = () => {
    setScore(0);
    setCountdown(20);
    setTimeout(() => {
      peep();
      updateCountdown();
    }, 50);
  };

  // when mole is hit
  const bonk = e => {
    if (!e.isTrusted) return;
    setSelectedHole(null);
    setScore(score + 1);
  };

  // update game difficulty
  const updateDifficulty = newDifficulty => {
    setSelectedHole(null);
    setScore(0);
    setCountdown(20);
    setDifficulty(newDifficulty);
  };

  return (
    <div className='App'>
      <h1>
        Whack-a-mole! <span className='score'>{score}</span>
      </h1>
      <div className='infos'>
        <button onClick={startGame}>Start</button>
        <span className='countdown'>
          {countdown} {countdown === 1 ? "second" : "seconds"} left
        </span>
        <div className='difficulty'>
          <span className='difficulty__title'>Difficulty</span>
          <div className='difficulty__buttons'>
            <button
              className={`difficulty__button ${
                difficulty === "easy" ? "difficulty__button--active" : ""
              }`}
              onClick={() => updateDifficulty("easy")}
            >
              Easy
            </button>
            <button
              className={`difficulty__button ${
                difficulty === "medium" ? "difficulty__button--active" : ""
              }`}
              onClick={() => updateDifficulty("medium")}
            >
              Medium
            </button>
            <button
              className={`difficulty__button ${
                difficulty === "hard" ? "difficulty__button--active" : ""
              }`}
              onClick={() => updateDifficulty("hard")}
            >
              Hard
            </button>
          </div>
        </div>
      </div>

      <div className='game'>
        <Holes holes={holes} bonk={bonk} selectedHole={selectedHole} />
      </div>
    </div>
  );
}

export default App;
