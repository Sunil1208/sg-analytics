import "../styles/styles.common.css";

const Tooltip = ({ hoveredValue, mousePosition, yAxisTickFormat }) => {
    if (!hoveredValue) {
      return <div id="tooltip-container" style={{ visibility: "hidden" }}></div>;
    } else {
      const xPosition = mousePosition.x;
      const yPosition = mousePosition.y;
      return (
        <div
          id="tooltip-container"
          style={{ left: `${xPosition + 25}px`, top: `${yPosition - 25}px` }}
        >
          <div>
            <div id="tooltip-name">
              {hoveredValue.Name} ({hoveredValue.Nationality})
            </div>
            <hr />
            <div id="tooltip" data-year={hoveredValue.Year}>
              <div>Year: {hoveredValue.Year}</div>
              <div>Place: {hoveredValue.Place}</div>
              <div>Time: {yAxisTickFormat(hoveredValue.Time)} </div>
            </div>
            <div id="tooltip-doping">
              {!hoveredValue.Doping
                ? "No doping allegations"
                : hoveredValue.Doping}
            </div>
            <div></div>
          </div>
        </div>
      );
    }
  };

  export default Tooltip;