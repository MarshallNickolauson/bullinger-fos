import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import FiguresDev from './components/dev/FiguresDev';
import FigureDev from './components/dev/FigureDev';


function App() {
  return (
    <Router>
      <div className='container-xl'>
        <Routes>
          <Route path='/dev/figures' element={<FiguresDev />} />
          <Route path='/dev/figures/:id' element={<FigureDev />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
