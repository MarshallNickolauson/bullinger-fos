import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Definitions from './components/Figures';
import Definition from './components/Figure';

function App() {
  return (
    <Router>
      <div className='app-container'>
        <Routes>
          <Route path='/figures' element={<Definitions />} />
          <Route path='/figures/:id' element={<Definition />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
