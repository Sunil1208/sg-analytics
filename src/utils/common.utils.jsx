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