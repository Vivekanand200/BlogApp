import React,{ useState } from 'react'
import { Button } from 'flowbite-react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


const Oauth = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    googlePhotoUrl: '',
  });
  const auth = getAuth(app)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' })
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log("resultsfromgoogle",resultsFromGoogle);
      // const res = await fetch(`/api/auth/google`,{
      //   method: 'POST',
      //   headers:{'Content-type': 'application/json'},
      //   body:JSON.stringify({
      //     name:resultsFromGoogle.user.displayName,
      //     email:resultsFromGoogle.user.email,
      //     googlePhotoUrl:resultsFromGoogle.user.photoURL,
      //   }),
      // }
      // )
      const updatedFormData = {
        name: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email,
        googlePhotoUrl: resultsFromGoogle.user.photoURL,
      };
      setFormData(updatedFormData);
      const res = await axios.post('http://localhost:3000/api/auth/google', updatedFormData);

      
      // const data = await res.json()
      if (res.status===200) {
        dispatch(signInSuccess(res.data));
        navigate('/');
      }
      
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <Button
      type='button'
      gradientDuoTone='pinkToOrange' 
      outline
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className='w-6 h-6 mr-3' />
      Continue with Google
    </Button>
  )
}

export default Oauth



