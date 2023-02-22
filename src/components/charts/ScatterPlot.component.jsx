import { useCallback, useState, useEffect } from "react";
import * as d3 from "d3";
import { useRecoilValue } from "recoil";
import { flightDataState } from "../../services/atoms.services";
import Tooltip from "../Tooltip.component";
import Legend from "../Legend.component";

import "../../styles/styles.common.css";
import { useData } from "../../hooks/common.hooks";

// AirtTime

// Distance

const titleLabel = "Flight Distance vs Flight Time";
const subtitleLabel = "Relationship between flight time and flight distance";



const ScatterPlot = () => {
    // const myData = useData();
    const flightData = useRecoilValue(flightDataState);
    // console.log("flight Data set is ", flightDataSet)

    // useEffect(() => {
    //     console.log("myData is ", myData);
    // }, []);

    // const getflightData = () => {
    //     return flightDataSet.map((data) => [data.AirTime, data.Distance])
    // };

    // const flightData = getflightData();

    // console.log("flightData is ", flightData)

    const width = 900;
    const height = 450;
    const margin = { top: 50, right: 20, bottom: 30, left: 110 };
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.right - margin.left;

const xValue = (d) => Number(d.Distance);
  const bottomAxisLabel = "Distance";

  const yValue = (d) => Number(d.AirTime);
  const leftAxisLabel = "Flight Time";

//   const yAxisTickFormat = d3.timeFormat("%M:%S");

const xScale = d3
    .scaleLinear()
    .domain(d3.extent(flightData, xValue))
    .range([0, innerWidth])
    .nice()

    
    const yScale = d3
    .scaleLinear()
    .domain(d3.extent(flightData, yValue))
    .range([innerHeight, 0])
    .nice();
    
    const place = (d) => d.Place;
  const doping = (d) => d.Doping;


    // const [hoveredValue, setHoveredValue] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (event) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
    },
    [setMousePosition]
  );

    return(
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

  const AxisBottom = ({ xScale, innerHeight, tickOffset }) =>
    xScale.ticks().map((tickValue) => (
        <g
        key={tickValue}
        className="tick"
        transform={`translate(${xScale(tickValue)},0)`}
        >
        <line y2={innerHeight} stroke="#f1f2f3" />
        <text
            style={{ textAnchor: "middle" }}
            dy=".71em"
            y={innerHeight + tickOffset}
        >
            {tickValue}
        </text>
        </g>
  ));

  const Marks = ({
    data,
    xScale,
    xValue,
    yScale,
    yValue,
    place,
    doping,
    setHoveredValue,
    handleMouseMove,
    circleRadius
  }) =>
    data.map((d, i) => {
        // console.log("d is ", d)
        // console.log("xvalue is ", xValue(d), xScale(xValue(d)))
        // console.log("yvalue is ", yValue(d))
      return (<>
        <circle
          key={place(d)}
          id={"place" + place(d)}
          data-xvalue={xValue(d)}
          data-yvalue={yValue(d)}
          className="dot"
          cx={xScale(xValue(d))}
          cy={yScale(yValue(d))}
          r={circleRadius}
        //   fill={doping(d) ? "#E25A42" : "#6BBBA1"}
          fill={"#E25A42"}
        //   onMouseEnter={() => setHoveredValue(d)}
        //   onMouseLeave={() => setHoveredValue(null)}
        //   onMouseMove={handleMouseMove}
        />
      </>)
      });

export default ScatterPlot;