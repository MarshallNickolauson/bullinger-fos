import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import config from '../../config/config';
import DefinitionDetail from './DefinitionDetail';

export default function Figure({ definitions, usages }) {
    const { id } = useParams();
    const location = useLocation();

    const stringId = String(id);

    const [definitionData, setDefinitionData] = useState([]);
    const [usageData, setUsageData] = useState([]);
    const [isDefinitionExpanded, setIsDefinitionExpanded] = useState(false);

    useEffect(() => {
        setDefinitionData(definitions.find(def => String(def.id) === stringId));
        setUsageData(usages.find(usage => String(usage.id) === stringId));
        setIsDefinitionExpanded(false);
    }, [location, stringId, definitions, usages]);

    const handleDefinitionUpdate = (updatedContent) => {
        setDefinitionData(updatedContent);
    };

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
                onContentUpdate={handleDefinitionUpdate}
            />
            
        </>
    );
}