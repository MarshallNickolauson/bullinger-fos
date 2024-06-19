import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import config from '../../config/config';
import DefinitionDetail from './DefinitionDetail';

export default function Figure({ definitions, usages }) {
    const { id } = useParams();
    const location = useLocation();

    const stringId = String(id);
    const definitionData = definitions.find(def => String(def.id) === stringId);
    const usageData = usages.find(usage => String(usage.id) === stringId);

    const [isDefinitionExpanded, setIsDefinitionExpanded] = useState(false);

    useEffect(() => {
        setIsDefinitionExpanded(false);
    }, [location]);

    const toggleDefinitionExpand = () => {
        setIsDefinitionExpanded(!isDefinitionExpanded);
        if (isDefinitionExpanded) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (!isDefinitionExpanded) {
            window.scrollTo({ top: 60, behavior: 'smooth' })
        }
    };

    if (!definitionData || !usageData) {
        return <div>Loading...</div>;
    }

    return (

        <>
            <DefinitionDetail
                record={definitionData}
                isDefinitionExpanded={isDefinitionExpanded}
                toggleDefinitionExpand={toggleDefinitionExpand}
            />
            
        </>
    );
}