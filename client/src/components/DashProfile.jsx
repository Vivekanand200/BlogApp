import { TextInput,Button } from 'flowbite-react';
import React from 'react'
import {  useSelector } from 'react-redux'
const DashProfile = () => {
    const { currentUser } = useSelector(state => state.user);  
    console.log("dashprofile",currentUser);
    console.log("dashprofile",currentUser.username);
    console.log("dashprofile",currentUser.profilePicture);
    return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4'>
            <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
            <img className='rounded-full w-full object-cover border-8 border-[lightgary]' src={currentUser.profilePicture} alt="user"  />
            </div>
            <TextInput  type='text' id='username' placeholder='Username' defaultValue={currentUser.username}/>
            <TextInput  type='email' id='email' placeholder='email' defaultValue={currentUser.email}/>
            <TextInput  type='password' id='password' placeholder='Password' />
<Button type='submit' gradientDuoTone='purpleToBlue' outline>
    Update
</Button>
        </form>
        <div className='text-red-500 flex justify-between mt-5'>
            <span className='cursor-pointer hover:border rounded p-1'>Delete Account</span>
            <span className='cursor-pointer hover:border rounded p-1'>Sign Out</span>
        </div>
    </div>
  )
}

export default DashProfile