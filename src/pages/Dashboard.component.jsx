import React from "react";
import ScatterPlot from "../components/charts/ScatterPlot.component";

const HomePage = (handleReset) => {
    return (
        <div>
        <ScatterPlot handleReset={handleReset}/>
        </div>
    )
};

export default HomePage;