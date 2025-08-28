const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>
        Made by{" "}
        <a
          target="_blank"
          href="https://www.linkedin.com/in/ivan-lazarov-936a32377/"
          style={styles.link}
        >
          Ivan Lazarov
        </a>{" "}
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    marginTop: "2rem",
    padding: "1rem",
    textAlign: "center",
    backgroundColor: "#0f1c2e",
    borderTop: "1px solid #1f2937",
    color: "#9ca3af",
    fontSize: "0.9rem",
  },
  link: {
    color: "#3b82f6",
    textDecoration: "none",
    fontWeight: "500",
  },
};

export default Footer;
