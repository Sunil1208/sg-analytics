import React from 'react';
import "../../styles/styles.common.css"


const titleLabel = "Flights by origin city";
const subtitleLabel = "Total number of flights by origin city";


export const BarChart = () => {

    const xValue = (d) => Number(d.Distance);
    const bottomAxisLabel = "Distance";

    const yValue = (d) => Number(d.AirTime);
    const leftAxisLabel = "Flight Time";

  return (
    <div>
      <div id="viz-container">
        <div id="title">{titleLabel}</div>
        <div id="subtitle">{subtitleLabel}</div>
        <div id="left-axis-label">{leftAxisLabel}</div>
        <div id="bottom-axis-label">{bottomAxisLabel}</div>
        
        <svg id="svg" width={width} height={height}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <g id="y-axis" className="y-axis">
              <AxisLeft
                yScale={yScale}
                innerWidth={innerWidth}
                // yAxisTickFormat={yAxisTickFormat}
                tickOffset={20}
              />
            </g>
            <g id="x-axis" className="x-axis">
              <AxisBottom
                xScale={xScale}
                innerHeight={innerHeight}
                tickOffset={8}
              />
            </g>
            <Marks
              data={flightData}
              xScale={xScale}
              xValue={xValue}
              yScale={yScale}
              yValue={yValue}
              place={place}
              doping={doping}
            //   setHoveredValue={setHoveredValue}
            //   handleMouseMove={handleMouseMove}
              circleRadius={3}
            />
          </g>
        </svg>
    </div>
        </div>
  )
};

export default BarChart;
