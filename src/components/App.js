import { useEffect, useState } from 'react';
import { sampleData, singleQuestion, fourQuestions } from '../sample_data';
import '../styling/header.css';
import Prompt from './Prompt';
import Question from './Question';
import Results from './Results';
import LoadingEllipses from './LoadingEllipses';
import Navbar from './Navbar';
import Register from './Register'
import Login from './Login'
import Profile from './Profile'
import Table from './Table'
import ProfileBox from './ProfileBox'
import Leaderboard from './Leaderboard'

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

  const [loggedIn, setLoggedIn] = useState(false);

  const [mainComponent, setMainComponent] = useState('Prompt')

  const [user, setUser] = useState({
    id: '',
    username: ''
  });

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then((response) => response.json())
      .then((data) => {
        console.log(data.trivia_categories)
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
      setMainComponent('Results')
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
    setMainComponent('Prompt');
  }

  const handleNavbarClick = (input) => {
    if(input === 'Register'){
      setMainComponent('Register')
    } else if(input === 'Log out'){
        const updatedUser = {
          id: '',
          username: ''
        };
        setUser(updatedUser)
        setLoggedIn(false)
    } else if(input === 'Log in'){
        setMainComponent('Log in');
    } else if(input === 'Profile'){
        setMainComponent('Profile');
    } else if(input === 'Prompt'){
        setMainComponent('Prompt');
        handleStartOver();
    } else if(input === 'Leaderboard'){
        setMainComponent('Leaderboard');
    }
  }
  
  return (
    <div className="App">
      
      {<Navbar loggedIn={loggedIn} handleNavbarClick={handleNavbarClick}/>}

      {categories.length === 0 && !error && mainComponent === 'Loading' &&
        <div className='centered-container'><div className='loading place-next'>Loading<LoadingEllipses /></div></div>}

      {error && mainComponent === 'Loading' &&
        <div className='centered-container'><div className='loading'>Error fetching data. Open Trivia Database may be down.</div></div>}

      {generateButton && !showResults && mainComponent === 'Loading' &&
        <div className="timer-container">
          <p className='timer'>Time: {elapsedTime} seconds</p>
        </div>}

      {mainComponent === 'Register' && <Register setLoggedIn={setLoggedIn} setMainComponent={setMainComponent} setUser={setUser}/>}
      {mainComponent === 'Log in' && <Login setLoggedIn={setLoggedIn} setMainComponent={setMainComponent} setUser={setUser}/>}
      {mainComponent === 'Profile' && <Profile user={user}/>}
      {mainComponent === 'Leaderboard' && <Leaderboard user={user}/>}

      {!generateButton && categories.length > 0 && mainComponent === 'Prompt' &&
        <div> 
          {user.username !== '' && <ProfileBox user={user}/>}
          <Prompt handleGenerateButton={handleGenerateButton} categories={categories}/>
          <Table />
        </div> }

      {generateButton && !showResults && questions &&
        <Question data={questions[currentQuestion]} questionNumber={currentQuestion + 1} handleAnswerClick={handleAnswerClick}/>}

      {showResults && mainComponent === 'Results' &&
        <Results startOver={handleStartOver} userAnswers={userAnswers} data={questions} time={totalTime} user={user}/>}

    </div>
  );
}

export default App;
