import React from "react";
import styles from "./LinksWindow.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareLinkedin,
  faSquareGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faAddressCard, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const LinksWinodws = ({ closeWindow }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
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
              <a className={styles.links} href="">
                <FontAwesomeIcon icon={faSquareLinkedin} />
              </a>
            </li>
            <li>
              <a className={styles.links} href="">
                <FontAwesomeIcon icon={faSquareGithub} />
              </a>
            </li>
            <li>
              <a className={styles.links} href="">
                <FontAwesomeIcon icon={faAddressCard} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LinksWinodws;
