import React, { useEffect, useRef, useState } from 'react';
import config from '../../config/config';

export default function IntroductionPage({ data, onIntroductionUpdate }) {

    const [isEditing, setIsEditing] = useState(false);
    const [editableContent, setEditableContent] = useState('');
    const [tempEditableContent, setTempEditableContent] = useState('');

    const scrollToTop = () => {
        window.scrollTo({ top: 300, behavior: 'smooth' });
    }

    useEffect(() => {
        if (data == null) {
            setEditableContent('');
        } else {
            setEditableContent(data);
            setTempEditableContent(data);
        }
    }, [data]);

    useEffect(() => {
        console.log(data)
    })

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsEditing(false);
            }
        };

        if (isEditing) {
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.removeEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isEditing]);

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

    const handleSaveChanges = () => {
        const apiEndpoint = `${config.apiBaseUrl}/introduction/1`;

        fetch(apiEndpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": "1",
                "content": tempEditableContent,
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
            onIntroductionUpdate(updatedRecord.content);
            scrollToTop();
        })

    }

    return (
        <>
            <div className="main-container mt-4">

                {/* Introduction Header */}
                <div className='sticky-header'>
                    <div className='d-flex justify-content-between align-items-center mt-3'>
                        <h1 className='content-title'>Introduction</h1>
                        <div>
                            {isEditing ? (
                                <>
                                    <button type="button" className="btn-dark-blue px-3 mx-1" data-dismiss="modal" onClick={handleCloseEdit}>Close</button>
                                    <button type="button" className="btn-dark-blue px-3" onClick={handleSaveChanges}>Save Changes</button>
                                </>
                            ) : (
                                <>
                                    <button type='button' className='btn-dark-blue px-3 edit-button mx-1' onClick={handleEditClick}>Edit</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Introduction Card */}
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

            </div>
        </>
    );
}