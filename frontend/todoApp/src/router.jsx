import { createBrowserRouter } from "react-router-dom";
import Login from './components/Login/Login.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);

export default router;