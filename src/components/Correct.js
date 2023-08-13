import '../styling/correct.css';

const Correct = ({questionNumber, question, answer}) => {
    
    return (  
        <div className="results-display">
            <div className="results-question-header">
                <h3>Question {questionNumber}</h3>
                <h2>{decodeURIComponent(question)}</h2>
            </div>
            <div className="results-correct">
                <h3>Correct!: {decodeURIComponent(answer)}</h3>
            </div>
        </div>
    );
}
 
export default Correct;