import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Admin from './pages/Admin'
import Login from './pages/LoginPage'
import MoviePage from './pages/MoviePage'
import Privacy from './pages/Privacy'
import Signup from './pages/Signup'

function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/admin' element={< Admin />}></Route>
        <Route path='/login' element={< Login />}></Route>
        <Route path='/movies' element={< MoviePage />}></Route>
        <Route path='/privacy' element={< Privacy />}></Route>
        <Route path='/signup' element={< Signup />}></Route>
      </Routes>
    </Router>




    </>
  )
}

export default App
