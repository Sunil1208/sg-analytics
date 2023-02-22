const AxisLeft = ({ yScale, innerWidth, yAxisTickFormat, tickOffset }) =>
    yScale.ticks(10).map((tickValue) => {
        return (
        <g
        key={tickValue}
        className="tick"
        transform={`translate(0,${yScale(tickValue)})`}
        >
        <line x2={innerWidth} stroke="#f1f2f3" />
        <text style={{ textAnchor: "end" }} x={-tickOffset} dy=".32em">
            {tickValue}
        </text>
        </g>
  )});

export default AxisLeft;