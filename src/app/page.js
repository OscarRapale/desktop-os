"use client";

import styles from "./page.module.css";
import Wave from "react-wavify";
import HomeWindow from "./components/HomeWindow";
import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = resolvedTheme || theme;

  return (
    <div className={styles.container}>
      <Wave
        fill="var(--wave-color)"
        paused={false}
        className={styles.waveBackground}
        options={{
          height: 500,
          amplitude: 20,
          speed: 0.15,
          points: 3,
        }}
      />
      <div className={styles.osInfo}>
        <h1>AquaOS</h1>
        <div className={styles.edition}>
          <h2>
            {currentTheme === "dark"
              ? "Citrus Lime Edition"
              : "Cherry Cola Edition"}
          </h2>
          <div className={styles.toggleGroup}>
            <ThemeToggle />
          </div>
        </div>
        <p>Version 1.0.0</p>
        <p className={styles.signature}>Oscar Rapale&apos;s OS Portfolio</p>
      </div>
      <HomeWindow />
    </div>
  );
}
