import { createBrowserRouter, Outlet } from 'react-router'
import NavBar from './components/NavBar'
import Home from './components/home'
import Profile from './components/profile'
import Recipes from './components/recipes'



export const router = createBrowserRouter([
    {
      path: '/',
      element: <><NavBar/><Outlet /></>,
      children : [
      {path: 'home', element: <Home/>},
      {path: 'profile', element: <Profile/>},
      {path: 'recipes', element: <Recipes/>},


    ]
        
    }])

