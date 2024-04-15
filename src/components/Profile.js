import { useEffect, useState } from "react";
import '../styling/profile.css';
import Achievement from './Achievement';
import Game from './Game';

const Profile = ({ user }) => {
    const [totalGames, setTotalGames] = useState(null)
    const [totalCorrect, setTotalCorrect] = useState(null)
    const [totalWrong, setTotalWrong] = useState(null)
    const [average, setAverage] = useState(null)
    const [favoriteCategory, setFavoriteCategory] = useState(null)
    const [longestPerfectStreak, setLongestPerfectStreak] = useState(null)
    const [currentPerfectStreak, setCurrentPerfectStreak] = useState(null)
    const [userData, setUserData] = useState(null)
    
    useEffect(() => {
        
        fetch(`https://prickle-tasty-thunbergia.glitch.me/user/${user.username}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            setUserData(data);
            setTotalGames(data.total_games);
            setAverage(data.overall_average);
            setTotalCorrect(data.total_correct);
            setTotalWrong(data.total_wrong);
            setFavoriteCategory(data.favorite_category);
            setLongestPerfectStreak(data.longest_streak);
            setCurrentPerfectStreak(data.streak);    
        })
    }, [])

    function decimalToPercentage(decimal) {
        return `${decimal * 100}%`;
    }

    const renderAchievements = () => {
        if(userData) {
            const achievements = userData.achievements;
            if(achievements.length === 0){
                return <div className="empty-message">No achievements yet! Earn some achievements by getting perfect scores and going on streaks.</div>
            }
            return achievements.map((achievement, i) => (
                <Achievement key={i} achievement={achievement}/>
            ));
        } 
    }

    const renderGames = () => {
        if(userData) {
            const games = userData.scores;
            if(games.length === 0){
                return <div className="empty-message">No games yet! See how you did in all your previous games here.</div>
            }
            return games.map((game, i) => (
                <Game key={i} game={game}/>
            ));
        }
    }
    
    return ( 
        <div className="pr-container">
            <div className="pr-top-label"><span className="username">{user.username}</span>, User Profile</div>
            <div className="horizontal-bar"></div>
            <div className="pr-section-container">
                <div className="pr-section">
                    <div className="pr-label">Statistics</div>
                        <div className="pr-sub-label">Total Games: <span className="pr-info">{totalGames}</span></div>
                        <div className="pr-sub-label">Overall Average: <span className="pr-info">{decimalToPercentage(average)}</span></div>
                        <div className="pr-sub-label">Total Answers Correct: <span className="pr-info">{totalCorrect}</span></div>
                        <div className="pr-sub-label">Total Answers Wrong: <span className="pr-info">{totalWrong}</span></div>
                        <div className="pr-sub-label">Most Played Category: <span className="pr-info">{favoriteCategory}</span></div>
                        <div className="pr-sub-label">Longest Perfect Score Streak: <span className="pr-info">{longestPerfectStreak}</span></div>
                        <div className="pr-sub-label">Current Perfect Score Streak: <span className="pr-info">{currentPerfectStreak}</span></div>
                </div>

                <div className="pr-section">
                    <div className="pr-label">Achievements</div>
                    {renderAchievements()}
                </div>

                <div className="pr-section">
                    <div className="pr-label">Game History</div>
                    {renderGames()}
                </div>
            </div>
            
        </div>
    );
}
 
export default Profile;