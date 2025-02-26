
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login/Login'
import PrivatePage from './components/PrivatePage/PrivatePage'
import Register from './components/Register/Register'

function App() {
  const router = createBrowserRouter([{
    path: '/',
    element: <Register/>,
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/private',
    element: <PrivatePage/>,
  }
])

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
