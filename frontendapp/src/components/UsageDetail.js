import React, { useState, useEffect, useRef } from "react";
import config from '../config/config'

export default function UsageDetail({ record }) {

    const id = record['book_position'];
    const [isEditing, setIsEditing] = useState(false);
    const [editableContent, setEditableContent] = useState(record['content']);
    const [editableCustomRules, setEditableCustomRules] = useState(record['custom_rules']);

    const handleContentChange = (event) => {
        setEditableContent(event.target.value);
    };

    const handleCustomRulesChange = (event) => {
        setEditableCustomRules(event.target.value);
    };
    
    const handleEditClick = () => {
        if (isEditing) {
            saveContent();
        }
        setIsEditing(!isEditing);
    };

    const textareaRef = useRef(null);
    const measureRef = useRef(null);

    useEffect(() => {
        if (isEditing && textareaRef.current && measureRef.current) {
            const newHeight = measureRef.current.scrollHeight;
            textareaRef.current.style.height = `${newHeight + 3}px`;
        }
    }, [isEditing, editableContent]);

    const saveContent = () => {
        const apiEndpoint = `${config.apiBaseUrl}/usages/${id}`;

        fetch(apiEndpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": id,
                "book_position": record['book_position'],
                "figure_name": record['figure_name'],
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
                setEditableContent(updatedRecord.content);
                setEditableCustomRules(updatedRecord.custom_rules);
                setIsEditing(false);
            })
            .catch(e => {
                console.error('Error saving content: ', e);
            });
    }

    return (
        <>
            <div className="figure-detail">
                <div className="figure-info">
                    <p>Usage</p>
                </div>
                <div className="figure-content">
                    <h3>Content</h3>
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