function Die(props) {
  return (
    <button
      aria-pressed={props.isHeld}
      aria-label={`Die showing ${props.value},${
        props.isHeld ? "held" : "not held"
      }`}
      style={props.isHeld ? { backgroundColor: "#59e391", color: "white" } : {}}
      onClick={() => props.hold(props.id)} //na vakov nacin ()=> povikuvame funkcija koja ja povikuva nasata funkcija hold
    >
      {props.value}
    </button>
  );
}

export default Die;
