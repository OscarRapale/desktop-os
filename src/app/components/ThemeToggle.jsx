"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faDesktop } from "@fortawesome/free-solid-svg-icons";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getIcon = () => {
    switch (theme) {
        case "light":
            return faSun
        case "dark":
            return faMoon
        default:
            return faDesktop
    }
  };
  
  const getTitle = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark mode'
      case 'dark':
        return 'Switch to system mode'
      default:
        return 'Switch to light mode'
    }
  }

  return (
    <button
      onClick={cycleTheme}
      title={getTitle()}
      style={{
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '1.5rem',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '50%',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.target.style.background = 'rgba(255, 255, 255, 0.1)'
        e.target.style.transform = 'scale(1.1)'
      }}
      onMouseLeave={(e) => {
        e.target.style.background = 'none'
        e.target.style.transform = 'scale(1)'
      }}
    >
      <FontAwesomeIcon icon={getIcon()} />
    </button>
  )
};

export default ThemeToggle;
