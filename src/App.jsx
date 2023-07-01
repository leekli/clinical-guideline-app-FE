import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Login } from "./components/Login";
import { SingleGuideline } from "./components/SingleGuideline";
import { NavBar } from "./components/NavBar";
import ErrorPage from "./components/ErrorPage";
import { Contact } from "./components/Contact";
import { MyGuidelinesHome } from "./components/MyGuidelinesHome";
import { MyApprovalsHome } from "./components/MyApprovalsHome";
import { AllGuidelines } from "./components/AllGuidelines";
import { MySingleGuidelineBranch } from "./components/MySingleGuidelineBranch";
import { MySingleGuidelineEditor } from "./components/MySingleGuidelineEditor";

function App() {
  return (
    <>
      <div className="App">
        <Header />
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/guidelines" element={<AllGuidelines />} />
          <Route
            path="/guidelines/:guideline_id"
            element={<SingleGuideline />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/myguidelines" element={<MyGuidelinesHome />} />
          <Route
            path="/myguidelines/:branch_name"
            element={<MySingleGuidelineBranch />}
          />
          <Route
            path="/myguidelines/:branch_name/editor"
            element={<MySingleGuidelineEditor />}
          />
          <Route path="/myapprovals" element={<MyApprovalsHome />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
