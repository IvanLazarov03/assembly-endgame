import { Link, useLocation } from "react-router-dom";

const GameSwitch = () => {
  const location = useLocation();
  const isAssembly = location.pathname === "/"; // adjust route name if different

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>Want to play something else?</h2>
      {isAssembly ? (
        <Link
          to="/tenzies"
          style={{ ...styles.button, backgroundColor: "#3b82f6" }}
        >
          🎲 Play Tenzies
        </Link>
      ) : (
        <Link to="/" style={{ ...styles.button, backgroundColor: "#10b981" }}>
          ⚙️ Play Assembly-Endgame
        </Link>
      )}
    </section>
  );
};

const styles = {
  section: {
    textAlign: "center",
    marginTop: "2rem",
  },
  title: {
    color: "#ffffff",
    marginBottom: "1rem",
    fontSize: "1.2rem",
  },
  button: {
    display: "inline-block",
    padding: "0.6rem 1.2rem",
    borderRadius: "8px",
    fontWeight: "600",
    color: "#fff",
    textDecoration: "none",
    transition: "0.2s",
  },
};

export default GameSwitch;
