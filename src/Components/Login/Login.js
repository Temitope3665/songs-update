import React from 'react';
import background from '../../Icons/bg.jpg'
import Button from '../Common/Button/Button';
import Input from '../Common/Input/Input';
import { useState, useContext } from 'react';
import loadingIcon from '../../Icons/loading.gif';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'
import { AuthContext } from '../../App';


const Login = () => {

    const { dispatch } = useContext(AuthContext);

    let navigate = useNavigate();

    const [loading, setLoading] = useState(false)

    const initialState = {
        username: '',
        password: '',
    }

    const [data, setData] = useState(initialState)

    // const [submitted, setSubmitted] = useState(false)

    const [errorSubmit, setErrorSubmit] = useState(false)

    const handleusernameChange = (e) => {
        const usernameValue = e.target.value
        setErrorSubmit(false)
        setData({
            ...data,
            username: usernameValue
        })
    }

    const handlePasswordChange = (e) => {
        const passwordValue = e.target.value
        setErrorSubmit(false)
        setData({
            ...data,
            password: passwordValue
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setData({
            username: data.username,
            password: data.password
        })

        // loading starts
        setLoading(true)
        
        await axios.post('https://hookedbe.herokuapp.com/api/login', data)
        .then(res => {
            if (res.status === 200) {
                setLoading(false)
                navigate('/home')

                dispatch({
                    type: "LOGIN",
                    payload: res.data
                })
            }
        })
        .catch(err => {
            setErrorSubmit(true)
            setLoading(false)
        })
    }

  return (
      <div className='login-section'>
          <div className='login-form-wrapper'>
              <h4 className='login-text'>Login</h4>
              <form onSubmit={handleSubmit}>
                <label>
                    {'Username'}
                    <Input
                        placeholder='Enter your username'
                        type='text'
                        onChange={handleusernameChange}
                        name='username'
                        value={ data.username }
                        />
                </label>

                <label>
                    {'Password'}
                    <Input
                        placeholder='Enter your password'
                        type='password'
                        onChange={handlePasswordChange}
                        name='password'
                        value={ data.password } />
                </label>

                <Button name='Log In' btnClass='login-btn' />
                {/* <p>{data.errorMessage}</p> */}
                {loading ? 
                    <img className='loading-icon' src={loadingIcon} alt='loading' />
                    : null
                }
                {errorSubmit ? <p className='unsuccess'>Unsuccessful login, try again!</p> : null}
              </form>
          </div>
          <div className='bg-img'>
              <img className='img' src={background} alt="img" />
          </div>
      </div>
  );
}

export default Login;
