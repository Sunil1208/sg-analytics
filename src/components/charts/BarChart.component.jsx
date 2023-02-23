import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { filteredflightDataState, flightDataState } from '../../services/atoms.services';
import { getOriginCount } from '../../utils/common.utils';
import * as d3 from "d3";


import "../../styles/styles.common.css"
import Legend from '../Legend.component';


const titleLabel = "Flights by origin city";
const subtitleLabel = "Total number of flights by origin city";


export const BarChart = ({handleReset}) => {
    const flightData = useRecoilValue(flightDataState);
    const filteredFlightData = useRecoilValue(filteredflightDataState);

    const data = filteredFlightData ? filteredFlightData : flightData;

    const originCount = getOriginCount(data);

    const bottomAxisLabel = "Origin City";
    const leftAxisLabel = "Number of flights";

    const width = 900;
    const height = 450;
    const margin = { top: 20, right: 20, bottom: 20, left: 100 };
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.right - margin.left;


    
    const yScale = d3
    .scaleBand()
    .domain(originCount.map((d) => d.origin))
    .range([0, innerHeight]);

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(originCount, (d) => d.count)])
    .range([0, innerWidth]);

    useEffect(() => {
      handleReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const legendData = [
      {
        label: "Total Flight Count",
        value: data.length
      }
    ];


  return (
    <div>
      <div id="viz-container">
        <div id="title">{titleLabel}</div>
        <div id="subtitle">{subtitleLabel}</div>
        <div id="left-axis-label">{leftAxisLabel}</div>
        <div id="bottom-axis-label">{bottomAxisLabel}</div>
        <Legend innerWidth={innerWidth} innerHeight={innerHeight} data={legendData}/>

        <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {xScale.ticks().map((tickValue) => (
          <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
            <line y2={innerHeight} stroke="black" />
            <text
              dy=".71em"
              y={innerHeight + 3}
              style={{ textAnchor: "middle", fill: "#030303" }}
            >
              {tickValue}
            </text>
          </g>
        ))}
        {yScale.domain().map((tickValue) => (
          <text
            key={tickValue}
            dy=".32em"
            x={-3}
            style={{ textAnchor: "end", fill: "#030303" }}
            y={yScale(tickValue) + yScale.bandwidth() / 2}
          >
            {tickValue}
          </text>
        ))}
        {originCount.map((d, i) => (
          <rect
              key={d.origin}
              x={0}
              y={yScale(d.origin)}
              width={xScale(d.count)}
              height={yScale.bandwidth()}
              style={{
                fill:"rgb(197, 197, 197)", strokeWidth:1, stroke: "rgb(0, 0, 0)"
              }}
            
            />
        ))}
      </g>
    </svg>
    </div>
        </div>
  )
};

export default BarChart;
