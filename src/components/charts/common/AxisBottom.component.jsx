// const AxisBottom = ({ xScale, innerHeight, tickOffset }) =>
//     xScale.ticks().map((tickValue) => {
//         console.log("tickvalue is ", tickValue)
//     return (
//         <g
//         key={tickValue}
//         className="tick"
//         transform={`translate(${xScale(tickValue)},0)`}
//         >
//         <line y2={innerHeight} stroke="#f1f2f3" />
//         <text
//             style={{ textAnchor: "middle" }}
//             dy=".71em"
//             y={innerHeight + tickOffset}
//         >
//             {tickValue}
//         </text>
//         </g>
// )});

const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset }) =>
  xScale.ticks().map((tickValue) => (
    <g
      key={tickValue}
      className="tick"
      transform={`translate(${xScale(tickValue)},0)`}
    >
      <line />
      <text
        style={{ textAnchor: "middle" }}
        dy=".71em"
        y={innerHeight + tickOffset}
      >
        {tickValue}
      </text>
    </g>
  ));

export default AxisBottom;