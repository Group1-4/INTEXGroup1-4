import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Admin from "./pages/Admin";
import Login from "./pages/LoginPage";
import MoviePage from "./pages/MoviePage";
import Privacy from "./pages/Privacy";
import RegisterPage from "./pages/RegisterPage";
import GlobalFooter from "./components/GlobalFooter";
import Header from "./components/GlobalHeader";
import Footer from "./components/GlobalFooter";
import MovieListPage from "./pages/MovieListPage"
import ComingSoon from "./pages/ComingSoon";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/movies" element={<MoviePage />}></Route>
          <Route path="/privacy" element={<Privacy />}></Route>
          <Route path="/footer" element={<GlobalFooter />}></Route>
          <Route path="/movielist" element={<MovieListPage />}></Route>
          <Route path="/comingsoon" element={<ComingSoon />}></Route>
        </Routes>
      </Router>
      <Footer />
    </>
  );
}
export default App;