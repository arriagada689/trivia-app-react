import { useEffect, useState } from "react";
import '../styling/profile-box.css';

const ProfileBox = ({ user }) => {
    const [index, setIndex] = useState(0); 
    const [infoArray, setInfoArray] = useState([]);

    useEffect(() => {
        fetch(`https://prickle-tasty-thunbergia.glitch.me/user/${user.username}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            
            const dynamicInfoArray = [];
            dynamicInfoArray.push(data.total_games);
            dynamicInfoArray.push(data.overall_average);
            dynamicInfoArray.push(data.total_correct);
            dynamicInfoArray.push(data.total_wrong);
            dynamicInfoArray.push(data.favorite_category);
            dynamicInfoArray.push(data.longest_streak);
            dynamicInfoArray.push(data.streak);
            setInfoArray(dynamicInfoArray);
        })
    }, [])

    const handleButtonClick = () => {
        setIndex(index + 1);
        if (index + 1 === infoArray.length) {
            setIndex(0);
        }
    }

    return ( 
        <div className="profile-box-container">
            <div className="profile-box-name">{user.username}</div>
            <div className="profile-horizontal">
                {index === 0 && <div className="box-sub-label">Total games: <span className="box-info">{infoArray[index]}</span></div>}
                {index === 1 && <div className="box-sub-label">Overall score average: <span className="box-info">{infoArray[index]}</span></div>}
                {index === 2 && <div className="box-sub-label">Total answers correct: <span className="box-info">{infoArray[index]}</span></div>}
                {index === 3 && <div className="box-sub-label">Total answers wrong: <span className="box-info">{infoArray[index]}</span></div>}
                {index === 4 && <div className="box-sub-label">Most played category: <span className="box-info">{infoArray[index]}</span></div>}
                {index === 5 && <div className="box-sub-label">Current perfect score streak: <span className="box-info">{infoArray[index]}</span></div>}
                {index === 6 && <div className="box-sub-label">Longest perfect score streak: <span className="box-info">{infoArray[index]}</span></div>}
                <button onClick={() => handleButtonClick()}><i className="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>
    );
}
 
export default ProfileBox;