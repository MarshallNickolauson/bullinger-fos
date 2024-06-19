import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FiguresDev from './components/dev/FiguresDev';
import FigureDev from './components/dev/FigureDev';
import HomePage from './components/main/HomePage';
import TopNavbar from './components/main/TopNavBar';
import SideNavbar from './components/main/SideNavBar';
import AboutPage from './components/main/AboutPage';

function App() {
  return (
    <Router>
      <div>
        <TopNavbar />
        <div className="row">
          <div className="col-2 bg-light vh-100">
            <SideNavbar />
          </div>
          <div className="col-10">
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/dev/figures' element={<FiguresDev />} />
              <Route path='/dev/figures/:id' element={<FigureDev />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
