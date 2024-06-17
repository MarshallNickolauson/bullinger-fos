import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Definitions from './components/Definitions';
import Usages from './components/Usages';
import DefinitionDetail from './components/DefinitionDetail';
import UsageDetail from './components/UsageDetail';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/definitions' element={<Definitions />} />
          <Route path='/definitions/:id' element={<DefinitionDetail />} />
          <Route path='/usages' element={<Usages />} />
          <Route path='/usages/:id' element={<UsageDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
