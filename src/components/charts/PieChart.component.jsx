import React, { useEffect } from "react";
import Pie from "./common/PieChartSVG.component";
import { filteredflightDataState, flightDataState } from "../../services/atoms.services";
import { useRecoilValue } from "recoil";
import { getFlightCount } from "../../utils/common.utils";


const titleLabel = "Flights by airline";
const subtitleLabel = "Percentage of flights by airline";

const PieChart = ({handleReset}) => {
    const flightData = useRecoilValue(flightDataState);
    const filteredFlightData = useRecoilValue(filteredflightDataState);
    const data = filteredFlightData ? filteredFlightData : flightData;

    const totalFlightCount = data.length;

    const getflightPercentage = (data, totalCount) => {
        return data.map((item) => {
            return {airline: item.flight, percentage: ((item.count/totalCount)*100)}
        })
    };

    const flightCount = getFlightCount(data);
    const flightPercentageData = getflightPercentage(flightCount, totalFlightCount);

    useEffect(() => {
        handleReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <div>
        <div id="viz-container">
            <div id="title">{titleLabel}</div>
            <div id="subtitle">{subtitleLabel}</div>
            <Pie
                data={flightPercentageData}
                width={400}
                height={400}
                innerRadius={200}
                outerRadius={100}
        />
        </div>
    </div>
  );
}

export default PieChart;
