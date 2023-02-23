export const getOriginCount = (data) => {
    const originCountObj = data.reduce(function(obj, v) {
        // increment or set the property
        // `(obj[v.status] || 0)` returns the property value if defined
        // or 0 ( since `undefined` is a falsy value
        obj[v.Origin] = (obj[v.Origin] || 0) + 1;
        // return the updated object
        return obj;
        // set the initial value as an object
      }, {});

      return Object.entries(originCountObj).map((item) => {
        return {"origin": item[0], "count": item[1]};
    });
};

export const getFlightCount = (data) => {
    const flightCountObj = data.reduce(function(obj, v) {
        obj[v.FlightNum] = (obj[v.FlightNum] || 0) + 1;
        return obj;
      }, {});

      return Object.entries(flightCountObj).map((item) => {
        return {"flight": item[0], "count": item[1]};
    });
};

const weekDayMapping = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const getAverageWeekDayFlightCount = (data) => {
  const flightCountObj = data.reduce(function(obj, v) {
    obj[v.DayOfWeek] = (obj[v.DayOfWeek] || 0) + 1;
    return obj;
    // obj[weekDayMapping[v.DayOfWeek]] = 
  }, {});

  return Object.entries(flightCountObj).map((item) => {
    return {weekday: weekDayMapping[Number(item[0] - 1)], weekdayNum: item[0], "count": item[1]};
  });
};

export const getDataForFilters = (data) => {
  const distinctOriginCities = [...new Set(data.map((obj) => {return obj["Origin"]}))];
  const distinctCarriers = [...new Set(data.map((obj) => {return obj["UniqueCarrier"]}))];
  const distinctYears = [...new Set(data.map((obj) => {return obj["Year"]}))];
  return {
    origins: distinctOriginCities,
    carriers: distinctCarriers,
    years: distinctYears
  }
};

export const getFilteredData = (data, filters) => {
  console.log('filters applied are ', filters)
  const { carriers, origins, startYear, endYear } = filters;
  let result = undefined;

  if(carriers && carriers.length){
    if(!result){
      result = data;
    }
    result = result.filter(function(v, i) {
      return (
        (carriers.includes(v.UniqueCarrier))
        );
    })
  }

  if(origins && origins.length){
    if(!result){
      result = data;
    }

    result = result.filter(function(v, i) {
      return (
        (origins.includes(v.Origin)));
    })
  }

  if(startYear && endYear){
    if(!result){
      result = data;
    }
    result = result.filter(function(v, i) {
      return (
          Number(v.Year) >= Number(startYear)
          && Number(v.Year) >= Number(endYear)
        );
    })
  } else if(startYear && !endYear){
    if(!result){
      result = data;
    }
    result = result.filter(function(v, i) {
      return (Number(v.Year) === Number(startYear)
        );
    })
  }

  console.log("final results are ", result)
  return result;

}