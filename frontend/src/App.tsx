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
import MovieListPage from "./pages/MovieListPage";
import CarouselHomePage from "./components/CarouselHomePage";

import AuthorizeView from "./components/Authorizeview";

import Denied from "./pages/403";
import ComingSoon from "./pages/ComingSoon";
import CookieConsentBanner from "./components/CookieConsentBanner";

function App() {
  return (
    <>
  
  <Router>
      <Header />
      <CookieConsentBanner />
      <Routes>
        {/* ✅ PUBLIC ROUTES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/footer" element={<GlobalFooter />} />
        <Route path="/403" element={<Denied />} />
        <Route path="/comingsoon" element={<ComingSoon />} />
        <Route path="/carousel" element={<CarouselHomePage />} />

        {/* 🔐 PROTECTED ROUTES */}
        <Route
          path="/admin"
          element={
            <AuthorizeView>
              <Admin />
            </AuthorizeView>
          }
        />
        <Route
          path="/movies"
          element={
            <AuthorizeView>
              <MoviePage />
            </AuthorizeView>
          }
        />
        <Route
          path="/movielist"
          element={
            <AuthorizeView>
              <MovieListPage />
            </AuthorizeView>
          }
        />
      </Routes>

      <Footer />
    </Router>
    </>
  );
}
export default App;