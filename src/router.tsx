import { createBrowserRouter } from 'react-router'
import Home from './components/home'
import Profile from './components/profile'
import Recipes from './components/recipes'
import AppLayout from './components/AppLayout'
import ShowRecipe from './components/ShowRecipe'
import AddRecipe from './components/AddRecipe'
import { useSelector } from 'react-redux'
import { RootState } from './store/reduxStore'


const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const id = useSelector((state: RootState) => state.id);
  return id !== 0 ? element : null;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: "Home", element: <Home /> },
      { path: 'profile', element: <Profile /> },
      {
        path: "/Recipes", element: <><Recipes /> </>,
        children: [{ path: "/Recipes/ShowRecipe/:id", element: <><ShowRecipe /></> }]
      },
      { path: "AddRecipe", element: <ProtectedRoute element={<AddRecipe />} /> },
    ]
  }])

