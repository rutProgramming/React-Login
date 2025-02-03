import { createContext, useReducer } from 'react'
import './App.css'
import { Puser ,ActionReducer,ContextType} from './types/types'
import { Provider } from 'react-redux'
import store from './store/reduxStore'
import { RouterProvider } from 'react-router'
import { router } from './router'
import { Box } from '@mui/material'
import homeImage from './images/9.png'

const reducer = (state: Puser, action: ActionReducer) => {
  switch (action.type) {
      case "LOGIN":
      case "SIGN_UP":
      case 'UPDATE':
        return { ...state, ...action.data }
    default:
      return state
  }
}
export const Context = createContext<ContextType>([{} as Puser, () => {}]);
function App() {
  const [user,userDispatch] = useReducer(reducer,{} as Puser);
  return (
    <>
    <Box
     sx={{
           position: 'fixed', 
           top: 0, 
           left: 0,
           width: '100vw', 
           height: '100vh', 
           backgroundImage: `url(${homeImage})`, 
           backgroundSize: 'cover', 
           backgroundPosition: 'center', 
           backgroundRepeat: 'no-repeat',
           zIndex: 0, 
       }}
     >
      <Context value={[user, userDispatch]}>
      <Provider store={store}>
        <RouterProvider router={router} ></RouterProvider>
        </Provider>
      </Context>
      </Box>
    </>
  )
}

export default App
