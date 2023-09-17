import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/contactus.css";

export const ContactUs = () => {
  const { actions } = useContext(Context);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");

  //function to send the data form the input to the database
  const handleClick = (event) => {
      // prevent the default form submission behavior
      event.preventDefault();
      actions.signup(fullName, username, email, password, subscribe, privacy) 
  };

  //function to reset the form
  const resetForm = () => {
      setFullName("");
      setEmail("");
      setPassword("");
      setSubscribe(false);
      setPrivacy(false);
  };
  return (
          <div className="min-height-100 container-fluid">
            <div className="text-center m-2">
              <h1 className="title-contactus">Send us a message</h1>
              <h5 className="subtitle-contactus">
                We'd happy to answer your questions! Fill out the form bellow with your
                contact details and contact us.
              </h5>
              <br />
              <form className="form my-form" onSubmit={handleClick}>
                  <div>
                  <br />
                  <input className="control-contact" type="text" placeholder="Full Name" aria-label="default input example" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                  <br />
                  <br />
                  <input className="control-contact" type="text" placeholder="Email" aria-label="default input example" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  <br />
                  <br />
                  <input className="control-contact" type="text" placeholder="Phone" aria-label="default input example" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                  <br />
                  <br />
                  <input className="control-contact" type="text" placeholder="The issue/problem" aria-label="default input example" value={issue} onChange={(e) => setIssue(e.target.value)} />
                  <br />
                  <br />
                  <textarea className="textarea-contact" name="story" rows="4" placeholder="Description"  value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                  </div>
                  <div className="row me-3">
                      <div >
                          <button className="btn-contact" onClick={resetForm} >Send</button>
                      </div>
                  </div>
              </form>
              </div>
              <br/ >
              <br/ >
              <div>
                <h1 className="title-contactus text-center">Our Contacts</h1>
                <div className="our-contacts"> 
                  <p>
                    <b>Email:</b> aleksander.kleinn@gmail.com / mariana.placito@gmail.com
                  </p>
                  <p>
                    <b>Telephone:</b> *************
                  </p>
                  <p>
                    <b>warehouse address:</b>{" "}
                    jNo. 999 West Wen Yi Road, Yuhang District, Hangzhou, Zhejiang, China
                  </p>
              </div>
              </div>
            <br/ >
        </div>
  );
}
