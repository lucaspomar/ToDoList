import './App.css'
import axios from 'axios'
import Login from './components/Login/Login.jsx'

axios.defaults.baseURL = 'http://localhost:8000'

function App() {

  return (
    <>
      <Login />
    </>
  )
}

export default App
