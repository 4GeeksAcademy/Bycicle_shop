import React, { useState, useEffect } from "react";
import "../../styles/arrowToTop.css";

export const ArrowToTop = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        // button is displayed after scrolling for 300 pixels
        const handleScrollButtonVisibility = () => {
            const scrollPosition = window.scrollY;
            scrollPosition > 300 ? setShowButton(true) : setShowButton(false);
        }

        window.addEventListener('scroll', handleScrollButtonVisibility);

        return () => {
            window.removeEventListener('scroll', handleScrollButtonVisibility);
        }
    }, []);

    // When the user clicks on the button, scroll to the top of the document
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="container-fluid contentDiv">
            {showButton && (
                <button className="back-to-top" type="button" onClick={handleScrollToTop}><i className="my-fa-solid fa-solid fa-arrow-up"></i></button>
            )}
        </div>
    );
};