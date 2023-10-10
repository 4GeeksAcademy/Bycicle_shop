import React from "react";
import { Link } from "react-router-dom";
import "../../styles/chatbot_button.css";

export const Chatbot_button = () => {

    return (
        <>
            {/* Default dropup button */}
            <div className="dropup contentChat">
                <button id="chatbot" aria-label="chatbot" type="button" className="chatbot-btn dropdown-toggle-chat dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-chatbot fa-regular fa-comment-dots"></i>
                </button>
                <ul className="dropdown-menu p-0 dropup-charbot">
                <div className="modal-header chatbot-header">
                    <h5 className="chatbot-title" id="exampleModalLabel">Need some help!!!</h5>
                </div>
                <div className="modal-body">
                    ...
                </div>
                <div className="modal-footer py-2 px-0">
                    <input className="chatbot-control" type="text" aria-label="default input example" placeholder="Reply here... " />
                    <button type="submit" id="send" aria-label="send" className="fa-send">
                        <i className="fa-solid fa-paper-plane fa-send"></i>
                    </button> 
                </div>
                </ul>
            </div>
        </>
    );
};