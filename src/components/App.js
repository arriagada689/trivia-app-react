import { useEffect, useState } from 'react';
import '../styling/header.css';
import Prompt from './Prompt';
import Question from './Question';
import Results from './Results';
import LoadingEllipses from './LoadingEllipses';

function App() {
  const [categories, setCategories] = useState([]);
  const [generateButton, setGenerateButton] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [error, setError] = useState(false);

  const [elapsedTime, setElapsedTime] = useState(0);
  const [totalTime, setTotalTime] = useState(null);

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.trivia_categories);
      })
      .catch((error) => {
        if(error){
          setError(true);
        }
      })
  }, []);

  useEffect(() => {
    let timer;
  
    if (generateButton && !showResults) {
      timer = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
    }
  
    if (showResults) {
      clearInterval(timer);
    }
  
    return () => clearInterval(timer);
  }, [generateButton, showResults]);

  const handleGenerateButton = (category, amount, difficulty) => {
    let API_URL = 'https://opentdb.com/api.php?';

    API_URL += 'amount=';
    API_URL += String(amount);

    if(difficulty === 'any'){
    } else {
      API_URL += '&difficulty=';
      API_URL += difficulty;
    }
    if(category === 'any'){
    } else {
      API_URL += '&category=';
      API_URL += String(category);
    }
    API_URL += '&encode=url3986';

    fetch(API_URL)
    .then(response => response.json())
    .then((data) => {
      setQuestions(data.results)
    })
    setGenerateButton(true);

  }

  const handleAnswerClick = (choice) => {
    userAnswers.push(choice);
    if(userAnswers.length === questions.length){
      setShowResults(true);
      setTotalTime(elapsedTime);
    }
    setCurrentQuestion(currentQuestion + 1);
  }

  const handleStartOver = () => {
    setGenerateButton(false);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setQuestions(null);
    setShowResults(false);
    setElapsedTime(0); 
  }
  
  return (
    <div className="App">
      <header className="header">
        Fun Trivia App
      </header>

      {categories.length === 0 && !error && <div className='centered-container'><div className='loading place-next'>Loading<LoadingEllipses /></div></div>}

      {error && <div className='centered-container'><div className='loading'>Error fetching data. Open Trivia Database may be down.</div></div>}

      {generateButton && !showResults && 
        <div className="timer-container">
          <p className='timer'>Time: {elapsedTime} seconds</p>
        </div>}

      {!generateButton && categories.length > 0 &&
        <Prompt handleGenerateButton={handleGenerateButton} categories={categories}/>}

      {generateButton && !showResults && questions &&
        <Question data={questions[currentQuestion]} questionNumber={currentQuestion + 1} handleAnswerClick={handleAnswerClick}/>}

      {showResults && 
        <Results startOver={handleStartOver} userAnswers={userAnswers} data={questions} time={totalTime}/>}

    </div>
  );
}

export default App;
