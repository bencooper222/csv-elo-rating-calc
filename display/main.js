import * as data from './data/elo.json';
import Chart from 'chart.js';

const makeGraph = league => {
  const myLineChart = new Chart(
    document.getElementById('myChart').getContext('2d'),
    {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: league,
            backgroundColor: '#9400D3',
            data: data[0][league].Fnatic.map(team => ({
              x: 2 * (Number(team.week) - 1) + Number(team.game),
              y: team.elo,
            })),
            showLine: true,
            fill: false,
            borderColor: '#9400D3',
            tension: 0,
          },
        ],
      },
      options: {},
    },
  );
  console.log(myLineChart.data);
  console.log(data[0][league].Fnatic);
};

makeGraph('LEC');
