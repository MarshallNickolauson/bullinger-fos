import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Definitions from './components/Definitions';
import Usages from './components/Usages';
import Definition from './components/Definition';
import UsageDetail from './components/UsageDetail';

function App() {
  return (
    <Router>
      <div className='app-container'>
        <Routes>
          <Route path='/definitions' element={<Definitions />} />
          <Route path='/definitions/:id' element={<Definition />} />
          <Route path='/usages' element={<Usages />} />
          <Route path='/usages/:id' element={<UsageDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
