import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Admin from './pages/Admin'
import Login from './pages/LoginPage'
import MoviePage from './pages/MoviePage'
import Privacy from './pages/Privacy'
import RegisterPage from './pages/RegisterPage'
import GlobalFooter from './components/GlobalFooter'
import Header from './components/header'

function App() {


  return (
    <>
    <Header />
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/admin' element={< Admin />}></Route>
        <Route path='/login' element={< Login />}></Route>
        <Route path='/register' element={< RegisterPage />}></Route>
        <Route path='/movies' element={< MoviePage />}></Route>
        <Route path='/privacy' element={< Privacy />}></Route>
        <Route path='/footer' element={< GlobalFooter />}></Route>
      </Routes>
    </Router>




    </>
  )
}

export default App
