import React from "react";

const ContactWindow = () => {
  return (
    <div className="card">
      <div className="contactTItle">Contact</div>
      <div className="cardBody">
        <div className="contactText">
          <p>
            You can contact me through email or drop a message on LinkedIn. I'll
            get back to you as soon as possible!
          </p>
          <p>
            Message me on <a href="">LinkedIn</a> <br />
            Or click the button below to send me an email.
          </p>
          <a href="mailto:oscarrapale@gmail.com">Send Email</a>
        </div>
      </div>
    </div>
  );
};

export default ContactWindow;
