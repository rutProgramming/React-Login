import { createContext, useReducer } from 'react'
import './App.css'
import HomePage from './components/WelcomePage'
import { Puser ,ActionReducer,ContextType} from './types/types'

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
      <Context.Provider value={[user, userDispatch]}>
        <HomePage />
      </Context.Provider>

    </>
  )
}

export default App
