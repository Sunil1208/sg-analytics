export const getOriginCount = (data) => {
    const originCountObj = data.reduce(function(obj, v) {
        // increment or set the property
        // `(obj[v.status] || 0)` returns the property value if defined
        // or 0 ( since `undefined` is a falsy value
        obj[v.Origin] = (obj[v.Origin] || 0) + 1;
        obj["Origin"] = obj[v.Origin]
        obj["Count"] = (obj[v.Origin] || 0) + 1;
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
    console.log("item is ", item);
    return {weekday: weekDayMapping[Number(item[0] - 1)], weekdayNum: item[0], "count": item[1]};
  });
};