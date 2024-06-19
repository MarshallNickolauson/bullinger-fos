import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FiguresDev from './components/dev/FiguresDev';
import FigureDev from './components/dev/FigureDev';
import HomePage from './components/main/HomePage';
import TopNavbar from './components/main/TopNavBar';
import SideNavbar from './components/main/SideNavBar';
import AboutPage from './components/main/AboutPage';
import { useEffect, useState } from 'react';
import config from './config/config';

function App() {

  const [definitionData, setDefinitionData] = useState(null);

  useEffect(() => {
    const definitionApiEndpoint = `${config.apiBaseUrl}/definitions`;

    fetch(definitionApiEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(`Failed to get content: ${JSON.stringify(error)}`)
        });
      }
      return response.json();
    }).then(data => {
      setDefinitionData(data);
    }).catch(e => {
      console.error('Error getting content: ', e);
    });
  }, []);

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
