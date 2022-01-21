import React from 'react';
import './Header.css'
import { useState, useEffect, useContext } from 'react';
import Button from '../Common/Button/Button';
import { AuthContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const { dispatch } = useContext(AuthContext);
    
    const navigate = useNavigate();

    const [time, setTime] = useState(null)

    const [userLoggedIn, setUserLoggedIn] = useState(false)

    let userToken = localStorage.getItem("token")

    userToken = JSON.parse(userToken);

    useEffect(() => {
        const today = new Date()
        setTime(today.getHours())

        userToken === null ? setUserLoggedIn(false) : setUserLoggedIn(true)
       
    }, [userLoggedIn, userToken])

    const handleLogout = () => {
        dispatch({
            type: 'LOGOUT'
        })
        navigate('/')
    }
    
  return (
    <div className='header'>
        <div className='header-wrapper'>
            <h2 className='app-name'>List Songs App</h2>
            {userLoggedIn ? 
                <div className='right-side'>
                    <span className='admin-greeting'>
                        {time < 12 ? 'Good Morning' : time < 18 ? 'Good Afternoon' : 'Good Evening'}, Admin
                    </span>
                    <Button btnClass='btn' name='Log Out' onClick={handleLogout} />
                </div> : null}
            
        </div>
    </div>
  )
}

export default Header;
