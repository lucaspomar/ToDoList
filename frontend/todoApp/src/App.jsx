import './App.css'
import axios from 'axios'
import { RouterProvider } from "react-router-dom";
import router from './router.jsx'

axios.defaults.baseURL = 'http://localhost:8000'

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
