import React, {useState, useEffect } from 'react'
import { fetchDailyData } from '../../api'
import { Line, Bar } from 'react-chartjs-2'

import styles from './Chart.module.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    BarElement
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
  );

type ChartProps = {
    data: {
        confirmed: {
            value: number,
            detail: string
        }
        recovered: {
            value: number,
            detail: string
        }
        deaths: {
            value: number,
            detail: string
        }
        lastUpdate: Date
    },
    country : string
}

const Chart = ({ data: {confirmed, deaths, recovered }, country }: ChartProps) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    }, [])

    const lineChart = (
        dailyData.length
            ? (
            <Line
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true,
                }]
            }}
        />) : null
    )

    const options: ChartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: true, text: `Current state in ${country}`}
        }
    }
    const barChart = (
        confirmed
            ? (
                <Bar
                    data={{
                        labels: ['Infected', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: ['rgba(0, 0, 255, 0.5)',
                                'rgba(0, 255, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)'],
                            data:[confirmed.value, recovered.value, deaths.value]
                        }],
                    }}
                    options={ options }
                />
            ) : null
    )

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    );
};

export default Chart;