import { createBrowserRouter, Outlet } from 'react-router'
import NavBar from './components/NavBar'
import About from './components/about'
import Home from './components/home'
import Profile from './components/profile'



export const router = createBrowserRouter([
    {
      path: '/',
      element: <><NavBar/><Outlet /></>,
      children : [
      {path: 'home', element: <Home/>},
      {path: 'about', element: <About/>},
      {path: 'profile', element: <Profile/>},

    ]
        
    }])

