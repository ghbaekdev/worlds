import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

const options = {
  plugins: {
    legend: {
      display: false,
      // position: 'bottom' as const,
      // labels: {
      //   padding: 15,
      //   font: {
      //     family: "'Noto Sans KR', 'serif'",
      //     lineHeight: 1,
      //   },
      // },
    },
  },
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
      afterDataLimits: (scale: any) => {
        scale.max = scale.max * 1.2;
      },
    },
  },
};

interface FilterType {
  filter: (reward: string) => any;
}

const labels = ['VVIP', 'VIP', 'NORMAL'];

const BarChart = ({ filter }: FilterType) => {
  const chartData = {
    labels,
    datasets: [
      {
        data: [filter('VVIP'), filter('VIP'), filter('NORMAL')],
        backgroundColor: [
          'rgb(175, 180, 43)',
          'rgb(100, 181, 246)',
          'rgb(255, 224, 130)',
        ],
        barThickness: 35,
      },
    ],
  };

  return (
    <BarWrap>
      <Bar
        data={chartData}
        options={options}
        style={{ width: '500px', height: '500px', margin: '100px auto 0 auto' }}
      />
    </BarWrap>
  );
};

export default BarChart;

const BarWrap = styled.div`
  width: 600px;
  height: 800px;
`;
