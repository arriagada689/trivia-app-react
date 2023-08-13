import { useEffect, useState } from "react";
import '../styling/questions.css';

const Question = ({data, questionNumber, handleAnswerClick}) => {
    const [choices, setChoices] = useState([]);

    useEffect(() => {
        let newChoices = data.incorrect_answers.slice(); 
    
        if(data.type === 'boolean') {
            setChoices(['True', 'False']);
        } else {
            if(newChoices.length < 4){
                newChoices.push(data.correct_answer);
            }
            setChoices(shuffle(newChoices));
        }
    }, [data, questionNumber]);

    return (  
        <div className="question-container">
            <header className="category-header">Category:<div className="category-word">{decodeURIComponent(data.category)}</div></header>
            <header className="question-header">Question: <div className="left-difColor">{questionNumber}</div></header>
            <div className="question">
                <h2>{decodeURIComponent(data.question)}</h2>
                <p className="difficulty">
                    Difficulty: 
                    <span className={`left-difColor ${data.difficulty === 'easy' ? 'greenText' : ''} ${data.difficulty === 'medium' ? 'orangeText' : ''} ${data.difficulty === 'hard' ? 'redText' : ''}`}>
                        {data.difficulty}
                    </span>
                </p>
            </div>
            <div className="choices">
                {choices.map((choice, index) => (
                    <button key={index} className="choice-button" onClick={() => handleAnswerClick(choice)}>
                        {decodeURIComponent(choice)}
                    </button>
                ))}
            </div>
        </div>
    );
}

function shuffle(arr) {
    const shuffledArray = arr.slice();
  
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }
 
export default Question;