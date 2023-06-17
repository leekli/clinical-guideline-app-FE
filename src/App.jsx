import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Login } from "./components/Login";
import { Homepage } from "./components/Homepage";
import { SingleGuideline } from "./components/SingleGuideline";
import { NavBar } from "./components/NavBar";
import ErrorPage from "./components/ErrorPage";
import { Contact } from "./components/Contact";

function App() {
  return (
    <>
      <div className="App">
        <Header />
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/guidelines" element={<Homepage />} />
          <Route
            path="/guidelines/:guideline_id"
            element={<SingleGuideline />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
