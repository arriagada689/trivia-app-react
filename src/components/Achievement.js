import '../styling/achievement.css';

const Achievement = ({ achievement }) => {
    // console.log(achievement)
    return ( 
        <div className='ach-container'>
            <div className='ach-name'>{achievement.name}</div>
            <div className='ach-description'>{achievement.description}</div>
            <div className='ach-time'>{formatDate(achievement.timestamp.substring(0, 10))}</div>
        </div>
     );
}

function formatDate(inputDate) {
    const parts = inputDate.split('-');
    const formattedDate = `${parts[1]}-${parts[2]}-${parts[0].substring(2)}`;
    return formattedDate;
}
 
export default Achievement;