"use client";

import React, { use, useState } from "react";
import Draggable from "react-draggable";
import { useRef } from "react";
import useSound from "use-sound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faGear,
  faEnvelope,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import AboutWindow from "./AboutWindow";
import ProjectWindow from "./ProjectWindow";
import ContactWindow from "./ContactWindow";
import LinksWindow from "./LinksWindow";
import styles from "./HomeWindow.module.css";

const HomeWindow = () => {
  const [windows, setWindows] = useState({
    about: false,
    links: false,
    projects: false,
    contact: false,
  });

  const [playOpen] = useSound("/sounds/open-window.mp3");
  const [playClose] = useSound("/sounds/close-window.mp3");
  const [playHover] = useSound("/sounds/button-hover.mp3");

  const toggleWindow = (id) => {
    if (!windows[id]) {
      playOpen();
    } else {
      playClose();
    }
    setWindows((prevWindows) => ({
      ...prevWindows,
      [id]: !prevWindows[id],
    }));
  };

  const buttonHoverEffect = () => {
    playHover();
  };

  const nodeRef = useRef(null);

  const windowData = [
    {
      id: "about",
      icon: <FontAwesomeIcon icon={faCircleInfo} />,
      content: <AboutWindow closeWindow={toggleWindow} />,
    },
    {
      id: "links",
      icon: <FontAwesomeIcon icon={faLink} />,
      content: <LinksWindow closeWindow={toggleWindow} />,
    },
    {
      id: "projects",
      icon: <FontAwesomeIcon icon={faGear} />,
      content: <ProjectWindow closeWindow={toggleWindow} />,
    },
    {
      id: "contact",
      icon: <FontAwesomeIcon icon={faEnvelope} />,
      content: <ContactWindow closeWindow={toggleWindow} />,
    },
  ];

  return (
    <div className={styles.homeContainer}>
      <div className={`${styles.card} card`}>
        <div className={styles.title}>Home</div>
        <div className={styles.line}></div>
        <div className={styles.intro}>
          <h1>
            Hello World, <span>I'm Oscar!</span>
          </h1>
          <p>Fullstack Web Developer, Frontend Specialist, Creative Coder</p>
        </div>
        {windowData.map(
          (window) =>
            windows[window.id] && (
              <Draggable key={window.id} handle=".title" nodeRef={nodeRef}>
                <div className={styles.windowsContainer} ref={nodeRef}>
                  {window.content}
                </div>
              </Draggable>
            )
        )}

        <div className={styles.iconsContainer}>
          {windowData.map((window) => (
            <button
              className={styles.icons}
              key={window.id}
              onClick={() => toggleWindow(window.id)}
              onMouseEnter={buttonHoverEffect}
            >
              {window.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeWindow;
