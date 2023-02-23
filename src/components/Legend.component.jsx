const Legend = ({ innerWidth, innerHeight, data }) => {
    return (data) ? (<div
      id="legend"
      style={{ left: `${innerWidth * 0.95}px`, top: `${innerHeight * 0.22}px` }}
    >
      {
        data && data.map((item) => {
          return(
            <div id="clean-label">
              <div style={{ paddingRight: "5px" }}>{item.label}:</div>
              <div>{item.value}</div>
            </div>
          )
        })
      }
    </div>) : null;
    };

export default Legend;