import React, {useRef, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contribute from './pages/Contribute';
import CassetteLanding from './components/CassetteLanding';
import './App.css';



function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <Router>
        <audio ref={audioRef} loop>
          <source src="/haveitall.mp3" type="audio/mpeg" />
        </audio>
      <Routes>
        <Route path="/" element={<CassetteLanding audioRef={audioRef} setIsPlaying={setIsPlaying} />} />
        <Route path="/cards" element={
          <div className='App'>
            <Home isPlaying={isPlaying} />
          </div>
        } />
        <Route path="/contribute" element={
          <div className='App'>
            <Contribute />
          </div>
        } />
      </Routes>
    </Router>
  );
}

// export default App;


// function App() {
//   return <CassetteLanding />;
// }

export default App;