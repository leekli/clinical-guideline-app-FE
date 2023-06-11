import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Login } from './components/Login';
import { Homepage } from './components/Homepage';
import { SingleGuideline } from './components/SingleGuideline';

function App() {

  return (
    <>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/guidelines" element={<Homepage />}/>
          <Route path="/guidelines/:guideline_id" element={<SingleGuideline />}/>
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
