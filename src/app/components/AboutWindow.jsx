import React from "react";
import styles from "./AboutWindow.module.css";

const AboutWindow = () => {
  return (
    <div className={styles.cardContainer}>
      <div className="card">
        <div className={styles.aboutTitle}>About</div>
        <div className="line"></div>
        <div className={styles.cardHeader}>
          <h1 className={styles.heading}>Oscar Rapale Méndez</h1>
          <p>
            Fullstack Web Developer, Frontend Specialist, Creative Coder <br />
            From Puerto Rico
          </p>
          <img src="" alt="" />
        </div>
        <div className={styles.cardBody}>
          <div className="skills">
            <p>
              Hello World! I'm Oscar, a web developer and creative coder! <br />
              As a Fullstack Developer specialized in Front-end work my skills
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
