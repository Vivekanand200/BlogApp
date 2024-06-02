import { TextInput, Button, Alert } from 'flowbite-react';
import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, ref, getStorage, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase.js'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { updateStart, updateSuccess, updateFailure } from '../redux/user/userSlice.js'
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const DashProfile = () => {
    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();
    console.log("dashprofile", currentUser);
    console.log("dashprofile", currentUser.username);
    console.log("dashprofile", currentUser.profilePicture);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploding, setImageFileUploding] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        profilePicture: '',
    });
    const filePickerRef = useRef();
    const dispatch = useDispatch();
    const [myCookie, setMyCookie] = useState(null);
    useEffect(() => {
      // Function to get a cookie by name
      const getCookie = (name) => {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
          const [cookieName, cookieValue] = cookie.split('=');
          if (cookieName.trim() === name) {
            return decodeURIComponent(cookieValue);
          }
        }
        return null;
      };
  
      // Retrieve the value of the "myCookie" cookie
      const cookieValue = getCookie('access_token');
      setMyCookie(cookieValue);
    }, []);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }

    }

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    const uploadImage = async () => {
        //firebase
        // service firebase.storage {
        //     match /b/{bucket}/o {
        //       match /{allPaths=**} {
        //         allow read; 
        //         allow write: if
        //         request.resource.size < 2 * 1024 * 1024 &&
        //         request.resource.contentType.matches('image/.*')

        //       }
        //     }
        //   }
        setImageFileUploding(true)
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError('Could not upload image (File must be less than 2MB)');
                setImageFileUploadProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
                setImageFileUploding(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setFormData({ ...formData, profilePicture: downloadURL });
                    setImageFileUploding(false);
                })
            }
        );

    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(formData).length == 0) {
            return;
        }
        if(imageFileUploding){
            return ;
        }
        try {
            dispatch(updateStart());
            const res = await axios.put(`http://localhost:3000/api/user/update/${currentUser._id}`, {formData,token:myCookie});
            setFormData(res.data);
            console.log("dashprofile",res.data);
            if (res.status !== 200) {
                dispatch(updateFailure('Your data has been not  updated'))
            } else {
                navigate('/dashboard?tab=profile');
                dispatch(updateSuccess(res.data));
                
                setUpdateUserSuccess('Users profile updated successfully')

            }
        } catch (err) {
            dispatch(updateFailure(err.message));
        }
    }

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
                <div className=' relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
                    onClick={() => filePickerRef.current.click()
                    }>
                    {imageFileUploadProgress && (<CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`}
                        strokeWidth={5}
                        styles={{
                            root: {
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                            },
                            path: {
                                stroke: `rgba(62,152,199, ${imageFileUploadProgress / 100}`
                            }
                        }}

                    />)}

                    <img className={`rounded-full w-full object-cover border-8 border-[lightgary] 
            ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`} src={imageFileUrl || currentUser.profilePicture} alt="user"
                    />
                </div>
                {
                    imageFileUploadError && <Alert color="failure">{imageFileUploadError}</Alert>
                }
                <TextInput type='text' id='username' placeholder='Username' defaultValue={currentUser.username} onChange={
                    handleChange
                } />
                <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} onChange={
                    handleChange
                } />
                <TextInput type='password' id='password' placeholder='Password' onChange={
                    handleChange
                } />
                <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                    Update
                </Button>
            </form>
            <div className='text-red-500 flex justify-between mt-5'>
                <span className='cursor-pointer hover:border rounded p-1'>Delete Account</span>
                <span className='cursor-pointer hover:border rounded p-1'>Sign Out</span>
            </div>
            {updateUserSuccess &&<Alert color='success'>
            {updateUserSuccess}
            </Alert>}
        </div>
    )
}

export default DashProfile