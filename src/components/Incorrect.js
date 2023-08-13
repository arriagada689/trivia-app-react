import '../styling/incorrect.css';

const Incorrect = ({questionNumber, question, answer, userAnswer}) => {
    return (  
        <div className="results-display">
            <div className="results-question-header">
                <h3>Question {questionNumber}</h3>
                <h2>{decodeURIComponent(question)}</h2>
            </div>
            <div className="results-incorrect">
                <h3>Your answer: {decodeURIComponent(userAnswer)}</h3>
                <h3>Correct answer: {decodeURIComponent(answer)}</h3>
            </div>
        </div>
    );
}
 
export default Incorrect;