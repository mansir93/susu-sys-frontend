import React from "react";
import Chart from "react-apexcharts";

const BarChart = ({ counts }) => {
  const state = {
    options: {
      chart: {
        type: "bar",
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "totalCustomers",
          "totalTransactions",
          "totalAccountBalance",
          "averageAccountBalance",
          "totalDeposits",
          "totalWithdrawals",
        ],
      },
      plotOptions: {
        bar: {
          // horizontal: true,
          colors: {
            ranges: [
              {
                from: 0,
                to: 50,
                color: "#2196f3",
              },
              {
                from: 51,
                to: 100,
                color: "#2196f3",
              },
              {
                from: 101,
                to: 150,
                color: "#2196f3",
              },
              {
                from: 151,
                to: 200,
                color: "#2196f3",
              },
            ],
          },
        },
      },
    },
    series: [
      {
        name: "total counts",

        data: [
          counts?.totalCustomers || 0,
          counts?.totalTransactions || 0,
          counts?.totalAccountBalance || 0,
          counts?.averageAccountBalance || 0,
          counts?.totalDeposits || 0,
          counts?.totalWithdrawals || 0,
        ],
      },
    ],
  };

  return (
    <div>
      {counts && (
        <Chart
          type="bar"
          options={state.options}
          series={state.series}
          height={"400px"}
        />
      )}
    </div>
  );
};

export default BarChart;
