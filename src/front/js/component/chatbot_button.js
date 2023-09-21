import React from "react";
import { Link } from "react-router-dom";
import "../../styles/chatbot_button.css";

export const Chatbot_button = () => {

    return (
        <>
            {/* Default dropup button */}
            <div className="dropup contentChat px-5">
                <button type="button" className="chatbot-btn dropdown-toggle-chat dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-chatbot fa-regular fa-comment-dots"></i>
                </button>
                <ul className="dropdown-menu p-0 dropup-charbot">
                <div className="modal-header chatbot-title">
                    <h5 id="exampleModalLabel">Need some help!!!</h5>
                </div>
                <div className="modal-body">
                    ...
                </div>
                <div className="modal-footer py-2 px-0">
                    <input className="chatbot-control" type="text" aria-label="default input example" placeholder="Reply here... " />
                </div>
                </ul>
            </div>
        </>
    );
};