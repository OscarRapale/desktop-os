import React from "react";
import styles from "./ContactWindow.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const ContactWindow = ({ closeWindow }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={`${styles.card} card`}>
        <div className={`${styles.title} title`}>
          Contact
          <button
            className={styles.closeBtn}
            onClick={() => closeWindow("contact")}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        </div>
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
              Message me on{" "}
              <a
                className={styles.link}
                href="https://www.linkedin.com/in/oscar-rapale/"
                target="_blank"
              >
                LinkedIn
              </a>{" "}
              <br />
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
