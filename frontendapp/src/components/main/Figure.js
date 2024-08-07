import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import DefinitionDetail from './DefinitionDetail';
import UsageDetail from './UsageDetail';
import '../../css/Figure.css'

export default function Figure({ definitions, usages, onUpdateDefinition, onUpdateUsage }) {
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

    const handleUsageUpdate = (updatedContent) => {
        setUsageData(updatedContent);
    };

    const toggleDefinitionExpand = () => {
        setIsDefinitionExpanded(!isDefinitionExpanded);
        if (isDefinitionExpanded) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
                setDefinitionExpand={setIsDefinitionExpanded}
                onContentUpdate={onUpdateDefinition}
            />
            <UsageDetail 
                record={usageData}
                onContentUpdate={onUpdateUsage}
            />
        </>
    );
}