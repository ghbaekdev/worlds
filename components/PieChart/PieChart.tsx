import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  defaultFontSize: '14px',
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        padding: 15,
        font: {
          lineHeight: 1,
          size: 14,
        },
      },
    },
  },
};

interface FilterType {
  filter: (country: string) => number;
}

const PieChart = ({ filter }: FilterType) => {
  const chartData = {
    labels: ['KR', 'US', 'CN', 'JP', 'VN'],
    datasets: [
      {
        label: '# of Votes',
        data: [
          filter('kr'),
          filter('us'),
          filter('cn'),
          filter('jp'),
          filter('vn'),
        ],
        backgroundColor: [
          'rgb(229, 115, 115)',
          'rgba(38,166, 154, 0.8)',
          'rgb(206, 147, 216)',
          'rgb(128, 222, 234)',
          'rgb(255, 204, 128)',
        ],
        borderColor: ['rgb(0, 0, 0)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <DoughnutWrap>
      <Pie
        data={chartData}
        options={options}
        style={{ margin: '100px auto 400px auto' }}
      />
    </DoughnutWrap>
  );
};

export default PieChart;

const DoughnutWrap = styled.div`
  width: 600px;
  height: 800px;
  display: flex;
  justify-content: center;
`;
