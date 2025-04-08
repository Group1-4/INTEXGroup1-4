import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Admin from "./pages/Admin";
import Login from "./pages/LoginPage";
import MoviePage from "./pages/MoviePage";
import Privacy from "./pages/Privacy";
import RegisterPage from "./pages/RegisterPage";
import GlobalFooter from "./components/GlobalFooter";
import Header from "./components/GlobalHeader";
import Footer from "./components/GlobalFooter";
import CookieConsent from "react-cookie-consent";
function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/movies" element={<MoviePage />}></Route>
          <Route path="/privacy" element={<Privacy />}></Route>
          <Route path="/footer" element={<GlobalFooter />}></Route>
        </Routes>
      </Router>
      <Footer />
    </>
  );
}
export default App;