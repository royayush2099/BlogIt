
import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import { login,logout } from './store/authSlice'
import { Footer, Header } from './components/index.js'
import { Outlet } from 'react-router-dom'
//in frontend the access to env variables in different than bckend
//for create react app it is different and vite is different
//we have to use VITE_ before name 
function App() {
  const[Loading,setLoading] = useState(true)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(
      ()=>{setLoading(false)}
    )
  },[])

  return !Loading ?
    ( <div className='min-h-screen flex felx-wrap content-between bg-gray-400'>
      <div className='w-full  block'>
        test
        <Header/>
        <main>
          TODO:<Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
    ):null
}

export default App
