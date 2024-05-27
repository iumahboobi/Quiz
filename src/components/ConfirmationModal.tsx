import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const ModalContent = styled.div`
    padding: 20px;
    background: white;
    border-radius: 8px;
    text-align: center;
`;

export const Button = styled.button`
    margin: 10px;
    padding: 10px 20px;
    background-color: #2ca6ad;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

interface ConfirmationModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onRequestClose, onConfirm }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
            
                overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)',zIndex:'2' },
                content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)' }
                
            }}
        >
            <ModalContent style={{}} >
                <p>Are you sure you want to submit the test?</p>
                <Button onClick={onConfirm}>OK</Button>
                <Button onClick={onRequestClose}>Cancel</Button>
            </ModalContent>
        </Modal>
    );
};

export default ConfirmationModal;
