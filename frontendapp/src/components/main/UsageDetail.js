import React, { useEffect, useRef, useState } from 'react';
import config from '../../config/config';

export default function UsageDetil({ record, onContentUpdate }) {
    const id = record['id'];
    const content = record['content'] || '';

    const [isEditing, setIsEditing] = useState(false);
    const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
    const [editableContent, setEditableContent] = useState('');
    const [editableRules, setEditableRules] = useState('');

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

    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const getPreviewText = (text) => {
        const sentences = text.split('.');
        return sentences.slice(0, 2).join('.') + '...';
    };

    const formatContent = (content) => {
        return content.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    const handleEditClick = (event) => {
        event.stopPropagation();
        setIsEditing(true);
    }

    const handleCloseModal = () => {
        setIsEditing(false);
    }

    const handleSaveChanges = () => {
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
                "custom_rules": editableContent == '' ? '//Code for react formatting' : editableContent,
            }),
        }).then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(`Failed to save usage: ${JSON.stringify(errorData)}`);
                });
            }
            return response.json();
        }).then(updatedRecord => {
            setIsEditing(false);
            onContentUpdate(updatedRecord);
        });
    };

    return (
        <>
            <div className="main-container mt-4">

                {/* Usage Header */}
                <div className='sticky-header'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h1 className='usage-title'>Usages</h1>
                        <button type='button' className='btn btn-outline-dark edit-button' onClick={handleEditClick}>Edit</button>
                    </div>
                </div>


                {/* Usage Card */}
                <div className="usage-card container">
                    <div className='content expanded'>
                        {formatContent(content)}
                    </div>
                </div>

                {/* Backdrop */}
                {isEditing && <div className="modal-backdrop show"></div>}

                {/* Modal */}
                <div className={`modal fade ${isEditing ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isEditing ? 'block' : 'none' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Usages Content</h5>
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
                                <button button type="button" className="btn btn-outline-dark" data-dismiss="modal" onClick={handleCloseModal}>Close</button>
                                <button type="button" className="btn btn-success" onClick={handleSaveChanges}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}