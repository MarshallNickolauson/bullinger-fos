import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import config from '../../config/config';
import DefinitionDetail from './DefinitionDetail';
import UsageDetil from './UsageDetail';

export default function Figure({ definitions, usages }) {
    const { id } = useParams();

    const stringId = String(id);
    const definitionData = definitions.find(def => String(def.id) === stringId);
    const usageData = usages.find(usage => String(usage.id) === stringId);

    if (!definitionData || !usageData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <DefinitionDetail record={definitionData} />
            <UsageDetil record={usageData} />
        </>
    );
}