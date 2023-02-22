import { useState } from "react";
import { useRecoilValue } from "recoil";
import { flightDataState } from "../../services/atoms.services";
import { getAverageWeekDayFlightCount } from "../../utils/common.utils";
import * as d3 from "d3";

import "../../styles/styles.common.css";

const LineChart = () => {
    const flightData = useRecoilValue(flightDataState);
    const [activeIndex, setActiveIndex] = useState(null);

    const titleLabel = "Average Flight Time";
    const subtitleLabel = "Average Flight Time by day of the week";

    const margin = { top: 40, right: 60, bottom: 60, left: 50 };
    const width = 960 - margin.left - margin.right;
    const height = 480 - margin.top - margin.bottom;
    const color = "OrangeRed";

    const avgWeekdayflightCount = getAverageWeekDayFlightCount(flightData);
    console.log("avg weekday data ", avgWeekdayflightCount);

    const yMinValue = d3.min(avgWeekdayflightCount, (d) => Number(d.count));
    const yMaxValue = d3.max(avgWeekdayflightCount, (d) => Number(d.count));

                
    const getX = d3
    .scaleBand()
    .domain(d3.extent(avgWeekdayflightCount, (d) => d.weekday))
    .range([0, width]);

    const getY = d3
    .scaleLinear()
    .domain([yMinValue - 1, yMaxValue + 2])
    .range([height, 0]);

    const getXAxis = (ref) => {
    const xAxis = d3.axisBottom(getX);
    d3.select(ref).call(xAxis.tickFormat(d3.timeFormat("")));
    };

    const getYAxis = (ref) => {
    const yAxis = d3.axisLeft(getY).tickSize(-width).tickPadding(7);
    d3.select(ref).call(yAxis);
    };

    const linePath = d3
        .line()
        .x((d) => getX(d.weekday))
        .y((d) => getY(d.count))
        .curve(d3.curveMonotoneX)(avgWeekdayflightCount);

    const areaPath = d3
        .area()
        .x((d) => getX(d.weekday))
        .y0((d) => getY(d.count))
        .y1(() => getY(yMinValue - 1))
        .curve(d3.curveMonotoneX)(avgWeekdayflightCount);

        const handleMouseMove = (e) => {
            const bisect = d3.bisector((d) => d.count).left,
                x0 = getX.invert(d3.pointer(e, this)[0]),
                index = bisect(avgWeekdayflightCount, x0, 1);
            setActiveIndex(index);
        };
        
        const handleMouseLeave = () => {
            setActiveIndex(null);
        };

    return(
        <div id="viz-container">
            <div id="title">{titleLabel}</div>
            <div id="subtitle">{subtitleLabel}</div>
            <div className="p-3 mt-3 ml-auto mr-auto wrapper">
            <svg
          viewBox={`0 0 ${width + margin.left + margin.right} 
                          ${height + margin.top + margin.bottom}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
      >
          <g className="axis" ref={getYAxis} />
          <g
              className="axis xAxis"
              ref={getXAxis}
              transform={`translate(0,${height})`}
          />
          <path fill={color} d={areaPath} opacity={0.3} />
          <path strokeWidth={3} fill="none" stroke={color} d={linePath} />
          <text
              transform={"rotate(-90)"}
              x={0 - height / 2} y={0 - margin.left} dy="1em">
              {"USD"}
          </text>
          <text
              x={width / 2} y={0 - margin.top / 2} text-anchor="middle" >
              {"USD to RUB Exchange Rates, 2020"}
          </text>
          <a
              className="subtitle"
              href="https://www.moex.com/ru/index/rtsusdcur.aspx?tid=2552"
              target="_blank" rel="noreferrer">
              <text x="0" y={height + 50}>
                  {"Source: Moscow Exchange"}
              </text>
          </a>

          {avgWeekdayflightCount.map((item, index) => {
              return (
                  <g key={index}>
                      <text
                          fill="#666"
                          x={getX(item.weekday)}
                          y={getY(item.count) - 20}
                          textAnchor="middle"
                      >
                          {index === activeIndex ? item.price : ""}
                      </text>
                      <circle
                          cx={getX(item.weekday)}
                          cy={getY(item.count)}
                          r={index === activeIndex ? 6 : 4}
                          fill={color}
                          strokeWidth={index === activeIndex ? 2 : 0}
                          stroke="#fff"
                          style={{ transition: "ease-out .1s" }}
                      />
                  </g>
              );
          })}
      </svg>
            </div>

            
            {/**
        
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
            </svg>*/}
        </div>
    )
};

export default LineChart;