import React from 'react';
import '../styles/ScoreModal.css';

const ScoreModal = ({ score, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>
                    X
                </span>
                <div className="lose-button" >
                    You Lose
                </div>
                <h2>Your Score: {score}</h2>
                <button className="restart-button" onClick={onClose}>
                    Restart
                </button>
            </div>
        </div>
    );
};

export default ScoreModal;
