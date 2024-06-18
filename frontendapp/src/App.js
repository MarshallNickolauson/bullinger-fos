import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Definitions from './components/Figures';
import Definition from './components/Figure';

function App() {
  return (
    <Router>
      <div className='container-xl'>
        <Routes>
          <Route path='/figures' element={<Definitions />} />
          <Route path='/figures/:id' element={<Definition />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
