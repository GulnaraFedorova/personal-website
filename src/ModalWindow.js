

import React, { useState, useCallback, useEffect } from "react";
import './ModalWindow.css';

const ModalWindow = ({ show, onClose, children }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
            document.addEventListener('keydown', handleKeyDown);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 800);
            document.removeEventListener('keydown', handleKeyDown);
            return () => clearTimeout(timer);
        }
    }, [show, handleKeyDown]);

    useEffect(() => {
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div className={`modal-backdrop ${show ? 'show' : ''}`} style={{ display: isVisible }} onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="modal-close-button" aria-lable="Close modal"></button>
                {children}
                <div className="modal-social">
                    <div className="social-button">
                        <a href="https://t.me/gkhurmatova" target="_blank" className="social telegram"></a>
                        <p>@khurmatova</p>
                    </div>
                    <div className="social-button">
                        <a href="mailto:gul-khurmatova@yandex.ru" target="_blank" className="social mail"></a>
                        <p>gul-khurmatova@yandex.ru</p>
                    </div>
                    <div className="social-button">
                        <a href="tel:+79267245857"  target="_blank" className="social phone"></a>
                        <p>+7(926)724-58-57</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ModalWindow

