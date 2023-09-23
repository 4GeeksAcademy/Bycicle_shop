import React from "react";
import { Link } from "react-router-dom";
import robot from "../../img/robot.png";
import baloon from "../../img/ballon.png";
import "../../styles/ai.css";

export const Ai = () => {

    return (
        <div className="container-fluid min-height-100">
            <div>
            <div>
                <img src={robot} className="img-generate" alt="logo" />
                <img src={baloon} className="img-generate-ballon" alt="logo" />
                <span className="paragraf-generate" >I'm going to help you...
                </span>
            </div>
            <form className="form my-form-generate" >
                <div>
                <br />
                <label className="label-generate">
                    What's your age?
                </label>
                <input className="generate-control" type="text" aria-label="default input example"  />
                <br />
                <br />
                <label className="label-generate">
                    How far and how often you'll ride?
                </label>
                    <input className="generate-control" type="text" aria-label="default input example" />
                <br />
                <br />
                <label className="label-generate">
                    What kind of sport do you practice?
                </label >
                <input className="generate-control" type="text" aria-label="default input example" />
                <br />
                <br />
                <label className="label-generate">
                    Do you have any health issues?
                </label>
                    <input className="generate-control" type="text" aria-label="default input example" />
                <br />
                <br />
                <label className="label-generate">
                    Where do you leve?
                </label>
                    <input className="generate-control" type="text" aria-label="default input example" />
                <br />
                <br />
                <label className="label-generate">
                    What amount of money are you willing to spend?
                </label>
                    <input className="generate-control" type="text" aria-label="default input example" />
                </div>
                <br />
                    <div className="text-center">
                        <Link to="/ai_resp">
                            <button className="btn-generate">Generate</button>
                        </Link>
                    </div>
            </form>
            </div>
        </div>
  );
};
