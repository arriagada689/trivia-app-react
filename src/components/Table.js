import '../styling/table.css';

const Table = () => {
    return ( 
        <div className="container">
            <div className='table-name'>Trivia Achievements</div>
            <p>Track your achievements and become a trivia master! To keep track of your achievements, please login or create an account.</p>
            <table>
                <thead>
                    <tr>
                        <th>Achievement</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Trivia Master</td>
                        <td>Achieve a perfect score</td>
                    </tr>
                    <tr>
                        <td>Trivia Wizard</td>
                        <td>Achieve a 3-game perfect score streak</td>
                    </tr>
                    <tr>
                        <td>Trivia Specialist</td>
                        <td>Achieve a 5-game perfect score streak</td>
                    </tr>
                    <tr>
                        <td>Trivia Genius</td>
                        <td>Achieve a 10-game perfect score streak</td>
                    </tr>
                    <tr>
                        <td>Trivia King</td>
                        <td>Achieve a 20-game perfect score streak</td>
                    </tr>
                </tbody>
            </table>
        </div>
     );
}
 
export default Table;