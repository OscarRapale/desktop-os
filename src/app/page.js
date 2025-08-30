import styles from "./page.module.css";
import Wave from "react-wavify";
import HomeWindow from "./components/HomeWindow";

export default function Home() {
  return (
    <div className={styles.container}>
      <Wave
        fill="#03624c"
        paused={false}
        className={styles.waveBackground}
        options={{
          height: 500,
          amplitude: 20,
          speed: 0.15,
          points: 3,
        }}
      />
      <HomeWindow />
    </div>
  );
}
