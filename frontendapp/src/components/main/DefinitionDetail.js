import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config/config';

export default function DefinitionDetail({ record, isDefinitionExpanded, toggleDefinitionExpand, setDefinitionExpand, onContentUpdate }) {
    const id = record['id'];
    const figure_name = record['figure_name'];
    const definition = record['content'] || '';

    const [isEditing, setIsEditing] = useState(false);
    const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
    const [editableContent, setEditableContent] = useState('');
    const [editableRules, setEditableRules] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        setEditableContent(record['content']);
        setEditableRules(record['custom_rules']);
    }, [record]);

    useEffect(() => {
        if (isRuleModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isRuleModalOpen]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsEditing(false);
                setIsRuleModalOpen(false);
                toggleExpand();
            }
        };

        if (isEditing || isRuleModalOpen) {
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.removeEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isEditing, isRuleModalOpen]);

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
        const sentences = text.split('.');
        return sentences.slice(0, 2).join('.') + '...';
    };

    const toggleExpand = () => {
        toggleDefinitionExpand();
    };

    const handleEditClick = (event) => {
        event.stopPropagation();
        toggleExpand();
        setIsEditing(true);
    }

    const handleCloseEditModal = () => {
        setIsEditing(false);
        setDefinitionExpand(true);
    }

    const handleRuleClick = (event) => {
        event.stopPropagation();
        setIsRuleModalOpen(true);
    }

    const handleCloseRuleModal = () => {
        setIsRuleModalOpen(false);
    }

    const handleSaveChanges = () => {
        const apiEndpoint = `${config.apiBaseUrl}/definitions/${id}`;

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
                "custom_rules": editableRules == '' ? '//Code for react formatting' : editableRules,
            }),
        }).then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(`Failed to save definition: ${JSON.stringify(errorData)}`);
                });
            }
            return response.json();
        }).then(updatedRecord => {
            setIsEditing(false);
            setIsRuleModalOpen(false);
            onContentUpdate(updatedRecord);
            setDefinitionExpand(true);
        });
    };

    const parseCustomRules = (rulesString) => {
        try {
            return rulesString.trim().split('\n').map(ruleString => {
                const parts = ruleString.split(';');
                const patternPart = parts.find(part => part.startsWith('pattern:')).split('pattern:')[1].trim();
                const spacesPart = parts.find(part => part.startsWith('spaces:')).split('spaces:')[1].trim();
                return {
                    pattern: new RegExp(patternPart.replace(/^\/|\/$/g, '')),
                    spaces: parseInt(spacesPart, 10)
                };
            });
        } catch (error) {
            console.error('Error parsing custom rules:', error);
            return [];
        }
    };

    const applyIndentation = (line) => {
        const customRules = parseCustomRules(record['custom_rules']);
        //console.log('Custom Rules:', customRules);

        for (const { pattern, spaces } of customRules) {
            if (pattern.test(line)) {
                return (
                    <span key={line}>
                        {'\u00A0'.repeat(spaces)}
                        {line}
                    </span>
                );
            }
        }

        return line;
    };

    const formatContent = (content) => {
        return content.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {applyIndentation(line)}
                <br />
            </React.Fragment>
        ));
    };

    return (
        <>
            <div className="main-container mt-4">

                {/* Main content */}
                <div className='d-flex justify-content-between align-items-center mt-3 pb-4 border-bottom'>
                    <button
                        type="button"
                        className="btn btn-outline-dark"
                        disabled={id === 1 || isEditing}
                        onClick={handlePrevClick}>
                        Prev
                    </button>
                    <div className='figure-name'>{capitalizeFirstLetter(figure_name)}</div>
                    <button
                        type="button"
                        className="btn btn-outline-dark"
                        disabled={id === 201 || isEditing}
                        onClick={handleNextClick}>
                        Next
                    </button>
                </div>

                {/* Definition Header */}
                <div className='sticky-header'>
                    <div className='d-flex justify-content-between align-items-center mt-3'>
                        <h1 className='definition-title'>Definition</h1>
                        <div>
                            {isEditing ? (
                                <>
                                    <button type="button" className="btn btn-outline-dark mx-1" data-dismiss="modal" onClick={handleCloseEditModal}>Close</button>
                                    <button type="button" className="btn btn-success" onClick={handleSaveChanges}>Save Changes</button>
                                </>
                            ) : (
                                <>
                                    <button type='button' className='btn btn-outline-dark edit-button mx-1' onClick={handleEditClick}>Edit</button>
                                    <button type='button' className='btn btn-outline-dark edit-button' onClick={handleRuleClick}>Rule</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Definition Card */}
                <div className="definition-card container">

                    {isEditing ? (
                        <div className='content expanded'>
                            <textarea
                                className='definition-edit-box'
                                value={editableContent}
                                onChange={(e) => setEditableContent(e.target.value)}
                                rows={15}
                            />
                        </div>
                    ) : <>
                        <div className={`content ${isDefinitionExpanded ? 'expanded' : 'collapsed'}`}>
                            {isDefinitionExpanded ? formatContent(definition) : getPreviewText(definition)}
                        </div>
                    </>
                    }
                    <div className="toggle-indicator" onClick={toggleExpand}>...</div>
                </div>

                {/* Backdrop */}
                {isRuleModalOpen && <div className="modal-backdrop show"></div>}

                {/* Rule Modal */}
                <div className={`modal fade ${isRuleModalOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isRuleModalOpen ? 'block' : 'none' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Formatting</h5>
                                <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" onClick={handleCloseRuleModal}></button>
                            </div>
                            <div className="modal-body">
                                <textarea
                                    className="form-control"
                                    value={editableRules}
                                    onChange={(e) => setEditableRules(e.target.value)}
                                    rows={15}
                                    style={{ resize: 'none', whiteSpace: 'pre-wrap' }}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-dark" data-dismiss="modal" onClick={handleCloseRuleModal}>Close</button>
                                <button type="button" className="btn btn-success" onClick={handleSaveChanges}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}