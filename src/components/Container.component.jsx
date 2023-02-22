import React, { useEffect } from 'react';
import { flightDataState, loaderState, selectedPageState } from '../services/atoms.services';
import { readString } from 'react-papaparse';

import flightDataCSV from "../data1.csv";


import HomePage from '../pages/Dashboard.component';
import { useRecoilState, useRecoilValue } from 'recoil';
import BarChart from './charts/BarChart.component';
import PieChart from './charts/PieChart.component';
// import LineChart from './charts/LIneChart.component';
import Filter from './Filter.component';
import { PAGE_LIST } from '../constants';

const renderSelectedPage = (pageKey) => {
  console.log("apage key is ", pageKey)
  switch (pageKey) {
    case PAGE_LIST.FLIGHT_DISTANCE_VS_TIME.key:
      return <HomePage />;
    case PAGE_LIST.FLIGHT_PERCENTAGE_BY_AIRLINE.key:
        return <PieChart />;
    case PAGE_LIST.TOTAL_FLIGHTS_BY_ORIGIN_CITY.key:
      return <BarChart />;
    default:
      return <HomePage />;
  }
};


const Container = () => {
  const [flightData, setFlightData] = useRecoilState(flightDataState);
  const selectedPage = useRecoilValue(selectedPageState);
  const [, setLoading] = useRecoilState(loaderState);

  useEffect(() => {
    async function parseCSV(){
      setLoading(true);
      const papaConfig = {
        header: true,
        complete: (results, file) => {
          // console.log('Parsing complete:', results, file);
          setFlightData(results.data);
          setLoading(false);
        },
        download: true,
        error: (error, file) => {
          console.log('Error while parsing:', error, file);
          setLoading(false);
        },
      };
      await readString(flightDataCSV, papaConfig)
    };
    parseCSV();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("flight data is ", flightData)

  const selectedPageView = renderSelectedPage(selectedPage);

  return (
    <div className="container relative mx-auto bg-white h-screen p-2">
      <h1 className="text-3xl text-center font-bold underline">SG Analytics</h1>
      <Filter />
      {
        flightData && (selectedPageView)
      }
    </div>
  )
}

export default Container;