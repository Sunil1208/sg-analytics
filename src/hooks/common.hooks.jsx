import { useState,useEffect } from "react";
import * as d3 from "d3";

export const useData = () => {
    const [data, setData] = useState(null);
    const [loaded, setLoaded] = useState(false);
  
    const url =
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
  
    useEffect(() => {
      d3.json(url).then((json) => {
        setData(json);
      });
    }, []);
  
    useEffect(() => {
      if (data) {
        data.forEach((d) => {
          let minutes = d.Time.substring(0, 2);
          let seconds = d.Time.substring(3);
          d.Time = new Date(1976, 6, 28, 0, minutes, seconds);
        });
        setLoaded(true);
      }
    }, [data]);
  
    return data;
  };