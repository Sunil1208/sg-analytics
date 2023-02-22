const Legend = ({ innerWidth, innerHeight }) => (
    <div
      id="legend"
      style={{ left: `${innerWidth * 0.82}px`, top: `${innerHeight * 0.32}px` }}
    >
      <div id="doping-label">
        <div style={{ paddingRight: "5px" }}>Riders with doping allegations</div>
        <div id="doping-dot"></div>
      </div>
      <div id="clean-label">
        <div style={{ paddingRight: "5px" }}>No doping allegations</div>
        <div id="clean-dot"></div>
      </div>
    </div>
  );

export default Legend;