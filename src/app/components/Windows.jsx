"use client";

import React, { use, useState } from "react";
import Draggable from "react-draggable";
import { useRef } from "react";
import useSound from "use-sound";
import AboutWindow from "./AboutWindow";
import ProjectWindow from "./ProjectWindow";
import ContactWindow from "./ContactWindow";

const Windows = () => {
    const [windows, setWinodows] = useState({
       about: false,
       links: false,
       projects: false,
       contact: false, 
    });

    const windowData = [
      {
        id: "about",
        title: "About",
        content: <AboutWindow />
      },
      {
        id: "project",
        title: "Project",
        content: <ProjectWindow />
      },
      {
        id: "contact",
        title: "contact",
        content: <ContactWindow />
      }
    ]


  return (
    <div>Windows</div>
  )
}

export default Windows
