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
import Figure from './components/main/Figure';

function App() {
  const [definitionData, setDefinitionData] = useState([]);
  const [usageData, setUsageData] = useState([]);

  useEffect(() => {
    const definitionApiEndpoint = `${config.apiBaseUrl}/definitions`;
    const usageApiEndpoint = `${config.apiBaseUrl}/usages`;

    const fetchDefinitions = fetch(definitionApiEndpoint, {
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
    });

    const fetchUsages = fetch(usageApiEndpoint, {
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
    });

    Promise.all([fetchDefinitions, fetchUsages])
      .then(([definitions, usages]) => {
        setDefinitionData(definitions);
        setUsageData(usages);
      })
      .catch(e => {
        console.error('Error getting content: ', e);
      });
  }, []);

  useEffect(() => {
    console.log(definitionData);
    console.log(usageData);
  }, [definitionData, usageData]);

  return (
    <Router>
      <div>
        <TopNavbar />
        <div className="row">
          <div className="col-2 vh-100">
            <SideNavbar data={definitionData} />
          </div>
          <div className="col-10">
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/figures/:id' element={<Figure definitions={definitionData} usages={usageData} />} />

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
