import '../styling/game.css';

const Game = ({ game }) => {
    // console.log(game)
    
    return ( 
        <div className="game-container">
            <div>
                <div className='game-label'> score:</div>
                <div className="game-score">{game.score}</div>
            </div>
            
            <div className="vertical-game-info">
                <div>Category: <span className='game-info'>{game.category}</span></div>
                <div>Time Taken: <span className='game-info'>{game.time_taken}</span></div>
                <div>{formatDate(game.timestamp.substring(0, 10))}</div>
            </div>
        </div>
     );
}

function formatDate(inputDate) {
    const parts = inputDate.split('-');
    const formattedDate = `${parts[1]}-${parts[2]}-${parts[0].substring(2)}`;
    return formattedDate;
}
 
export default Game;