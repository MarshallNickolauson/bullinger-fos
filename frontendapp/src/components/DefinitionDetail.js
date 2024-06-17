import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config/config'

export default function DefinitionDetail({ record }) {
    const id = record['id'];
    const [isEditing, setIsEditing] = useState(false);
    const [editableBookPosition, setEditableBookPosition] = useState(record['book_position']);
    const [editableFigureName, setEditableFigureName] = useState(record['figure_name']);
    const [editableContent, setEditableContent] = useState(record['content']);
    const [editableCustomRules, setEditableCustomRules] = useState(record['custom_rules']);

    const textareaRef = useRef(null);
    const measureRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (isEditing && textareaRef.current && measureRef.current) {
            const newHeight = measureRef.current.scrollHeight;
            textareaRef.current.style.height = `${newHeight + 3}px`;
        }
    }, [isEditing, editableContent]);

    const handleEditClick = () => {
        if (isEditing) {
            saveContent();
        }
        setIsEditing(!isEditing);
    };

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

    const handleBookPositionChange = (event) => {
        setEditableBookPosition(event.target.value);
    };

    const handleFigureNameChange = (event) => {
        setEditableFigureName(event.target.value);
    };

    const handleContentChange = (event) => {
        setEditableContent(event.target.value);
    };

    const handleCustomRulesChange = (event) => {
        setEditableCustomRules(event.target.value);
    };

    const saveContent = () => {
        const apiEndpoint = `${config.apiBaseUrl}/definitions/${id}`;

        fetch(apiEndpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": id,
                "book_position": editableBookPosition,
                "figure_name": editableFigureName,
                "content": editableContent,
                "custom_rules": editableCustomRules == '' ? '//Code for react' : editableCustomRules,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(`Failed to save content: ${JSON.stringify(errorData)}`);
                    });
                }
                return response.json();
            })
            .then(updatedRecord => {
                setEditableBookPosition(updatedRecord.book_position);
                setEditableFigureName(updatedRecord.figure_name);
                setEditableContent(updatedRecord.content);
                setEditableCustomRules(updatedRecord.custom_rules);
                setIsEditing(false);
            })
            .catch(e => {
                console.error('Error saving content: ', e);
            });
    };

    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            <div className="figure-detail">
                <div className="figure-info">
                    <p>{capitalizeFirstLetter(editableFigureName)}</p>
                </div>
                <div className="figure-content">
                    <h3>Content</h3>
                    <button disabled={id === 1} className={id === 1 ? 'button-disabled' : ''} onClick={handlePrevClick}>
                        Prev
                    </button>
                    <button disabled={id === 201} className={id === 201 ? 'button-disabled' : ''} onClick={handleNextClick}>
                        Next
                    </button>
                    <button onClick={handleEditClick}>
                        {isEditing ? 'Save' : 'Edit'}
                    </button>
                    {isEditing ? (
                        <>
                            <textarea
                                ref={textareaRef}
                                className="figure-editable"
                                value={editableContent}
                                onChange={handleContentChange}
                            />
                            <pre
                                ref={measureRef}
                                className="figure-view measure-pre"
                                style={{ visibility: 'hidden', position: 'absolute' }}
                            >
                                {editableContent}
                            </pre>
                        </>
                    ) : (
                        <pre className="figure-view">
                            {editableContent}
                        </pre>
                    )}
                </div>
                <div className='figure-content'>
                    {isEditing ? (
                        <>
                            <h3>Custom Rules</h3>
                            <textarea
                                className='figure-editable'
                                value={editableCustomRules}
                                onChange={handleCustomRulesChange}
                            />
                        </>
                    ) : (<> </>)}
                </div>
            </div>
        </>
    );
}