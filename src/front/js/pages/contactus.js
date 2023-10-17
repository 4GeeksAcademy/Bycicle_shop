import React, { useState } from "react";
import axios from "axios"; 
import "../../styles/contactus.css";

export const ContactUs = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult ] = useState("");

  //function to reset the form
  const resetForm = () => {
      setFullName("");
      setEmail("");
      setPhone("");
      setIssue("");
      setDescription("");
  };

  const handleSendEmail = async (event) => {
    // prevent the default form submission behavior
    event.preventDefault();
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: fullName,
        email: email,
        phone: phone,
        issue: issue,
        description: description, 
      }),
    };
    
    console.log(opts)
    axios.post(process.env.BACKEND_URL + '/contactus', opts)
      .then((response) => {
        console.log('Support email sent successfully:', response);
        setResult('Support email sent successfully');
        // Handle success
      })
      .catch((error) => {
        console.error('Error sending support email:', error);
        setResult('Error sending support email');
      });
    resetForm();
  }

  return (
          <div className="min-height-100 container-fluid">
            <div className="text-center m-2">
              <h1 className="title-contactus">Send us a message</h1>
              <form className="form my-form" >
                  <h5 className="subtitle-contactus ">
                    We be happy to answer your questions! Fill out the form bellow with your
                    contact details and contact us.
                  </h5>
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
                  <textarea className="textarea-contact" name="story" rows="7" placeholder="Description"  value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                  </div>
                  
                  <div className="row m-3">
                  <p className="text-danger">{result}</p>
                      <div >
                        <button className="btn-contact mb-3" id="sendEmail" aria-label="sendEmail" onClick={handleSendEmail}>Send</button>
                      </div>
                  </div>
              </form>
              </div>
              <div>
                <h1 className="title-contactus text-center">Our Contacts</h1>
                <div className="our-contacts"> 
                  <p>
                    <b>Email:</b> aleksandr.klein@gmail.com / mariana.placito@gmail.com
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
