import { createBrowserRouter } from "react-router-dom";
import Login from './components/Login/Login.jsx'
import Todos from './components/Todos/Todos.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/todos",
    element: <Todos />,
  },
]);

export default router;