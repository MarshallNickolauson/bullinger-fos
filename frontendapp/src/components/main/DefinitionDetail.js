import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config/config';

export default function DefinitionDetail({ record, isDefinitionExpanded, toggleDefinitionExpand, onContentUpdate }) {
    const id = record['id'];
    const figure_name = record['figure_name'];
    const definition = record['content'] || '';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editableContent, setEditableContent] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        setEditableContent(record['content']);
    }, [record]);
    
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);

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

    const formatContent = (content) => {
        return content.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    const toggleExpand = () => {
        toggleDefinitionExpand();
    };

    const handleEditClick = (event) => {
        event.stopPropagation();
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
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
                "custom_rules": editableContent == '' ? '//Code for react formatting' : editableContent,
            }),
        }).then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(`Failed to save definition: ${JSON.stringify(errorData)}`);
                });
            }
            return response.json();
        }).then(updatedRecord => {
            setIsModalOpen(false);
            onContentUpdate(updatedRecord);
        });
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
                            Next
                        </button>
                    </div>
                </div>

                <div className="definition-card container" onClick={toggleExpand}>
                    <div className={`content ${isDefinitionExpanded ? 'expanded' : 'collapsed'}`}>
                        {isDefinitionExpanded ? formatContent(definition) : getPreviewText(definition)}
                        {isDefinitionExpanded && (
                            <button type='button' className='btn btn-outline-dark edit-button' onClick={handleEditClick}>Edit</button>
                        )}
                    </div>
                    <div className="toggle-indicator">
                        {isDefinitionExpanded ? '...' : '...'}
                    </div>
                </div>

                {/* Backdrop */}
                {isModalOpen && <div className="modal-backdrop show"></div>}

                {/* Modal */}
                <div className={`modal fade ${isModalOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isModalOpen ? 'block' : 'none' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Content</h5>
                                <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <textarea
                                    className="form-control"
                                    value={editableContent}
                                    onChange={(e) => setEditableContent(e.target.value)}
                                    rows={15}
                                    style={{ resize: 'none' }}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save Changes</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleCloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}