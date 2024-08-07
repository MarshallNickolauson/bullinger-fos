import React, { useEffect, useRef, useState } from 'react';
import config from '../../config/config';

export default function UsageDetail({ record, onContentUpdate }) {
    const id = record['id'];

    const [isEditing, setIsEditing] = useState(false);
    const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
    const [editableContent, setEditableContent] = useState('');
    const [tempEditableContent, setTempEditableContent] = useState('');
    const [editableRules, setEditableRules] = useState('');

    const scrollToTop = () => {
        window.scrollTo({ top: 300, behavior: 'smooth' });
    }

    useEffect(() => {
        if (record['content'] == null) {
            setEditableContent('');
        } else {
            setEditableContent(record['content']);
            setTempEditableContent(record['content']);
        }
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

    const handleCloseEdit = () => {
        setIsEditing(false);
        setTempEditableContent(editableContent);
    }

    const handleRuleClick = (event) => {
        event.stopPropagation();
        setIsRuleModalOpen(true);
    }

    const handleCloseRuleModal = () => {
        setIsRuleModalOpen(false);
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
                "content": tempEditableContent,
                "custom_rules": editableRules == '' ? '[]' : editableRules,
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
            setIsRuleModalOpen(false);
            onContentUpdate(updatedRecord);
            scrollToTop();
        });
    };

    return (
        <>
            <div className="main-container mt-4">

                {/* Usage Header */}
                <div className='sticky-header'>
                    <div className='d-flex justify-content-between align-items-center mt-3'>
                        <h1 className='content-title'>Usages</h1>
                        <div>
                            {isEditing ? (
                                <>
                                    <button type="button" className="btn-dark-blue px-3 mx-1" data-dismiss="modal" onClick={handleCloseEdit}>Close</button>
                                    <button type="button" className="btn-dark-blue px-3" onClick={handleSaveChanges}>Save Changes</button>
                                </>
                            ) : (
                                <>
                                    <button type='button' className='btn-dark-blue px-3 edit-button mx-1' onClick={handleEditClick}>Edit</button>
                                    <button type='button' className='btn-dark-blue px-3 edit-button' onClick={handleRuleClick}>Rule</button>  
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Usage Card */}
                <div className="content-card usage-card">
                    {isEditing ? (
                        <div className='content expanded'>
                            <textarea
                                className='content-edit-box'
                                value={tempEditableContent}
                                onChange={(e) => setTempEditableContent(e.target.value)}
                                rows={20}
                            />
                        </div>
                    ) : (
                        <div className='content expanded'>
                            {formatContent(editableContent)}
                        </div>
                    )}
                </div>

                {/* Backdrop */}
                {isRuleModalOpen && <div className="modal-backdrop show"></div>}

                {/* Rule Modal */}
                <div className={`modal fade ${isRuleModalOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isRuleModalOpen ? 'block' : 'none' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Usage Formatting</h5>
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
                                <button type="button" className="btn-dark-blue px-3 edit-button" data-dismiss="modal" onClick={handleCloseRuleModal}>Close</button>
                                <button type="button" className="btn-dark-blue px-3 edit-button" onClick={handleSaveChanges}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}