import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DefinitionDetail({ record }) {
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

    return (
        <>
            <div className="container mt-3">

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

                    

            </div>
        </>
    );
}