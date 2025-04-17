import { useActionState, useEffect, useState } from 'react'
import CardsGrid from './components/CardsGrid';
import '../styles/style.css'

  const symbols = [
    { symbol: '❤', symbolId: 1, matched: false },
    { symbol: '★', symbolId: 2, matched: false },
    { symbol: '⚡', symbolId: 3, matched: false },
    { symbol: '☀', symbolId: 4, matched: false },
    { symbol: '🌙', symbolId: 5, matched: false },
    { symbol: '🎵', symbolId: 6, matched: false },
    { symbol: '🍀', symbolId: 7, matched: false },
    { symbol: '🐱', symbolId: 8, matched: false },
    // matched pair
    { symbol: '❤', symbolId: 1, matched: false },
    { symbol: '★', symbolId: 2, matched: false },
    { symbol: '⚡', symbolId: 3, matched: false },
    { symbol: '☀', symbolId: 4, matched: false },
    { symbol: '🌙', symbolId: 5, matched: false },
    { symbol: '🎵', symbolId: 6, matched: false },
    { symbol: '🍀', symbolId: 7, matched: false },
    { symbol: '🐱', symbolId: 8, matched: false }
  ];

function App() {
    const [cards, setCards] = useState([]);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [gameWon, setGameWon] = useState(false)
    const [moves, setMoves] = useState(0);
    const [bestScore, setBestScore] = useState(() => {
      const savedScore = localStorage.getItem("bestScore");
      return savedScore ? Number(savedScore) : Number.POSITIVE_INFINITY;
    });

    const shuffleCards = () => {
        const shuffled = symbols.map(card => ({ ...card, id: Math.random() })).sort(() => Math.random() - 1.5);
        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffled);
        setMoves(0);
        setGameWon(false);
    };

  const handleClick = (card) => {
    if (!disabled) {
      if (card === choiceOne) return;
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setMoves((prevMoves) => {
        const newMoves = prevMoves + 1;
        setDisabled(true);
      
        if (choiceOne.symbolId === choiceTwo.symbolId) {
          const updatedCards = cards.map(card =>
            card.symbolId === choiceOne.symbolId ? { ...card, matched: true } : card
          );
          setCards(updatedCards);
          checkCompletion(updatedCards, newMoves);
          resetTurn();
        } else {
          setTimeout(() => resetTurn(), 500);
        }
        return newMoves;
      });
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  const checkCompletion = (updatedCards, currentMoves) => {
    const allEqual = updatedCards.every(val => val.matched === true);
    if (allEqual) {
      setGameWon(true);
      const highScore = Math.min(currentMoves, bestScore);
      setBestScore(highScore);
      localStorage.setItem("bestScore", highScore);
    }
  };

    useEffect(() => {
        shuffleCards();
    }, []);

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <CardsGrid
        cards={cards}
        handleClick={handleClick}
        flippedCards={[choiceOne, choiceTwo].filter(Boolean)}
      />
      <div className="score">
        <div className="moves">
          <span className="bold">Moves:</span> {moves}
        </div>
        <div className="high-score">Best Score: {bestScore === Number.POSITIVE_INFINITY ? "N/A" : bestScore}</div>
      </div>
      {gameWon && (
        <div className="win-message">
          🎉 You won in {moves} moves! <br />
          <button onClick={shuffleCards}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default App;