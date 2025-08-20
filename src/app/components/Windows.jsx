"use client";

import React, { use, useState } from "react";
import Draggable from "react-draggable";
import { useRef } from "react";
import { useSound } from "react-sounds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faGear,
  faEnvelope,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import AboutWindow from "./AboutWindow";
import ProjectWindow from "./ProjectWindow";
import ContactWindow from "./ContactWindow";

const Windows = () => {
  const [windows, setWindows] = useState({
    about: false,
    links: false,
    projects: false,
    contact: false,
  });

  const nodeRef = useRef(null);

  const windowData = [
    {
      id: "about",
      icon: <FontAwesomeIcon icon={faCircleInfo} />,
      content: <AboutWindow />,
    },
    {
      id: "project",
      icon: <FontAwesomeIcon icon={faGear} />,
      content: <ProjectWindow />,
    },
    {
      id: "contact",
      icon: <FontAwesomeIcon icon={faEnvelope} />,
      content: <ContactWindow />,
    },
  ];

  const toggleWindow = (id) => {
    setWindows((prevWindows) => ({
      ...prevWindows,
      [id]: !prevWindows[id],
    }));
  };

  return (
    <div className="container">
      {windowData.map(
        (window) =>
          windows[window.id] && (
            <Draggable key={window.id} nodeRef={nodeRef}>
              <div className="windowContainer" ref={nodeRef}>
                <button onClick={() => toggleWindow(window.id)}>
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
                {window.content}
              </div>
            </Draggable>
          )
      )}

      {windowData.map((window) => (
        <button key={window.id} onClick={() => toggleWindow(window.id)}>
          {window.icon}
        </button>
      ))}
    </div>
  );
};

export default Windows;
