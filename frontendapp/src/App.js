import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import FiguresDev from './components/dev/FiguresDev';
import FigureDev from './components/dev/FigureDev';
import HomePage from './components/main/HomePage';
import TopNavbar from './components/main/TopNavBar';

function App() {
  return (
    <Router>
      <div>
        <TopNavbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/dev/figures' element={<FiguresDev />} />
          <Route path='/dev/figures/:id' element={<FigureDev />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
