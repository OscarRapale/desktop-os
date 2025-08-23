import React from "react";
import styles from "./LinksWindow.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareLinkedin,
  faSquareGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";

const LinksWinodws = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={styles.linksTitle}>Links</div>
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
