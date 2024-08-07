import '../src/css/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/main/HomePage';
import TopNavbar from './components/main/TopNavBar';
import SideNavbar from './components/main/SideNavBar';
import AboutPage from './components/main/AboutPage';
import { useEffect, useState } from 'react';
import config from './config/config';
import Figure from './components/main/Figure';
import IntroductionPage from './components/main/IntroductionPage';

function App() {
  const [definitionData, setDefinitionData] = useState([]);
  const [usageData, setUsageData] = useState([]);
  const [introductionData, setIntroductionData] = useState('');

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const introductionApiEndpoint = `${config.apiBaseUrl}/introduction`
    const definitionApiEndpoint = `${config.apiBaseUrl}/definitions`;
    const usageApiEndpoint = `${config.apiBaseUrl}/usages`;

    const fetchIntroduction = fetch(introductionApiEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(`Failed to get introduction: ${JSON.stringify(error)}`)
        })
      }
      return response.json();
    })

    const fetchDefinitions = fetch(definitionApiEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(`Failed to get definitions: ${JSON.stringify(error)}`)
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
          throw new Error(`Failed to get usages: ${JSON.stringify(error)}`)
        });
      }
      return response.json();
    });

    Promise.all([fetchIntroduction, fetchDefinitions, fetchUsages])
      .then(([introduction, definitions, usages]) => {
        setIntroductionData(introduction[0].content)
        setDefinitionData(definitions);
        setUsageData(usages);
      })
      .catch(e => {
        console.error('Error getting content: ', e);
      });
  }, []);

  const handleUpdateIntroduction = (updatedIntroduction) => {
    setIntroductionData(updatedIntroduction);
  };

  const handleUpdateDefinition = (updatedDefinition) => {
    setDefinitionData((prevDefinitions) =>
      prevDefinitions.map((definition) =>
        definition.id === updatedDefinition.id ? updatedDefinition : definition
      )
    );
  };

  const handleUpdateUsage = (updatedUsage) => {
    setUsageData((prevUsages) =>
      prevUsages.map((usage) =>
        usage.id === updatedUsage.id ? updatedUsage : usage
      )
    );
  };

  return (
    <Router>
      <div>
        <TopNavbar />
        <div className={windowSize.width < 992 ? '' : 'row'}>
          <div className={`${windowSize.width < 992 ? '' : 'col-2 vh-100'}`}>
            <SideNavbar data={definitionData} />
          </div>
          <main className={`${windowSize.width < 992 ? '' : 'col-10'} main pt-5`}>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/introduction' element={<IntroductionPage data={introductionData} onIntroductionUpdate={handleUpdateIntroduction} />} />
              <Route path='/figures/:id' element={<Figure definitions={definitionData} usages={usageData} onUpdateDefinition={handleUpdateDefinition} onUpdateUsage={handleUpdateUsage} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
