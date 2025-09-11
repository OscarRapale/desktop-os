"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import Draggable from "react-draggable";
import { useRef, useEffect } from "react";
import useSound from "use-sound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faGear,
  faEnvelope,
  faLink,
  faVolumeHigh,
  faVolumeXmark,
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

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Individual refs for each window
  const windowRefs = useRef({
    about: React.createRef(),
    links: React.createRef(),
    projects: React.createRef(),
    contact: React.createRef(),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sound management
  const [audioEnabled, setAudioEnabled] = useState(true);

  const [playOpen] = useSound("/sounds/open-window.mp3", {
    volume: audioEnabled ? 0.5 : 0,
  });
  const [playClose] = useSound("/sounds/close-window.mp3", {
    volume: audioEnabled ? 0.5 : 0,
  });
  const [playHover] = useSound("/sounds/button-hover.mp3", {
    volume: audioEnabled ? 0.3 : 0,
  });

  // Toggling audio on and off
  const toggleAudio = () => {
    if (!audioEnabled) {
      playHover({ volume: 0 });
    }
    setAudioEnabled(!audioEnabled);
  };

  // Toggling windows open and close
  const toggleWindow = (id) => {
    if (audioEnabled) {
      if (!windows[id]) {
        playOpen();
      } else {
        playClose();
      }
    }
    setWindows((prevWindows) => ({
      ...prevWindows,
      [id]: !prevWindows[id],
    }));
  };

  // Hover sound effect for buttons and icons
  const buttonHoverEffect = () => {
    if (audioEnabled) {
      playHover();
    }
  };

  const windowData = [
    {
      id: "about",
      title: "About",
      icon: <FontAwesomeIcon icon={faCircleInfo} />,
      content: <AboutWindow closeWindow={toggleWindow} />,
    },
    {
      id: "links",
      title: "Links",
      icon: <FontAwesomeIcon icon={faLink} />,
      content: <LinksWindow closeWindow={toggleWindow} />,
    },
    {
      id: "projects",
      title: "Projects",
      icon: <FontAwesomeIcon icon={faGear} />,
      content: <ProjectWindow closeWindow={toggleWindow} />,
    },
    {
      id: "contact",
      title: "Contact",
      icon: <FontAwesomeIcon icon={faEnvelope} />,
      content: <ContactWindow closeWindow={toggleWindow} />,
    },
  ];

  // Check for mobile width to disable draggable element
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1025);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      <div className={styles.homeContainer}>
        <div className={`${styles.card} card`}>
          <div className={`${styles.title} title`}>
            Home
            <button
              className={styles.audioToggle}
              onClick={toggleAudio}
              title={audioEnabled ? "Disable Audio" : "Enable Audio"}
            >
              <FontAwesomeIcon
                icon={audioEnabled ? faVolumeHigh : faVolumeXmark}
              />
            </button>
          </div>
          <div className={styles.line}></div>
          <div className={styles.intro}>
            <h1>
              Hello World, <span>I'm Oscar!</span>
            </h1>
            <p>Fullstack Web Developer, Frontend Specialist, Creative Coder</p>
          </div>

          <div className={styles.iconsContainer}>
            {windowData.map((window) => (
              <button
                className={styles.icons}
                key={window.id}
                onClick={() => toggleWindow(window.id)}
                onMouseEnter={buttonHoverEffect}
              >
                {window.icon}
                <div className={styles.iconTitle}>{window.title}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {mounted &&
        windowData.map(
          (window) =>
            windows[window.id] &&
            createPortal(
              isMobile ? (
                // No dragging on mobile
                <div
                  key={window.id}
                  className={styles.windowsContainer}
                  ref={windowRefs.current[window.id]}
                >
                  {window.content}
                </div>
              ) : (
                // Draggable on desktop with individual refs
                <Draggable
                  key={window.id}
                  handle=".title"
                  nodeRef={windowRefs.current[window.id]}
                >
                  <div
                    className={styles.windowsContainer}
                    ref={windowRefs.current[window.id]}
                  >
                    {window.content}
                  </div>
                </Draggable>
              ),
              document.body
            )
        )}
    </>
  );
};

export default HomeWindow;
