import React from "react";
import Image from "next/image";
import styles from "./AboutWindow.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const AboutWindow = ({ closeWindow }) => {
  return (
    <div className={styles.cardContainer}>
      <div className="card">
        <div className={`${styles.title} title`}>
          About
          <button
            className={styles.closeBtn}
            onClick={() => closeWindow("about")}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        </div>
        <div className={styles.line}></div>
        <div className={styles.cardHeader}>
          <div className={styles.image}>
            <Image
              src="/images/profile-pic.webp"
              alt="Drawing of a Gundam with glasses"
              width={250}
              height={250}
            />
          </div>
          <div className={styles.headerContent}>
            <h1>Oscar Rapale Méndez</h1>
            <p>
              Fullstack Web Developer, Frontend Specialist, Creative Coder, from
              Puerto Rico
            </p>
          </div>
        </div>
        <div className={styles.cardBody}>
          <div className="skills">
            <p>
              Hello World! I'm Oscar, a web developer and creative coder! <br />
              As a Fullstack Developer specialized in Frontend work my skills
              can cover:
            </p>
            <ul className={styles.skillList}>
              <li>Web Development/Design</li>
              <li>App Development</li>
              <li>Frontend Dynamic Designs</li>
              <li>Backend Development</li>
              <li>Gamification of Apps</li>
            </ul>
          </div>
          <div className={styles.education}>
            <h2 className={styles.subheading}>Education</h2>
            <p>
              Holberton Coding School Puerto Rico <br />
              Certificate: Foundations of Computer Science and Software
              Engineering <br />
              2024
            </p>
          </div>
          <div className={styles.interest}>
            <h2 className={styles.subheading}>Other Interests</h2>
            <ul className={styles.interestList}>
              <li>Studying new topics</li>
              <li>Game Development</li>
              <li>UI/UX Enthusiast</li>
              <li>Learning to do Concept Art</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutWindow;
