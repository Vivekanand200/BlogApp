import React, { useState } from 'react';
import { Button, Label, TextInput, Alert, Spinner } from 'flowbite-react';
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import Oauth from '../components/Oauth';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill all fields');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await axios.post('http://localhost:3000/api/auth/signUp', formData);
      console.log(res.data);
      
      setFormData({
        username: '',
        email: '',
        password: ''
      });
      if(res.status===200){
        navigate('/signIn');
      }
      setLoading(false);
      
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
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
            This is my project. You can Sign Up with your email and
            password, or with Google.
          </p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your username' />
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
                value={formData.username}
                onChange={handleChange}
              />
            </div>
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
                placeholder='Password'
                id='password'
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {
                loading ? (<>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loding...</span>
                </>
                ) : 'sign Up'
              }
            </Button>
            <Oauth />
          </form>
          <div className='flex gap-2 mt-5'>
            <span>Already have an account?</span>
            <Link to="/signIn" className='text-blue-500'>Sign In</Link>
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

export default SignUp;
