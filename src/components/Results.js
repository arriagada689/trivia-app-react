import Correct from "./Correct";
import Incorrect from "./Incorrect";
import '../styling/results.css';

const Results = ({ startOver, userAnswers, data, time }) => {
    
    const realAnswers = [];
    const resultComponents = [];
    
    const calculateScore = () => {
        for(let i = 0; i < data.length; i++){
            if(realAnswers.length < userAnswers.length){
                realAnswers.push(data[i].correct_answer);
            }
        }
        let correctCount = 0;
        for(let i = 0; i < realAnswers.length; i++){
            if(userAnswers[i] === realAnswers[i]){
                correctCount++;
                if(resultComponents.length < userAnswers.length){
                    resultComponents.push(<Correct key={i} questionNumber={i + 1} question={data[i].question} answer={data[i].correct_answer}/>);
                }
            } else {
                if(resultComponents.length < userAnswers.length){
                    resultComponents.push(<Incorrect key={i} questionNumber={i + 1} question={data[i].question} answer={data[i].correct_answer} userAnswer={userAnswers[i]}/>);
                }
            }
        }
        return correctCount;
    }
    const calculateScore2 = () => {
        //return fraction string
        let str = '';
        let firstNum = String(calculateScore());
        str += firstNum;
        str += '/';
        str += String(realAnswers.length);
        return str;
    }

    const percentage = () => {
        let num = calculateScore() / realAnswers.length;
        if(num === 0){
            return '0%';
        } else if(num === 1){
            return '100%';
        } else {
            let str = String(num);
            str += '00';
            return str.slice(2, 4) + '%';
        }
    }

    return (  
        <div className="results">
            <div className="score">
                <header className="results-header">Results: </header>
                <h3>{calculateScore2()}</h3>
                <h1>{percentage()}</h1>
                <h2>Time: {formatTime(time)}</h2>
            </div>
            <div className="question-results-display">
                {resultComponents}
            </div>
            <button onClick={startOver} className="play-again-button">Play Again</button>
        </div>
    );
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }
 
export default Results;