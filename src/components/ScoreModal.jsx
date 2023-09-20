import React from 'react';
import '../styles/ScoreModal.css';

const ScoreModal = ({ score, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>
                    X
                </span>
                <h2>Your Score: {score}</h2>
            </div>
        </div>
    );
};

export default ScoreModal;
