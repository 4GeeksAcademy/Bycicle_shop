import React from "react";
import "../../styles/ai_resp.css";

export const Ai_resp = () => {

    return (
        <div className="container-fluid main-ai_resp min-height-100 row">
            <div className="conteiner-ai_resp col-6">
                <p>
                    According to the profile you provide when filling the previous form, we came up with some suggestions for you.
                    To help you understand the selection, here is a legend
                </p>
            </div>
            <div className="col-6 flex-end">
                <div className="conteiner-ai_resp2"></div>
                <div className="conteiner-ai_resp2"></div>
                <div className="conteiner-ai_resp2"></div>
            </div>
        </div>
  );
};
