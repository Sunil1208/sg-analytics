import React, { useEffect } from 'react';
import { flightDataState, loaderState } from '../services/atoms.services';
import { readString } from 'react-papaparse';

import flightDataCSV from "../data1.csv";


import HomePage from '../pages/Dashboard.component';
import { useRecoilState } from 'recoil';
import BarChart from './charts/BarChart.component';
import PieChart from './charts/PieChart.component';


const Container = () => {
  const [flightData, setFlightData] = useRecoilState(flightDataState);
  const [loading, setLoading] = useRecoilState(loaderState);

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

  return (
    <div className="container relative mx-auto bg-white h-screen p-2">
      <h1 className="text-3xl text-center font-bold underline">SG Analytics</h1>
      {
        flightData && (<HomePage />)
      }
      <br />

      {
        flightData && (<BarChart />)
      }
      <br />
      {
        flightData && (<PieChart />)
      }
    </div>
  )
}

export default Container;