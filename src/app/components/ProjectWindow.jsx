import React from "react";
import Image from "next/image";
import styles from "./ProjectWindow.module.css";

const ProjectWindow = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={"card"}>
        <div className={`${styles.title} title`}>Projects</div>
        <div className={styles.line}></div>
        <div className={styles.cardBody}>
          <div className={styles.skills}>
            <h2>Skills</h2>
            <ul className={styles.skillList}>
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>React</li>
              <li>Next.js</li>
              <li>SCSS</li>
              <li>Framer Motion</li>
              <li>ChakraUI</li>
              <li>MongoDB</li>
              <li>PostreSQL</li>
              <li>Python</li>
              <li>Flask</li>
            </ul>
          </div>

          <div className={styles.tools}>
            <h2>Tools</h2>
            <ul className={styles.toolList}>
              <li>Figma</li>
              <li>Canva</li>
              <li>Prismic</li>
              <li>Trello</li>
            </ul>
          </div>

          <div className={styles.work}>
            <h2>Projects</h2>
            <div className={styles.theLine}>
              <div className={styles.projectImage}>
                <Image
                  src="/images/the-line.webp"
                  alt="Screen capture of The Line Homepage"
                  width={315}
                  height={200}
                />
              </div>
              <div className={styles.projectContent}>
                <h3>The Line - Tribute to The Bear TV Series</h3>
                <p>
                  A modern, responsive restaurant website for "The Line",
                  a fine dining establishment in Chicago's River North neighborhood. 
                  Built with vanilla HTML, CSS, and JavaScript, featuring
                  elegant design, smooth animations, and comprehensive
                  responsive layouts. A tribute to the tv show "The Bear".{" "}
                  <br />
                  <br />
                  <p><a href="">Visit The Line</a></p>
                </p>
              </div>
            </div>
            <div className={styles.shellfolio}>
              <div className={styles.projectImage}>
                <Image
                  src="/images/shellfolio.webp"
                  alt="Screen capture of Shell Portfolio in use"
                  width={315}
                  height={200}
                />
              </div>
              <div className={styles.projectContent}>
                <h3>Shell Style Portfolio</h3>
                <p>
                  A portfolio website that simulates a terminal interface, built
                  with vanilla JavaScript, <br /> HTML, and CSS. Experience my
                  professional information through command-line interactions!{" "}
                  <br />
                  <a href="">Visit my Shell Style Portfolio</a>
                </p>
              </div>
            </div>
            <div className={styles.simplePortfolio}>
              <div className={styles.projectImage}>
                <Image
                  src="/images/portfolio.webp"
                  alt="Screen capture of The hero section of my personal portfolio"
                  width={315}
                  height={200}
                />
              </div>
              <div className={styles.projectContent}>
                <h3>Simple HTML/CSS Portfolio</h3>
                <p>
                  This is my personal portfolio website built with HTML,
                  designed to present my work <br /> and capabilities as a developer.
                  The portfolio serves as a digital resume and project showcase.
                  Including smooth animations. <br />
                  <a href="">Visit My Portfolio</a>
                </p>
              </div>
            </div>
            <div className={styles.jancuts}>
              <div className={styles.projectImage}>
                <Image
                  src="/images/jan-cuts.webp"
                  alt="Screen capture of Jan Cuts professional barber portfolio"
                  width={315}
                  height={200}
                />
              </div>
              <div className={styles.projectContent}>
                <h3>Jan Cuts Portfolio</h3>
                <p>
                  A portfolio website that was requested by a professional
                  barber that wanted to showcase <br /> his work and skills and the
                  services he is offering. The website is made with React.js <br /> and
                  Chakra UI, and the UI was designed with Figma. <br />
                  <a href="">Visit Jan Cuts</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectWindow;
