import React from "react";
import styles from "./ContactWindow.module.css";

const ContactWindow = () => {
  return (
    <div className={styles.cardContainer}>
      <div className="card">
        <div className={styles.contactTitle}>Contact</div>
        <div className={styles.line}></div>
        <div className={styles.cardBody}>
          <div className={styles.cardText}>
            <p>
              You can contact me through email or drop a message on LinkedIn.{" "}
              <br />
              I'll get back to you as soon as possible!
            </p>
            <br />
            <p>
              Message me on <a href="">LinkedIn</a> <br />
              Or click the button below to send me an email.
            </p>
            <br />
            <a className={styles.emailBtn} href="mailto:oscarrapale@gmail.com">
              Send Email
            </a>
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactWindow;
