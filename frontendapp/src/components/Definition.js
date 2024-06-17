import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import config from '../config/config';
import DefinitionDetail from './DefinitionDetail';

export default function Definition() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const apiEndpoint = `${config.apiBaseUrl}/definitions/${id}`;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        const jsonData = await response.json();
        setData(jsonData);
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
        <h1>Definition Detail</h1>

        <DefinitionDetail record={data} />
    </>
  );
}
