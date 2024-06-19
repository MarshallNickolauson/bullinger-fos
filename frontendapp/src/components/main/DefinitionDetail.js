import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DefinitionDetail({ record, isDefinitionExpanded, toggleDefinitionExpand }) {
    const id = record['id'];
    const figure_name = record['figure_name'];
    const definition = record['content'];

    const navigate = useNavigate();

    const handlePrevClick = () => {
        const prevId = id - 1;
        if (prevId >= 1 && prevId <= 201) {
            navigate(`/figures/${prevId}`)
        }
    }

    const handleNextClick = () => {
        const nextId = id + 1;
        if (nextId >= 1 && nextId <= 201) {
            navigate(`/figures/${nextId}`)
        }
    }

    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const getPreviewText = (text) => {
        const sentences = text.split('. ');
        return sentences.slice(0, 2).join('. ') + '...';
    };

    const toggleExpand = () => {
        toggleDefinitionExpand();
    };

    return (
        <>
            <div className="container mt-4">

                <div className="row text-center">
                    <div className="col-2">
                        <button
                            type="button"
                            className="btn btn-outline-dark"
                            disabled={id === 1}
                            onClick={handlePrevClick}>
                            Prev
                        </button>
                    </div>
                    <div className="col-8">
                        {capitalizeFirstLetter(figure_name)}
                    </div>
                    <div className="col-2">
                        <button
                            type="button"
                            className="btn btn-outline-dark"
                            disabled={id === 201}
                            onClick={handleNextClick}>
                            Prev
                        </button>
                    </div>
                </div>

                <div className="definition-card" onClick={toggleExpand}>
                    <div className={`content ${isDefinitionExpanded ? 'expanded' : 'collapsed'}`}>
                        {isDefinitionExpanded ? definition : getPreviewText(definition)}
                    </div>
                    <div className="toggle-indicator">
                        {isDefinitionExpanded ? '...' : '...'}
                    </div>
                </div>

            </div>
        </>
    );
}