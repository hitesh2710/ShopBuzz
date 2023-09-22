import React from "react";
import "./Contact.css";

function Contact() {
  const recipient = "anand2710dubey@gmail.com";
  const subject = "Hello";
  const body = "I wanted to reach out to you...";
  const gmailComposeURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  return (
    <div className="contactPage">
      <div>
        <a href={gmailComposeURL} target="_blank" rel="noopener noreferrer">
          <p>ANAND2710DUBEY@GMAIL.COM</p>
        </a>
      </div>
    </div>
  );
}

export default Contact;
