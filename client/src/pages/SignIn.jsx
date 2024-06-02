import React, { useState } from 'react';
import { Button, Label, TextInput, Alert, Spinner } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {signInStart,  signInSuccess,signInFailure  } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Oauth from '../components/Oauth';


const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { loading, error: errorMessage } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all fields'));
    }
    try {
      // setLoading(true);
      // setErrorMessage(null);
      dispatch(signInStart());
      const res = await axios.post('http://localhost:3000/api/auth/signIn', formData);
      document.cookie = `access_token=${res.data.token};path=/`;
      setFormData({
        email: '',
        password: ''
      });
      console.log(res,"response");
      if (res.status === 200) {
        dispatch(signInSuccess(res.data.data));
        navigate('/');
      }
      else {
        return dispatch(signInFailure("Wrong username or password"));
      }


    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div>
          <Link to="/" className='text-4xl font-bold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              BlogNow
            </span>
            It
          </Link>
          <p className='text-sm mt-3'>
            This is my project. You can Sign In with your email and
            password, or with Google.
          </p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='name@gmail.com'
                id='email'
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='**********'
                id='password'
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {
                loading ? (<>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
                ) : 'sign In'
              }
            </Button>
            <Oauth />
          </form>
          <div className='flex gap-2 mt-5'>
            <span>Dont have an account?</span>
            <Link to="/signUp" className='text-blue-500'>Sign Up</Link>
          </div>

          {
            errorMessage &&
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          }

        </div>
      </div>
    </div>
  );
};

export default SignIn;
