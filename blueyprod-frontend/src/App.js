import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contribute from './pages/Contribute';
import CassetteLanding from './components/CassetteLanding';
import './App.css';


// function App() {
//     return (
//       <Router>
//         <div className='App'>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/contribute" element={<Contribute />} /> 
//           </Routes>
//         </div>
//       </Router>
//     )
// }

// export default App;


function App() {
  return <CassetteLanding />;
}

export default App;