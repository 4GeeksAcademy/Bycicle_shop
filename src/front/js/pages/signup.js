import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/signup.css";

export const Signup = () => {
    const { actions } = useContext(Context);
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); 
    const [subscribe, setSubscribe] = useState(false);
    const [privacy, setPrivacy] = useState(false);
    const navigate = useNavigate();

    //function to send the data form the input to the database
    const handleClick = (event) => {
        // prevent the default form submission behavior
        event.preventDefault();
        console.log("hewllo")
        actions.signup(fullName, username, email, password, confirmPassword, subscribe,  privacy);
        navigate('/login');
        
    };

    //function to reset the form
    const resetForm = () => {
        setFullName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword(""); 
        setSubscribe(false);
        setPrivacy(false);
    };

    return (
        <div className="container min-height-100">
            <h1 className="title mb-3">
                Registration
            </h1>
            <form className="form my-form" onSubmit={handleClick}>
                <div>
                <br />
                <input className="control control-input-signup" type="text" placeholder="Full Name" aria-label="default input example" value={fullName} onChange={(e) => setFullName(e.target.value)} required/>
                <br />
                <br />
                <input className="control control-input-signup" type="text" placeholder="Username" aria-label="default input example" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                <br />
                <br />
                <input className="control control-input-signup" type="text" placeholder="Email" aria-label="default input example" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <br />
                <br />
                <input className="control control-input-signup" type="password" placeholder="Password" aria-label="default input example" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <br />
                <br />
                <input className="control control-input-signup" type="password" placeholder="Confirm Password" aria-label="default input example" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                </div>
                <br />
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={subscribe} onChange={(e) => setSubscribe(e.target.checked)}/>
                    <label className="form-check-label my-form-check-label" >
                        Subscribe to the Newsletter
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)}/>
                    <Link className="link-collapse" to="/terms">
                        <label className="form-check-label link-privacy my-form-check-label" >
                            I have read and accept the privacy policy
                        </label>
                    </Link>    
                </div>
                <br />
                <br />
                <br />
                <div className="row me-3">
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                        <button className="btn-register" type="submit" >REGISTER</button>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 text-end cancel-btn">
                        <button className="btn-register"  onClick={resetForm} >CANCEL</button>
                    </div>
                </div>
            </form>
        </div>
    );
};
