import { useEffect, useState } from 'react';
import '../styling/signin.css';
import LoadingEllipses from './LoadingEllipses';

const Login = ({ setLoggedIn, setMainComponent, setUser }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [statusMessage, setStatusMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //wake up request for loading feature
        fetch('https://prickle-tasty-thunbergia.glitch.me/')
        .then(response => response.json())
        .then(data => {
            setLoading(false);
        })
        .catch((error) => {
            if(error){
                //setError(true);
            }
        })
    }, [])

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSignin = (event) => {
        event.preventDefault();
        fetch('https://prickle-tasty-thunbergia.glitch.me/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            if(data.error){
                setStatusMessage(data.error)
            } else {
                const updatedUser = {
                    id: data._id,
                    username: data.username
                };
                setLoggedIn(true)
                setMainComponent('Prompt')
                setUser(updatedUser)
            }
        })
    }
    
    return (  
        <div>
            {!loading && 
                <div className='signin-container'>
                
                    {statusMessage.length > 0 && <div className={`status-message ${statusMessage === 'Logged in!' ? 'logged-in' : 'error-message'}`}>
                        {statusMessage}
                    </div>}
                    
                    <form onSubmit={handleSignin}>
                    
                        <div className="signin-box">
                            <div className='signin-label'>Log in</div>
                            
                            <div className="signin-input-row">
                                <div className='signin-sub-label'>Username</div>
                                <div className="horizontalize">
                                    <i className="fa-solid fa-user"></i>
                                    <input type="text" name='username' value={formData.username} onChange={handleChange} autoComplete="new-password" className='signin-input' placeholder='Type your username'/>
                                </div>
                                <div className="div-separator"></div>
                            </div>

                            <div className="signin-input-row">
                                <div className='signin-sub-label'>Password</div>
                                <div className="horizontalize">
                                    <i className="fa-solid fa-lock"></i>
                                    <input type="password" name='password' value={formData.password} onChange={handleChange} autoComplete="new-password" className='signin-input' placeholder='Type your password'/>
                                </div>
                                <div className="div-separator"></div>
                            </div>

                            <div className="center-input">
                                <input type="submit" value="Log in" id='signin-submit-button'/>
                            </div>
                        </div>
                    </form>

                </div>}
            {loading && <div className='centered-container'><div className='loading place-next'>Loading<LoadingEllipses /></div></div>}
        </div>
    );
}
 
export default Login;