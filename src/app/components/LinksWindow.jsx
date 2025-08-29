import React from "react";
import styles from "./LinksWindow.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareLinkedin,
  faSquareGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  faAddressCard,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const LinksWinodws = ({ closeWindow }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={`${styles.card} card`}>
        <div className={`${styles.title} title`}>
          Links
          <button
            className={styles.closeBtn}
            onClick={() => closeWindow("links")}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        </div>
        <div className={styles.line}></div>
        <div className={styles.cardBody}>
          <ul className={styles.linkList}>
            <li>
              <a
                className={styles.links}
                href="https://www.linkedin.com/in/oscar-rapale/"
                target="_blank"
              >
                <FontAwesomeIcon icon={faSquareLinkedin} />
                <div className={styles.linkTitles}>LinkedIn</div>
              </a>
            </li>
            <li>
              <a
                className={styles.links}
                href="https://github.com/OscarRapale"
                target="_blank"
              >
                <FontAwesomeIcon icon={faSquareGithub} />
                <div className={styles.linkTitles}>GitHub</div>
              </a>
            </li>
            <li>
              <a
                className={styles.links}
                href="https://oscar-rapale-web-developer.onrender.com"
                target="_blank"
              >
                <FontAwesomeIcon icon={faAddressCard} />
                <div className={styles.linkTitles}>Website</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LinksWinodws;
