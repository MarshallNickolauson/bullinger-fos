import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import config from '../../config/config';
import DefinitionDetail from './DefinitionDetailDev';
import UsageDetailDev from './UsageDetailDev';

export default function FigureDev() {
  const { id } = useParams();
  const [definitionData, setDefinitionData] = useState(null);
  const [usageData, setUsageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const definitionApiEndpoint = `${config.apiBaseUrl}/definitions/${id}`;
    const usageApiEndpoint = `${config.apiBaseUrl}/usages/${id}`;

    const fetchData = async () => {
      try {
        setLoading(true);
        const definitionResponse = await fetch(definitionApiEndpoint);
        if (!definitionResponse.ok) {
          throw new Error('Network response was not OK');
        }
        const definitionJsonData = await definitionResponse.json();

        const usageResponse = await fetch(usageApiEndpoint);
        if (!usageResponse.ok) {
          throw new Error('Network response was not OK');
        }
        const usageJsonData = await usageResponse.json();

        setDefinitionData(definitionJsonData);
        setUsageData(usageJsonData);
        
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
        <DefinitionDetail record={definitionData} />
        <UsageDetailDev record={usageData} />
    </>
  );
}
