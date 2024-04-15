import { useEffect, useState } from "react";
import '../styling/leaderboard.css';

const initial = [
    { key: 'total_games', label: 'Total Games' },
    { key: 'total_correct', label: 'Total Correct' },
    { key: 'total_wrong', label: 'Total Wrong' },
    { key: 'overall_average', label: 'Overall Average' },
    { key: 'streak', label: 'Current Perfect Score Streak' },
    { key: 'longest_streak', label: 'Longest Perfect Score Streak' }
];

const Leaderboard = ({ user }) => {
    const [userData, setUserData] = useState(null);
    const [selectedButton, setSelectedButton] = useState(1);
    const [columnOrder, setColumnOrder] = useState(initial);

    const loggedInUser = user.username;

    const obj = {
        1: ['Total Games', 'total_games'],
        2: ['Total Correct', 'total_correct'],
        3: ['Total Wrong', 'total_wrong'],
        4: ['Overall Average', 'overall_average'],
        5: ['Current Perfect Score Streak', 'streak'],
        6: ['Longest Perfect Score Streak', 'longest_streak']
    }

    useEffect(() => {
        fetch('https://prickle-tasty-thunbergia.glitch.me/leaderboard')
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            setUserData(data)
        })
    }, [])

    const handleSortingButtonClick = (sortingMetric) => {
        setSelectedButton(sortingMetric);
        const attachment = obj[sortingMetric][1];
        
        fetch(`https://prickle-tasty-thunbergia.glitch.me/leaderboard?sortBy=${attachment}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            setUserData(data)
            // Find the index of the selected sorting metric in the columnOrder array
            const metricIndex = columnOrder.findIndex(column => column.key === attachment);
            
            // Swap the selected metric column with the first dynamic column
            const newColumnOrder = [...columnOrder];
            const temp = newColumnOrder[metricIndex];
            newColumnOrder[metricIndex] = newColumnOrder[0];
            newColumnOrder[0] = temp;

            // Set the new column order
            setColumnOrder(newColumnOrder);
        })
    };

    function decimalToPercentage(decimal) {
        return `${decimal * 100}%`;
    }

    function truncateString(str) {
        if (str.length > 13) {
            
            return str.substring(0, 13) + '...';
        }
        return str;
    }
    
    return ( 
        <div className="leaderboard-container">
            <h1 className="leaderboard-header">Leaderboard</h1>
            <div className="sorting-button-container">
                <div className="sorting-metric">Sorting metric:</div>
                <button 
                    className={selectedButton === 1 ? 'sorting-button selected' : 'sorting-button'}
                    onClick={() => handleSortingButtonClick(1)}>
                    Total Games
                </button>
                <button 
                    className={selectedButton === 2 ? 'sorting-button selected' : 'sorting-button'}
                    onClick={() => handleSortingButtonClick(2)}>
                    Total Correct
                </button>
                <button 
                    className={selectedButton === 3 ? 'sorting-button selected' : 'sorting-button'}
                    onClick={() => handleSortingButtonClick(3)}>
                    Total Wrong
                </button>
                <button 
                    className={selectedButton === 4 ? 'sorting-button selected' : 'sorting-button'}
                    onClick={() => handleSortingButtonClick(4)}>
                    Overall Average
                </button>
                <button 
                    className={selectedButton === 5 ? 'sorting-button selected' : 'sorting-button'}
                    onClick={() => handleSortingButtonClick(5)}>
                    Current Perfect Score Streak
                </button>
                <button 
                    className={selectedButton === 6 ? 'sorting-button selected' : 'sorting-button'}
                    onClick={() => handleSortingButtonClick(6)}>
                    Longest Perfect Score Streak
                </button>
            </div>
            {userData && (
                <table className="leaderboard-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Username</th>
                            {columnOrder.map((column, index) => (
                                <th key={index}>{column.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((user, index) => (
                            <tr key={user._id} className={`leaderboard-item ${user.username === loggedInUser ? 'highlight' : ''}`}>
                                <td className="leaderboard-info">{index + 1}</td>
                                <td className="leaderboard-info">{truncateString(user.username)}</td>
                                {columnOrder.map((column, columnIndex) => {
                                    if(column.key === 'overall_average'){
                                        return (
                                            <td key={columnIndex} className="leaderboard-info">{decimalToPercentage(user[column.key])}</td>
                                        )
                                    }
                                    return (
                                        <td key={columnIndex} className="leaderboard-info">{user[column.key]}</td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
 
export default Leaderboard;