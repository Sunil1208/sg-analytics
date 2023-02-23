import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { filteredflightDataState, flightDataState } from '../../services/atoms.services';
import { useRecoilValue } from 'recoil';
import { getFlightCount } from '../../utils/common.utils';

const titleLabel = "Flights by airline";
const subtitleLabel = "Percentage of flights by airline";

function PieChartData(props) {

  const flightData = useRecoilValue(flightDataState);
  const filteredFlightData = useRecoilValue(filteredflightDataState);
  const data = filteredFlightData ? filteredFlightData : flightData;

  const getflightPercentage = (data, totalCount) => {
    return data.map((item) => {
      console.log("item is ", item)
      return {airline: item.flight, percentage: parseFloat(((item.count/totalCount)*100).toFixed(2))}
    })
};

  const totalFlightCount = data.length;
  const flightCount = getFlightCount(data);
  const flightPercentageData = getflightPercentage(flightCount, totalFlightCount);

  console.log("flilght percetage data is ", flightPercentageData);


  const outerRadius = 210;
  const innerRadius = 0;

  const margin = {
    top: 50, right: 50, bottom: 50, left: 50,
  };

  const width = 2 * outerRadius + margin.left + margin.right;
  const height = 2 * outerRadius + margin.top + margin.bottom;

  const colorScale = d3     
    .scaleSequential()      
    .interpolator(d3.interpolateCool)      
    .domain([0, flightPercentageData.length]);

  useEffect(() => {
    drawChart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function drawChart() {
    // Remove the old svg
    d3.select('#pie-container')
      .select('svg')
      .remove();

    // Create new svg
    const svg = d3
      .select('#pie-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pieGenerator = d3
      .pie()
      .padAngle(0)
      .value((d) => d.percentage);

    const arc = svg
      .selectAll()
      .data(pieGenerator(flightPercentageData))
      .enter();

    // Append arcs
    arc
      .append('path')
      .attr('d', arcGenerator)
      .style('fill', (_, i) => colorScale(i))
      .style('stroke', 'blue')
      .style('stroke-width', 0);

    // Append text labels
    arc
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text((d) => `${d.data.airline} (${d.data.percentage}%)`)
      .style('fill', (_, i) => colorScale(flightPercentageData.length + i))
      .style("font-size", "0.8rem")
      .style("color", "black")
      .attr('transform', (d) => {
        const [x, y] = arcGenerator.centroid(d);
        return `translate(${x}, ${y})`;
      });
  }    

  return (
      <div>
        <div id="viz-container">
              <div id="title">{titleLabel}</div>
              <div id="subtitle">{subtitleLabel}</div>
              <div className="flex justify-center">
                <div id="pie-container" />
              </div>
        </div>
      </div>
   );
}

export default PieChartData;