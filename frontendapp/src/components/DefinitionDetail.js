import React, { useEffect, useRef, useState } from 'react';
import config from '../config/config'

export default function DefinitionDetail({ record }) {
    const id = record['book_position'];
    const [isEditing, setIsEditing] = useState(false);
    const [editableBookPosition, setEditableBookPosition] = useState(record['book_position']);
    const [editableFigureName, setEditableFigureName] = useState(record['figure_name']);
    const [editableContent, setEditableContent] = useState(record['content']);
    const [editableCustomRules, setEditableCustomRules] = useState(record['custom_rules']);

    const textareaRef = useRef(null);
    const measureRef = useRef(null);

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

    const handleContentChange = (event) => {
        setEditableContent(event.target.value);
    };

    const handleBookPositionChange = (event) => {
        setEditableBookPosition(event.target.value);
    };

    const handleFigureNameChange = (event) => {
        setEditableFigureName(event.target.value);
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
                "custom_rules": editableCustomRules,
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
        <div className="definition-detail">
            <div className="definition-info">
                <p>{capitalizeFirstLetter(editableFigureName)}</p>
                <p><strong>Custom Rules:</strong> {editableCustomRules}</p>
            </div>
            <div className="definition-content">
                <h3>Content</h3>
                <button onClick={handleEditClick}>
                    {isEditing ? 'Save' : 'Edit'}
                </button>
                {isEditing ? (
                    <>
                        <textarea
                            ref={textareaRef}
                            className="definition-editable"
                            value={editableContent}
                            onChange={handleContentChange}
                        />
                        <pre
                            ref={measureRef}
                            className="definition-view measure-pre"
                            style={{ visibility: 'hidden', position: 'absolute' }}
                        >
                            {editableContent}
                        </pre>
                    </>
                ) : (
                    <pre className="definition-view">
                        {editableContent}
                    </pre>
                )}
            </div>
            <div className='definition-content'>
                
            </div>
        </div>
    );
}