import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Definitions from './components/Definitions';
import Usages from './components/Usages';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/definitions' element={<Definitions />} />
          <Route path='/usages' element={<Usages />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
