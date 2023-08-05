import { Routes, Route } from "react-router-dom";
import "./App.css";
import { HeaderBar } from "./components/Header/HeaderBar";
import { Footer } from "./components/Footer/Footer";
import { Login } from "./components/Login/Login";
import { SingleGuideline } from "./components/SingleGuidelineView/SingleGuideline";
import { NavBar } from "./components/NavBar/NavBar";
import ErrorPage from "./components/Errors/ErrorPage";
import { MyGuidelinesHome } from "./components/MyGuidelines/MyGuidelinesHome";
import { MyApprovalsHome } from "./components/MyApprovals/MyApprovalsHome";
import { AllGuidelines } from "./components/AllGuidelines/AllGuidelines";
import { MySingleGuidelineBranch } from "./components/MySingleGuideline/MySingleGuidelineBranch";
import { MySingleGuidelineEditor } from "./components/MySingleGuideline/MySingleGuidelineEditor";
import { MySingleGuidelineApprovalSentSuccess } from "./components/MySingleGuideline/MySingleGuidelineApprovalSentSuccess";
import { MySingleApprovalComponent } from "./components/MySingleApproval/MySingleApprovalComponent";
import { SingleGuidelineEditSubmissionSuccess } from "./components/SingleGuidelineView/SingleGuidelineEditSubmissionSuccess";

function App() {
  return (
    <>
      <div className="App">
        <HeaderBar />
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/guidelines" element={<AllGuidelines />} />
          <Route
            path="/guidelines/:guideline_id"
            element={<SingleGuideline />}
          />
          <Route
            path="/workspace-setup"
            element={<SingleGuidelineEditSubmissionSuccess />}
          />
          <Route path="/myguidelines" element={<MyGuidelinesHome />} />
          <Route
            path="/myguidelines/:branch_name"
            element={<MySingleGuidelineBranch />}
          />
          <Route
            path="/myguidelines/:branch_name/editor"
            element={<MySingleGuidelineEditor />}
          />
          <Route
            path="/approval-sent"
            element={<MySingleGuidelineApprovalSentSuccess />}
          />
          <Route path="/myapprovals" element={<MyApprovalsHome />} />
          <Route
            path="/myapprovals/:approval_name"
            element={<MySingleApprovalComponent />}
          />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
