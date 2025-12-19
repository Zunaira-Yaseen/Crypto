import React, { useEffect, useState } from "react";
import Chart from 'react-google-charts';

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([['Date', 'Price']]);

  useEffect(() => {
    if (historicalData?.prices) {
      const formattedData = [
        ['Date', 'Price'],
        ...historicalData.prices.map(([timestamp, price]) => [
          new Date(timestamp).toLocaleDateString(),
          price
        ])
      ];
      setData(formattedData);
    }
  }, [historicalData]);

  if (!historicalData?.prices?.length) {
    return <div>Loading chart...</div>;
  }

  return (
    <Chart
      chartType="LineChart"
      data={data}
      width="100%"
      height="300px"
    />
  );
};

export default LineChart;