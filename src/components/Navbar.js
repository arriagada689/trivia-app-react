import '../styling/header.css'
import '../styling/navbar.css'

const Navbar = ({ loggedIn, handleNavbarClick }) => {
    return (  
        <div className="navbar">
            <button className='nav-logo' onClick={() => handleNavbarClick('Prompt')}><div className="navbar-text">Trivia Game App</div></button>
            {loggedIn && <div className='nav-button-container'>
                <button className="nav-button" onClick={() => handleNavbarClick('Profile')}>Profile</button>
                <button className="nav-button" onClick={() => handleNavbarClick('Log out')}>Log out</button>
                <button className="nav-button" onClick={() => handleNavbarClick('Leaderboard')}>Leaderboard</button>
            </div>}
            {!loggedIn && <div className='nav-button-container'>
                <button className="nav-button" onClick={() => handleNavbarClick('Log in')}>Log in</button>
                <button className="nav-button" onClick={() => handleNavbarClick('Register')}>Register</button>
                <button className="nav-button" onClick={() => handleNavbarClick('Leaderboard')}>Leaderboard</button>
            </div>}
        </div>
    );
}
 
export default Navbar;